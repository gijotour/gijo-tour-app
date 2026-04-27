// AUTO PROPOSAL CONNECTED VERSION
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import PremiumLanding from './PremiumLanding';
import DesignerShowcase from './DesignerShowcase';
import PaymentPage from './PaymentPage';
import { mockDb } from '../data/mockDb';

function GijoTourApp() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState(mockDb.packages);
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState(null);

  const handleCreateProposal = (form) => {
    const newPkg = {
      id: Date.now(),
      title: `${form.purpose || '맞춤'} ${form.people} 여행 제안`,
      region: '필리핀',
      designer: 'GIJO AUTO',
      price: form.budget || '상담 후 결정',
      description: `${form.people} / ${form.date} / ${form.purpose}`,
      rating: 5,
      reviewCount: 0,
      reviews: []
    };

    setPackages(prev => [newPkg, ...prev]);
    navigate('/gijotour/proposals');
    return newPkg.title;
  };

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
  };

  return (
    <Routes>
      <Route index element={<PremiumLanding onCreateAutoProposal={handleCreateProposal} />} />

      <Route path="proposals" element={<DesignerShowcase packages={packages} onStartPayment={handleStartPayment} />} />

      <Route path="payment" element={
        selectedPackageForPayment ? (
          <PaymentPage pkg={selectedPackageForPayment} />
        ) : (
          <Navigate to="/gijotour" />
        )
      } />

      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

export default GijoTourApp;
