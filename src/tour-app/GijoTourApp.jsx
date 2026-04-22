import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Hero from './Hero';
import B2BInfo from './B2BInfo';
import DesignerShowcase from './DesignerShowcase';
import RegionSelector from './RegionSelector';
import Login from './Login';
import DesignerDashboard from './DesignerDashboard';
import AdminPanel from './AdminPanel';
import DesignerTV from './DesignerTV';
import PaymentPage from './PaymentPage';
import { mockDb } from '../data/mockDb';

function GijoTourApp({ isLoggedIn, setIsLoggedIn, userRole, setUserRole }) {
  const navigate = useNavigate();

  // 패키지 데이터 로드 (LocalStorage 반영)
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('gijo_packages');
    return saved ? JSON.parse(saved) : mockDb.packages;
  });

  // TV 비디오 데이터 로드 (LocalStorage 반영)
  const [tvVideos, setTvVideos] = useState(() => {
    const saved = localStorage.getItem('gijo_tv_videos');
    return saved ? JSON.parse(saved) : mockDb.tv;
  });

  useEffect(() => {
    localStorage.setItem('gijo_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('gijo_tv_videos', JSON.stringify(tvVideos));
  }, [tvVideos]);

  const [adminDesigners, setAdminDesigners] = useState(mockDb.admin.designers);
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
      duration: "00:00" // 실제로는 영상 길이를 가져와야 함
    };
    setTvVideos([videoWithId, ...tvVideos]);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('designer');
    navigate('/gijotour');
    window.scrollTo({ top: 0 });
  };

  // 로그인 성공 핸들러
  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'admin') navigate('/gijotour/admin');
    else navigate('/gijotour/designer');
    window.scrollTo({ top: 0 });
  };

  const filteredPackages = (packages || []).filter(pkg => {
    if (selectedRegion === '전체') return true;
    const regionMapping = {
      "필리핀": ["따가이다이", "마닐라", "클락"],
      "베트남": ["다낭", "호이안", "호치민", "하노이"],
      "라오스": ["비엔티엔"],
      "태국": ["방콕", "푸켓"]
    };
    const cities = regionMapping[selectedRegion] || [];
    const isCityMatch = cities.some(city => pkg.region && pkg.region.includes(city));
    const isRegionMatch = pkg.region && pkg.region.includes(selectedRegion);
    return isCityMatch || isRegionMatch;
  });

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <B2BInfo />
          <DesignerShowcase
            packages={filteredPackages || []}
            onRate={handleAddReview}
            selectedRegion={selectedRegion}
            onStartPayment={handleStartPayment}
          />
          <RegionSelector
            selectedRegion={selectedRegion}
            onSelectRegion={(region) => {
              setSelectedRegion(region);
              const el = document.getElementById('designer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </>
      } />
      <Route path="tv" element={<DesignerTV videos={tvVideos} />} />
      <Route path="login" element={
        <Login
          onBack={() => navigate('/gijotour')}
          onLoginSuccess={handleLoginSuccess}
          initialRole="designer"
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
          />
        ) : (
          <Navigate to="/gijotour/login" state={{ from: 'admin' }} />
        )
      } />
      <Route path="designer" element={
        (isLoggedIn && userRole === 'designer') ? (
          <DesignerDashboard 
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
    </Routes>
  );
}

export default GijoTourApp;
