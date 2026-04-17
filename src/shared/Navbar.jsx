import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const logo = "/home/john/.gemini/antigravity/brain/73b5278f-c6f4-4a4b-8a58-0430bf4a2f2e/gt_premium_logo_1776255667401.png";

const Navbar = ({ onLogin, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      <div className="container nav-container">
        <div className="nav-logo" onClick={() => handleNavClick('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="GIJO Labs Logo" />
          <span className="logo-text">GIJO Labs</span>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        
        <div className={`nav-capsule ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-lab-mode ${location.pathname === '/' ? 'active' : ''}`} 
                onClick={() => handleNavClick('/')}
              >
                <span className="nav-icon">🧪</span> <span className="nav-text">gijo LAB</span>
              </button>
            </li>
            <li className="nav-divider"></li>
            <li>
              <button 
                className={location.pathname.startsWith('/gijotour') ? 'active' : ''} 
                onClick={() => handleNavClick('/gijotour')}
              >
                <span className="nav-icon">🚀</span> <span className="nav-text">여행설계사 앱</span>
              </button>
            </li>
            {location.pathname.startsWith('/gijotour') && (
              <>
                <li>
                  <button 
                    className={location.pathname.includes('/tv') ? 'active' : ''} 
                    onClick={() => handleNavClick('/gijotour/tv')}
                  >
                    <span className="nav-icon">📺</span> <span className="nav-text">여행설계사 TV</span>
                  </button>
                </li>
                <li><a href="#designer" onClick={() => setIsMenuOpen(false)}><span className="nav-icon">👔</span> <span className="nav-text">여행 설계사</span></a></li>
                <li className="nav-divider"></li>
                <li className="nav-action-item"><button onClick={() => { handleNavClick('/gijotour/login'); }}><span className="nav-icon">🔑</span> <span className="nav-text">관리자</span></button></li>
                <li className="nav-action-item"><button onClick={() => { handleNavClick('/gijotour/login'); }}><span className="nav-icon">🔓</span> <span className="nav-text">설계사</span></button></li>
              </>
            )}
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
