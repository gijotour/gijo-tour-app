import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Hero from './Hero';
import B2BInfo from './B2BInfo';
import DesignerShowcase from './DesignerShowcase';
import RegionSelector from './RegionSelector';
import Login from './Login';
import DesignerDashboard from './DesignerDashboard';
import AdminPanel from './AdminPanel';
import DesignerTV from './DesignerTV';
import PaymentPage from './PaymentPage';
import NoticeBoard from './NoticeBoard';
import { mockDb } from '../data/mockDb';

function GijoTourApp({ 
  isLoggedIn, setIsLoggedIn, userRole, setUserRole, userName, setUserName,
  forceBoardWrite, setForceBoardWrite, boardFilterAuthor, setBoardFilterAuthor 
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // 패키지 데이터 로드 (LocalStorage 반영)
  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_packages');
      return saved ? JSON.parse(saved) : mockDb.packages;
    } catch (e) {
      return mockDb.packages;
    }
  });

  // TV 비디오 데이터 로드 (LocalStorage 반영)
  const [tvVideos, setTvVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_tv_videos');
      return saved ? JSON.parse(saved) : (mockDb.tv || []);
    } catch (e) {
      return (mockDb.tv || []);
    }
  });

  useEffect(() => {
    localStorage.setItem('gijo_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('gijo_tv_videos', JSON.stringify(tvVideos));
  }, [tvVideos]);

  // 가입 대기 설계사 로드
  const [pendingDesigners, setPendingDesigners] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_pending_designers');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gijo_pending_designers', JSON.stringify(pendingDesigners));
  }, [pendingDesigners]);

  // 이모저모 게시판 데이터 로드
  const [notices, setNotices] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_notices');
      return saved ? JSON.parse(saved) : mockDb.notices;
    } catch (e) {
      return mockDb.notices;
    }
  });

  useEffect(() => {
    localStorage.setItem('gijo_notices', JSON.stringify(notices));
  }, [notices]);

  const [adminDesigners, setAdminDesigners] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_admin_designers');
      return saved ? JSON.parse(saved) : mockDb.admin.designers;
    } catch (e) {
      return mockDb.admin.designers;
    }
  });

  useEffect(() => {
    localStorage.setItem('gijo_admin_designers', JSON.stringify(adminDesigners));
  }, [adminDesigners]);

  const [adminStats, setAdminStats] = useState(mockDb.admin.stats);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState(null);

  // 리뷰 추가 핸들러
  const handleAddReview = (designerName, nickname, newRating, comment) => {
    const today = new Date().toISOString().split('T')[0];
    const newReview = { nickname, rating: newRating, comment, date: today };

    const updatedPackages = packages.map(pkg => {
      if (pkg.designer === designerName) {
        const totalRating = pkg.rating * pkg.reviewCount + newRating;
        const newCount = pkg.reviewCount + 1;
        return {
          ...pkg,
          rating: parseFloat((totalRating / newCount).toFixed(1)),
          reviewCount: newCount,
          reviews: [newReview, ...(pkg.reviews || [])]
        };
      }
      return pkg;
    });
    setPackages(updatedPackages);

    const updatedAdminDesigners = adminDesigners.map(d => {
      if (d.name === designerName) {
        const totalRating = d.rating * d.reviewCount + newRating;
        const newCount = d.reviewCount + 1;
        return {
          ...d,
          rating: parseFloat((totalRating / newCount).toFixed(1)),
          reviewCount: newCount,
          reviews: [newReview, ...(d.reviews || [])]
        };
      }
      return d;
    });
    setAdminDesigners(updatedAdminDesigners);

    const allRatings = updatedAdminDesigners.map(d => d.rating);
    const avg = parseFloat((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
    const updatedStats = adminStats.map(s =>
      s.label === '누적 고객 평점' ? { ...s, value: `${avg} / 5.0` } : s
    );
    setAdminStats(updatedStats);
  };

  // 새로운 제안서 등록 핸들러
  const handleCreateProposal = (newPkg) => {
    const detailedItinerary = newPkg.itinerary.map(item => ({
      day: item.day,
      title: `${item.day}일차 일정`,
      content: item.content || "상세 일정이 곧 업데이트될 예정입니다."
    }));

    const enhancedPkg = {
      ...newPkg,
      image: "https://images.unsplash.com/photo-1552465011-b4e21bd6e79a?q=80&w=2039&auto=format&fit=crop", 
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      features: newPkg.description ? [newPkg.description] : ["맞춤형 투어", "개인 가이드 제공"],
      detailedPlan: {
        pricing: `1인당 약 ${newPkg.price || '₩850,000'} (항공권 별도)`,
        itinerary: detailedItinerary,
        inclusions: ["전용 차량", "한국어 가이드", "전 일정 식사"],
        exclusions: ["왕복 항공권", "개인 경비"],
        proTip: "여행설계사가 직접 제안하는 현지 맛집 리스트를 제공해 드립니다."
      }
    };
    
    setPackages([enhancedPkg, ...packages]);
  };

  // TV 비디오 등록 핸들러
  const handleAddTvVideo = (newVideo) => {
    const videoWithId = {
      ...newVideo,
      id: Date.now(),
      views: "0",
      duration: "00:00" 
    };
    setTvVideos([videoWithId, ...tvVideos]);
  };

  // 여행설계사 가입 신청 핸들러
  const handleDesignerSignup = (formData) => {
    const newRequest = {
      ...formData,
      id: Date.now(),
      status: "Pending",
      date: new Date().toISOString().split('T')[0]
    };
    setPendingDesigners([newRequest, ...pendingDesigners]);
    alert('가입 신청이 완료되었습니다. 관리자 승인 후 활동이 가능합니다.');
  };

  // 여행설계사 승인 핸들러
  const handleApproveDesigner = (designerId) => {
    const designerToApprove = pendingDesigners.find(d => d.id === designerId);
    if (!designerToApprove) return;

    // 대기 목록에서 삭제
    setPendingDesigners(pendingDesigners.filter(d => d.id !== designerId));

    // 정식 설계사 목록에 추가
    const newDesigner = {
      id: adminDesigners.length + 1,
      name: designerToApprove.name,
      region: designerToApprove.region,
      totalProposals: 0,
      rating: 5.0,
      reviewCount: 0,
      status: "Active",
      reviews: []
    };
    setAdminDesigners([newDesigner, ...adminDesigners]);
    alert(`${newDesigner.name} 여행설계사의 가입을 승인했습니다.`);
  };

  // 통계 업데이트 (대기 건수 반영)
  useEffect(() => {
    const updatedStats = adminStats.map(s => 
      s.label === '승인 대기 건수' ? { ...s, value: String(pendingDesigners.length) } : s
    );
    setAdminStats(updatedStats);
  }, [pendingDesigners]);

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('designer');
    localStorage.removeItem('gijo_auth');
    localStorage.removeItem('gijo_user_role');
    localStorage.removeItem('gijo_user_name');
    navigate('/gijotour');
    window.scrollTo({ top: 0 });
  };

  // 로그인 성공 핸들러
  const handleLoginSuccess = (role, name) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    
    // 로그인 시도 시의 목적지(state.from)가 있으면 그곳으로 이동
    let from = '/gijotour';
    if (location.state?.from === 'designer') from = '/gijotour/designer';
    else if (location.state?.from === 'admin') from = '/gijotour/admin';
    else from = (role === 'admin' ? '/gijotour/admin' : '/gijotour/designer');

    navigate(from);
    window.scrollTo({ top: 0 });
  };

  // 공지사항 등록 핸들러
  const handleAddNotice = (newNotice) => {
    const noticeWithId = {
      ...newNotice,
      id: Date.now(),
      author: userName,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [noticeWithId, ...notices];
    setNotices(updated);
    localStorage.setItem('gijo_notices', JSON.stringify(updated));
  };

  const handleDeleteNotice = (id) => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    localStorage.setItem('gijo_notices', JSON.stringify(updated));
  };

  const filteredPackages = (packages || []).filter(pkg => {
    if (!pkg) return false;
    if (selectedRegion === '전체') return true;
    const regionMapping = {
      "필리핀": ["따가이다이", "마닐라", "클락"],
      "베트남": ["다낭", "호이안", "호치민", "하노이"],
      "라오스": ["비엔티엔"],
      "태국": ["방콕", "푸켓"]
    };
    const cities = regionMapping[selectedRegion] || [];
    const isCityMatch = cities.some(city => pkg.region && typeof pkg.region === 'string' && pkg.region.includes(city));
    const isRegionMatch = pkg.region && typeof pkg.region === 'string' && pkg.region.includes(selectedRegion);
    return isCityMatch || isRegionMatch;
  });

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 렌더링 전 최종 데이터 검증
  const safeNotices = Array.isArray(notices) ? notices : [];
  const safeTvVideos = Array.isArray(tvVideos) ? tvVideos : [];

  return (
    <div className="gijo-tour-main-layout">
      <Routes>
        <Route index element={
          <>
            <Hero />
            {!isLoggedIn && (
              <div className="body-login-banner animate-up">
                <div className="login-cta-card glass-card">
                  <div className="cta-header">
                    <span className="badge">PARTNER LOGIN</span>
                    <h3>여행설계사 시스템 접속</h3>
                  </div>
                  <p className="cta-desc">기조투어 파트너사 및 설계사 전용 관리 도구입니다.</p>
                  <button className="btn-body-login" onClick={() => navigate('/gijotour/login')}>
                    지금 로그인하기 <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            )}
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
            <DesignerShowcase
              packages={filteredPackages || []}
              onRate={handleAddReview}
              selectedRegion={selectedRegion}
              onStartPayment={handleStartPayment}
            />
          </>
        } />
        <Route path="about" element={
          <div className="page-fade-in">
            <B2BInfo />
            <RegionSelector
              selectedRegion={selectedRegion}
              onSelectRegion={(region) => {
                setSelectedRegion(region);
                navigate('/gijotour'); // 선택 시 메인 쇼케이스로 이동
              }}
            />
          </div>
        } />
        <Route path="tv" element={<DesignerTV videos={safeTvVideos} />} />
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
            <PaymentPage 
              pkg={selectedPackageForPayment} 
              onBack={() => navigate('/gijotour')} 
            />
          ) : (
            <Navigate to="/gijotour" />
          )
        } />

        <Route path="admin" element={
          (isLoggedIn && userRole === 'admin') ? (
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
          (isLoggedIn && (userRole === 'designer' || userRole === 'admin')) ? (
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
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </div>
  );
}

export default GijoTourApp;
