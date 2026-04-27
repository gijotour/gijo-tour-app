import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import PremiumLanding from './PremiumLanding';
import DesignerShowcase from './DesignerShowcase';
import PaymentPage from './PaymentPage';
import AdminGuideUserManager from './AdminGuideUserManager';
import Login from './Login';
import { railwayApi, isRailwayApiEnabled } from '../services/railwayApi';

function normalizeBudget(rawBudget) {
  if (!rawBudget || !rawBudget.trim()) return '1,590,000원~';
  return rawBudget.includes('원') || rawBudget.includes('만원') ? rawBudget : `${rawBudget}원`;
}

function GijoTourApp({ setIsLoggedIn, setUserRole, setUserName }) {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState(null);

  useEffect(() => {
    if (!isRailwayApiEnabled()) return;
    railwayApi.getProposals().then(data => setPackages(data)).catch(err => console.error(err));
  }, []);

  const handleCreateProposal = async (form) => {
    const purpose = form.purpose?.trim() || '프라이빗 힐링';
    const people = form.people?.trim() || '2명';
    const date = form.date?.trim() || '상담 후 확정';
    const budget = normalizeBudget(form.budget);
    const contact = form.contact?.trim() || '상담 필요';
    const title = `${purpose} 맞춤 프리미엄 3박4일 제안`;

    const newPkg = {
      title,
      region: '필리핀',
      designer: 'GIJO AUTO',
      price: budget,
      description: `${people} / ${date} / ${purpose} / 연락처: ${contact}`,
      customerRequest: { people, date, budget, purpose, contact },
      detailedPlan: {}
    };

    try {
      if (isRailwayApiEnabled()) {
        const saved = await railwayApi.createProposal(newPkg);
        setPackages(prev => [saved, ...prev]);
      } else {
        setPackages(prev => [{ id: Date.now(), ...newPkg }, ...prev]);
      }
    } catch (e) {
      console.error(e);
      alert('서버 저장 실패');
    }

    navigate('/gijotour/proposals');
    return title;
  };

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
  };

  const handleLoginSuccess = (role, name) => {
    setIsLoggedIn?.(true);
    setUserRole?.(role);
    setUserName?.(name);
    navigate(role === 'admin' ? '/gijotour/admin' : '/gijotour/proposals');
  };

  return (
    <Routes>
      <Route index element={<PremiumLanding onCreateAutoProposal={handleCreateProposal} />} />
      <Route path="proposals" element={<DesignerShowcase packages={packages} onStartPayment={handleStartPayment} />} />
      <Route path="payment" element={selectedPackageForPayment ? <PaymentPage pkg={selectedPackageForPayment} onBack={() => navigate('/gijotour/proposals')} /> : <Navigate to="/gijotour" />} />
      <Route path="admin" element={<AdminGuideUserManager />} />
      <Route path="login" element={<Login onBack={() => navigate('/gijotour')} onLoginSuccess={handleLoginSuccess} initialRole="admin" pendingRequests={[]} activeDesigners={[]} onDesignerSignup={() => alert('제휴 신청이 접수되었습니다.')} />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

export default GijoTourApp;
