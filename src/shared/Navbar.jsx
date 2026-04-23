import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const logo = "https://img.icons8.com/isometric/50/experimental-rocket-isometric.png";

const Navbar = ({ onLogin, isLoggedIn, onLogout, userName, userRole, setForceBoardWrite, setBoardFilterAuthor }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.includes('/admin') || location.pathname.includes('/designer');
  const isHub = location.pathname === '/';
  
  // 대시보드나 허브에서도 메뉴바를 표시하도록 차단 로직 제거

  const currentView = location.pathname.startsWith('/gijotour') ? 'home' : 
                      location.pathname === '/' ? 'lab' : 'other';

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''} ${isDashboard ? 'dashboard-nav' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo-text" onClick={() => handleNavClick('/gijotour')} style={{ cursor: 'pointer' }}>
          GIJO TOUR
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        
        <div className={`nav-capsule ${isMenuOpen ? 'open' : ''}`}>
          {isLoggedIn && (
            <div className="mobile-nav-profile">
              <div className="nav-avatar" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${userName})` }}></div>
              <div className="mobile-profile-info">
                <span className="name">{userName}님</span>
                <span className="role">{userRole === 'admin' ? 'SYSTEM ADMIN' : 'TRAVEL DESIGNER'}</span>
              </div>
            </div>
          )}
          <ul className="nav-links">
            <li><button onClick={() => handleNavClick('/gijotour')}>홈</button></li>
            <li><button className={location.pathname.includes('/about') ? 'active' : ''} onClick={() => handleNavClick('/gijotour/about')}>GT 소개</button></li>
            
            {(location.pathname.startsWith('/gijotour') || isDashboard) && (
              <>
                <li>
                  <button onClick={() => scrollToSection('designer')}>
                    여행설계사 제안
                  </button>
                </li>
                <li>
                  <button 
                    className={location.pathname.includes('/tv') ? 'active' : ''} 
                    onClick={() => handleNavClick('/gijotour/tv')}
                  >
                    여행설계사 TV
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('notice')}>
                    이모저모
                  </button>
                </li>
                {isLoggedIn && (
                  <>
                    <li className="nav-divider"></li>
                    <li>
                      <div className="nav-user-dropdown-container">
                        <div 
                          className={`nav-user-trigger ${isUserMenuOpen ? 'active' : ''}`}
                          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        >
                          <div className="nav-avatar" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${userName})` }}></div>
                          <span className="nav-username">{userName}님</span>
                          <span className="dropdown-arrow">{isUserMenuOpen ? '▲' : '▼'}</span>
                        </div>

                        {isUserMenuOpen && (
                          <div className="nav-dropdown-menu glass-card animate-down">
                            <div className="dropdown-header">
                              <span className="user-role">{userRole === 'admin' ? 'SYSTEM ADMIN' : 'TRAVEL DESIGNER'}</span>
                              <span className="user-name">{userName}</span>
                            </div>
                            <div className="dropdown-divider"></div>
                            {userRole === 'admin' ? (
                              <>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleNavClick('/gijotour/admin');
                                    setIsUserMenuOpen(false);
                                  }}
                                >
                                  <span className="icon">🛡️</span> 운영자 시스템
                                </button>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleNavClick('/gijotour/designer');
                                    setIsUserMenuOpen(false);
                                  }}
                                >
                                  <span className="icon">👤</span> 설계사 대쉬보드
                                </button>
                              </>
                            ) : (
                              <button 
                                className="dropdown-item"
                                onClick={() => {
                                  handleNavClick('/gijotour/designer');
                                  setIsUserMenuOpen(false);
                                }}
                              >
                                <span className="icon">⚙️</span> 설계사 대쉬보드
                              </button>
                            )}
                            <button 
                              className="dropdown-item"
                              onClick={() => {
                                setForceBoardWrite(true);
                                scrollToSection('notice');
                                setIsUserMenuOpen(false);
                              }}
                            >
                              <span className="icon">✍️</span> 새 소식 등록하기
                            </button>
                            <button 
                              className="dropdown-item"
                              onClick={() => {
                                setBoardFilterAuthor(userName);
                                scrollToSection('notice');
                                setIsUserMenuOpen(false);
                              }}
                            >
                              <span className="icon">🗂️</span> 내 게시물 관리
                            </button>
                            <div className="dropdown-divider"></div>
                            <button 
                              className="dropdown-item logout"
                              onClick={() => {
                                onLogout();
                                setIsUserMenuOpen(false);
                              }}
                            >
                              <span className="icon">🚪</span> 로그아웃
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  </>
                )}
              </>
            )}

            {location.pathname === '/' && (
              <li><button onClick={() => handleNavClick('/gijotour')}>GIJO TOUR 진입</button></li>
            )}
          </ul>
        </div>
      </div>



      {/* Global Mobile Menu Overlay - Unified Manager */}
      {isLoggedIn && isUserMenuOpen && (
        <div className="mobile-user-dropdown glass-card animate-up" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-header">
            <span className="user-name">{userName}님</span>
            <span className="user-role">{userRole === 'admin' ? 'ADMIN' : 'DESIGNER'}</span>
          </div>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={() => { scrollToSection('notice'); setIsUserMenuOpen(false); }}>📋 이모저모</button>
          <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/designer'); setIsUserMenuOpen(false); }}>👤 설계사 대쉬보드</button>
          {userRole === 'admin' && (
            <button className="dropdown-item" onClick={() => { handleNavClick('/gijotour/admin'); setIsUserMenuOpen(false); }}>🛡️ 운영 시스템</button>
          )}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item logout" onClick={onLogout}>🚪 로그아웃</button>
        </div>
      )}

      {isLoggedIn && (
        <button 
          className="fab-mobile" 
          onClick={() => {
            setForceBoardWrite(true);
            scrollToSection('notice');
          }}
          title="새 소식 등록"
        >
          +
        </button>
      )}
    </nav>
  );
};

export default Navbar;
