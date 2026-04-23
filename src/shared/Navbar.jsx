import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onLogin, isLoggedIn, onLogout, userName, userRole, setForceBoardWrite, setBoardFilterAuthor }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDashMenuOpen, setIsDashMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.includes('/admin') || location.pathname.includes('/designer');
  const isAdmin = location.pathname.includes('/admin');
  const isDesigner = location.pathname.includes('/designer');

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsDashMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/gijotour') {
      navigate('/gijotour');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''} ${isDashboard ? 'dashboard-nav-mode' : ''}`}>
      <div className="nav-container-centered">
        
        {/* Top Row: Logo & Dash/User Badge Group */}
        <div className="nav-brand-group">
          {!isDashboard && (
            <div className="brand-logo-wrapper" onClick={() => {
              if (location.pathname === '/gijotour') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                handleNavClick('/gijotour');
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="gt-symbol">GT</div>
              <div className="logo-text-group">
                <span className="logo-gijo">GIJO</span>
                <span className="logo-tour">TOUR</span>
              </div>
            </div>
          )}

          <div className="nav-user-controls">
            {/* Dashboard Specific Quick Menu */}
            {isDashboard && (
              <div className="dash-trigger-wrap">
                <button 
                  className={`nav-dash-trigger ${isDashMenuOpen ? 'active' : ''}`}
                  onClick={() => setIsDashMenuOpen(!isDashMenuOpen)}
                >
                  <span className="dash-icon">{isAdmin ? '🛡️' : '🛰️'}</span>
                  <span className="dash-text">관리 메뉴</span>
                </button>

                {isDashMenuOpen && (
                  <div className="nav-user-dropdown dash-dropdown glass-card animate-up">
                    <button className="btn-close-dropdown" onClick={() => setIsDashMenuOpen(false)}>✕</button>
                    <div className="dropdown-header">
                      <span className="user-name">{isAdmin ? '운영 시스템' : '설계 대시보드'}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    {isAdmin ? (
                      <>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/admin?tab=active'); setIsDashMenuOpen(false); }}>📊 DASHBOARD 지표</button>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/admin?tab=pending'); setIsDashMenuOpen(false); }}>📩 승인 대기 내역</button>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/admin?tab=finance'); setIsDashMenuOpen(false); }}>🏦 정산 관리</button>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/admin?tab=settings'); setIsDashMenuOpen(false); }}>⚙️ 플랫폼 설정</button>
                      </>
                    ) : (
                      <>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/designer?tab=proposals'); setIsDashMenuOpen(false); }}>📋 설계 제안 관리</button>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/designer?tab=tv'); setIsDashMenuOpen(false); }}>📺 여행설계사 TV</button>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/designer?tab=settlements'); setIsDashMenuOpen(false); }}>💰 정산/수익 보고</button>
                        <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/designer?tab=account'); setIsDashMenuOpen(false); }}>👩‍💼 마스터 프로필</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            <button 
              className={`nav-user-badge ${isUserMenuOpen ? 'active' : ''}`}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              {isLoggedIn ? `${userName}님` : '로그인하기'}
            </button>

            {/* User Menu Dropdown */}
            {isUserMenuOpen && (
              <div className="nav-user-dropdown glass-card animate-up">
                <button className="btn-close-dropdown" onClick={() => setIsUserMenuOpen(false)}>✕</button>
                {!isLoggedIn ? (
                  <div className="dropdown-content">
                    <div className="dropdown-header"><span className="user-name">게스트님</span></div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/login'); setIsUserMenuOpen(false); }}>
                      <span className="icon">🔑</span> 여행설계사 로그인
                    </button>
                  </div>
                ) : (
                  <div className="dropdown-content">
                    <div className="dropdown-header"><span className="user-name">{userName}님</span></div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => { setForceBoardWrite(true); scrollToSection('notice'); setIsUserMenuOpen(false); }}>
                      📋 이모저모 (글쓰기)
                    </button>
                    <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/designer'); setIsUserMenuOpen(false); }}>
                      👤 여행설계 하기
                    </button>
                    {userRole === 'admin' && (
                      <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/admin'); setIsUserMenuOpen(false); }}>
                        🛡️ 운영 시스템
                      </button>
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={() => { onLogout(); setIsUserMenuOpen(false); }}>
                      🚪 로그아웃
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Row: Main Navigation Links (Hidden in dashboard for extra space) */}
        {!isDashboard && (
          <div className={`nav-capsule ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li><button onClick={() => handleNavClick('/gijotour')}>홈</button></li>
              <li><button className={location.pathname.includes('/about') ? 'active' : ''} onClick={() => handleNavClick('/gijotour/about')}>GT 소개</button></li>
              <li><button onClick={() => scrollToSection('designer')}>여행설계사 제안</button></li>
              <li><button className={location.pathname.includes('/tv') ? 'active' : ''} onClick={() => handleNavClick('/gijotour/tv')}>여행설계사 TV</button></li>
              <li><button onClick={() => scrollToSection('notice')}>이모저모</button></li>
            </ul>
          </div>
        )}

        {/* Mobile Menu Toggle (Only in main view) */}
        {!isDashboard && (
          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
