import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const logo = "https://img.icons8.com/isometric/50/experimental-rocket-isometric.png";

const Navbar = ({ onLogin, isLoggedIn, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.includes('/admin') || location.pathname.includes('/designer');
  const isHub = location.pathname === '/';
  
  if (isDashboard || isHub) return null;

  const currentView = location.pathname.startsWith('/gijotour') ? 'home' : 
                      location.pathname === '/' ? 'lab' : 'other';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
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
          <ul className="nav-links">
            <li><button onClick={() => handleNavClick('/gijotour')}>홈</button></li>
            
            {location.pathname.startsWith('/gijotour') && (
              <>
                <li>
                  <button 
                    className={location.pathname.includes('/tv') ? 'active' : ''} 
                    onClick={() => handleNavClick('/gijotour/tv')}
                  >
                    여행설계사 TV
                  </button>
                </li>
                <li><a href="#designer" onClick={() => setIsMenuOpen(false)}>여행설계사 제안</a></li>
                <li className="nav-divider"></li>
                <li>
                  {isLoggedIn ? (
                    <button onClick={onLogout} className="btn-logout-nav">로그아웃</button>
                  ) : (
                    <button onClick={() => handleNavClick('/gijotour/login')}>여행설계사 로그인</button>
                  )}
                </li>
              </>
            )}

            {location.pathname === '/' && (
              <li><button onClick={() => handleNavClick('/gijotour')}>GIJO TOUR 진입</button></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
