import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import B2BInfo from './components/B2BInfo';
import DesignerShowcase from './components/DesignerShowcase';
import RegionSelector from './components/RegionSelector';
import Footer from './components/Footer';
import Login from './components/Login';
import DesignerDashboard from './components/DesignerDashboard';
import AdminPanel from './components/AdminPanel';
import DesignerTV from './components/DesignerTV';
import { mockDb } from './data/mockDb';

function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('designer');
  const [initialRole, setInitialRole] = useState('designer');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 평점 관리를 위한 통합 상태
  const [packages, setPackages] = useState(mockDb.packages);
  const [adminDesigners, setAdminDesigners] = useState(mockDb.admin.designers);
  const [adminStats, setAdminStats] = useState(mockDb.admin.stats);
  const [selectedRegion, setSelectedRegion] = useState('전체');

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 리뷰 추가 핸들러
  const handleAddReview = (designerName, nickname, newRating, comment) => {
    const today = new Date().toISOString().split('T')[0];
    const newReview = { nickname, rating: newRating, comment, date: today };

    // 1. Showcase 패키지 업데이트
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

    // 2. Admin Designer 리스트 업데이트
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

    // 3. Admin 전체 평균 평점 통계 업데이트
    const allRatings = updatedAdminDesigners.map(d => d.rating);
    const avg = parseFloat((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
    const updatedStats = adminStats.map(s =>
      s.label === '누적 고객 평점' ? { ...s, value: `${avg} / 5.0` } : s
    );
    setAdminStats(updatedStats);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('designer');
    setView('home');
    window.scrollTo({ top: 0 });
  };

  // 로그인 화면 진입 핸들러
  const handleLoginEnter = (role) => {
    setInitialRole(role);
    setView('login');
    window.scrollTo({ top: 0 });
  };

  // 로그인 성공 핸들러
  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    window.scrollTo({ top: 0 });
  };

  // 필터링된 패키지 리스트 (방어 코드 추가)
  const filteredPackages = (packages || []).filter(pkg => {
    if (selectedRegion === '전체') return true;
    return pkg.region && pkg.region.includes(selectedRegion);
  });

  // 1. 대시보드 및 어드민 뷰 (로그인 된 경우)
  if (isLoggedIn) {
    return (
      <div className="page-fade-in">
        {userRole === 'admin' ? (
          <AdminPanel
            onLogout={handleLogout}
            designers={adminDesigners}
            setDesigners={setAdminDesigners}
            stats={adminStats}
          />
        ) : (
          <DesignerDashboard onLogout={handleLogout} />
        )}
      </div>
    );
  }

  // 2. 로그인 화면 뷰
  if (view === 'login') {
    return (
      <div className="page-fade-in">
        <Login
          onBack={() => setView('home')}
          onLoginSuccess={handleLoginSuccess}
          initialRole={initialRole}
        />
      </div>
    );
  }

  // 3. 메인 랜더링 (홈 화면)
  return (
    <div className="app-main page-fade-in">
      {/* Premium Background System */}
      <div className="bg-mesh-container">
        <div className="mesh-circle mesh-1"></div>
        <div className="mesh-circle mesh-2"></div>
        <div className="mesh-circle mesh-3"></div>
      </div>

      <Navbar onLogin={handleLoginEnter} onNavigate={(v) => {
        setView(v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} currentView={view} />
      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <B2BInfo />
            <DesignerShowcase
              packages={filteredPackages || []}
              onRate={handleAddReview}
              selectedRegion={selectedRegion}
            />
            <RegionSelector
              selectedRegion={selectedRegion}
              onSelectRegion={(region) => {
                setSelectedRegion(region);
                // 패키지 리스트 위치로 부드럽게 이동
                const el = document.getElementById('designer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </>
        ) : (
          <DesignerTV videos={mockDb.tv} />
        )}
      </main>
      <Footer />
      
    </div>
  );
}

export default App;
