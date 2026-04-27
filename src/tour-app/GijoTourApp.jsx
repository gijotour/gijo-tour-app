import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import PremiumLanding from './PremiumLanding';
import B2BInfo from './B2BInfo';
import RegionSelector from './RegionSelector';
import Login from './Login';
import DesignerDashboard from './DesignerDashboard';
import AdminPanel from './AdminPanel';
import DesignerTV from './DesignerTV';
import PaymentPage from './PaymentPage';
import NoticeBoard from './NoticeBoard';
import DesignerShowcase from './DesignerShowcase';
import { mockDb } from '../data/mockDb';

function GijoTourApp({
  isLoggedIn,
  setIsLoggedIn,
  userRole,
  setUserRole,
  userName,
  setUserName,
  forceBoardWrite,
  setForceBoardWrite,
  boardFilterAuthor,
  setBoardFilterAuthor
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_packages');
      return saved ? JSON.parse(saved) : mockDb.packages;
    } catch {
      return mockDb.packages;
    }
  });

  const [tvVideos, setTvVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_tv_videos');
      return saved ? JSON.parse(saved) : (mockDb.tv || []);
    } catch {
      return mockDb.tv || [];
    }
  });

  const [pendingDesigners, setPendingDesigners] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_pending_designers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notices, setNotices] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_notices');
      return saved ? JSON.parse(saved) : mockDb.notices;
    } catch {
      return mockDb.notices;
    }
  });

  const [adminDesigners, setAdminDesigners] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_admin_designers');
      return saved ? JSON.parse(saved) : mockDb.admin.designers;
    } catch {
      return mockDb.admin.designers;
    }
  });

  const [adminStats, setAdminStats] = useState(mockDb.admin.stats);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState(null);

  useEffect(() => {
    localStorage.setItem('gijo_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('gijo_tv_videos', JSON.stringify(tvVideos));
  }, [tvVideos]);

  useEffect(() => {
    localStorage.setItem('gijo_pending_designers', JSON.stringify(pendingDesigners));
  }, [pendingDesigners]);

  useEffect(() => {
    localStorage.setItem('gijo_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('gijo_admin_designers', JSON.stringify(adminDesigners));
  }, [adminDesigners]);

  useEffect(() => {
    setAdminStats(prev => prev.map(s => (
      s.label === '승인 대기 건수' ? { ...s, value: String(pendingDesigners.length) } : s
    )));
  }, [pendingDesigners]);

  const filteredPackages = (packages || []).filter(pkg => {
    if (!pkg) return false;
    if (selectedRegion === '전체') return true;
    const regionMapping = {
      '필리핀': ['따가이다이', '마닐라', '클락', '보라카이', '세부'],
      '베트남': ['다낭', '호이안', '호치민', '하노이'],
      '라오스': ['비엔티엔'],
      '태국': ['방콕', '푸켓']
    };
    const cities = regionMapping[selectedRegion] || [];
    const region = pkg.region || '';
    return cities.some(city => region.includes(city)) || region.includes(selectedRegion);
  });

  const handleAddReview = (designerName, nickname, newRating, comment) => {
    const today = new Date().toISOString().split('T')[0];
    const newReview = { nickname, rating: newRating, comment, date: today };

    setPackages(prev => prev.map(pkg => {
      if (pkg.designer !== designerName) return pkg;
      const newCount = (pkg.reviewCount || 0) + 1;
      const totalRating = (pkg.rating || 5) * (pkg.reviewCount || 0) + newRating;
      return {
        ...pkg,
        rating: parseFloat((totalRating / newCount).toFixed(1)),
        reviewCount: newCount,
        reviews: [newReview, ...(pkg.reviews || [])]
      };
    }));

    setAdminDesigners(prev => prev.map(d => {
      if (d.name !== designerName) return d;
      const newCount = (d.reviewCount || 0) + 1;
      const totalRating = (d.rating || 5) * (d.reviewCount || 0) + newRating;
      return {
        ...d,
        rating: parseFloat((totalRating / newCount).toFixed(1)),
        reviewCount: newCount,
        reviews: [newReview, ...(d.reviews || [])]
      };
    }));
  };

  const handleCreateProposal = (newPkg) => {
    const detailedItinerary = (newPkg.itinerary || []).map(item => ({
      day: item.day,
      title: `${item.day}일차 일정`,
      content: item.content || '상세 일정이 곧 업데이트될 예정입니다.'
    }));

    const enhancedPkg = {
      ...newPkg,
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bd6e79a?q=80&w=2039&auto=format&fit=crop',
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      features: newPkg.description ? [newPkg.description] : ['맞춤형 투어', '개인 가이드 제공'],
      detailedPlan: {
        pricing: `1인당 약 ${newPkg.price || '₩850,000'} (항공권 별도)`,
        itinerary: detailedItinerary,
        inclusions: ['전용 차량', '한국어 가이드', '맞춤 일정 설계'],
        exclusions: ['왕복 항공권', '개인 경비'],
        proTip: '여행설계사가 직접 제안하는 현지 맛집 리스트를 제공해 드립니다.'
      }
    };

    setPackages(prev => [enhancedPkg, ...prev]);
  };

  const handleAddTvVideo = (newVideo) => {
    setTvVideos(prev => [{ ...newVideo, id: Date.now(), views: '0', duration: '00:00' }, ...prev]);
  };

  const handleDesignerSignup = (formData) => {
    const newRequest = { ...formData, id: Date.now(), status: 'Pending', date: new Date().toISOString().split('T')[0] };
    setPendingDesigners(prev => [newRequest, ...prev]);
    alert('가입 신청이 완료되었습니다. 관리자 승인 후 활동이 가능합니다.');
  };

  const handleApproveDesigner = (designerId) => {
    const designerToApprove = pendingDesigners.find(d => d.id === designerId);
    if (!designerToApprove) return;
    setPendingDesigners(prev => prev.filter(d => d.id !== designerId));
    const newDesigner = {
      id: Date.now(),
      name: designerToApprove.name,
      region: designerToApprove.region,
      totalProposals: 0,
      rating: 5.0,
      reviewCount: 0,
      status: 'Active',
      reviews: []
    };
    setAdminDesigners(prev => [newDesigner, ...prev]);
    alert(`${newDesigner.name} 여행설계사의 가입을 승인했습니다.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('designer');
    localStorage.removeItem('gijo_auth');
    localStorage.removeItem('gijo_role');
    localStorage.removeItem('gijo_user_name');
    navigate('/gijotour');
  };

  const handleLoginSuccess = (role, name) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    let from = '/gijotour';
    if (location.state?.from === 'designer') from = '/gijotour/designer';
    else if (location.state?.from === 'admin') from = '/gijotour/admin';
    else from = role === 'admin' ? '/gijotour/admin' : '/gijotour/designer';
    navigate(from);
  };

  const handleAddNotice = (newNotice) => {
    const noticeWithId = { ...newNotice, id: Date.now(), author: userName, date: new Date().toISOString().split('T')[0] };
    setNotices(prev => [noticeWithId, ...prev]);
  };

  const handleDeleteNotice = (id) => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
  };

  const safeNotices = Array.isArray(notices) ? notices : [];
  const safeTvVideos = Array.isArray(tvVideos) ? tvVideos : [];

  return (
    <div className="gijo-tour-main-layout">
      <Routes>
        <Route index element={
          <PremiumLanding
            notices={safeNotices}
            packages={filteredPackages || []}
            onStartPayment={handleStartPayment}
          />
        } />

        <Route path="about" element={
          <div className="page-fade-in">
            <B2BInfo />
            <RegionSelector
              selectedRegion={selectedRegion}
              onSelectRegion={(region) => {
                setSelectedRegion(region);
                navigate('/gijotour#internal-proposals');
              }}
            />
          </div>
        } />

        <Route path="tv" element={<DesignerTV videos={safeTvVideos} />} />

        <Route path="reviews" element={
          <NoticeBoard
            notices={safeNotices}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onAddNotice={handleAddNotice}
            onDeleteNotice={handleDeleteNotice}
            forceWrite={forceBoardWrite}
            filterUserName={boardFilterAuthor}
            onClearFilter={() => {
              setBoardFilterAuthor(null);
              setForceBoardWrite(false);
            }}
          />
        } />

        <Route path="proposals" element={
          <DesignerShowcase
            packages={filteredPackages || []}
            onRate={handleAddReview}
            selectedRegion={selectedRegion}
            onStartPayment={handleStartPayment}
          />
        } />

        <Route path="login" element={
          <Login
            onBack={() => navigate('/gijotour')}
            onLoginSuccess={handleLoginSuccess}
            initialRole="designer"
            onDesignerSignup={handleDesignerSignup}
            pendingRequests={pendingDesigners}
            activeDesigners={adminDesigners}
          />
        } />

        <Route path="payment" element={
          selectedPackageForPayment ? (
            <PaymentPage pkg={selectedPackageForPayment} onBack={() => navigate('/gijotour')} />
          ) : (
            <Navigate to="/gijotour" />
          )
        } />

        <Route path="admin" element={
          isLoggedIn && userRole === 'admin' ? (
            <AdminPanel
              onLogout={handleLogout}
              designers={adminDesigners}
              setDesigners={setAdminDesigners}
              stats={adminStats}
              pendingRequests={pendingDesigners}
              onApprove={handleApproveDesigner}
            />
          ) : (
            <Navigate to="/gijotour/login" state={{ from: 'admin' }} />
          )
        } />

        <Route path="designer" element={
          isLoggedIn && (userRole === 'designer' || userRole === 'admin') ? (
            <DesignerDashboard
              userName={userName}
              onLogout={handleLogout}
              proposals={packages}
              onAddProposal={handleCreateProposal}
              tvVideos={tvVideos}
              onAddTvVideo={handleAddTvVideo}
            />
          ) : (
            <Navigate to="/gijotour/login" state={{ from: 'designer' }} />
          )
        } />

        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </div>
  );
}

export default GijoTourApp;
