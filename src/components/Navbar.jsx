import React, { useState, useEffect } from 'react';

const logo = "/home/john/.gemini/antigravity/brain/73b5278f-c6f4-4a4b-8a58-0430bf4a2f2e/gt_premium_logo_1776255667401.png";

const Navbar = ({ onLogin, onNavigate, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (view) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">
          <img src={logo} alt="GIJO TOUR Logo" />
          <span className="logo-text">GIJO TOUR</span>
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
                className={currentView === 'home' ? 'active' : ''} 
                onClick={() => handleNavClick('home')}
              >
                <span className="nav-icon">🏠</span> <span className="nav-text">홈</span>
              </button>
            </li>
            <li>
              <button 
                className={currentView === 'tv' ? 'active' : ''} 
                onClick={() => handleNavClick('tv')}
              >
                <span className="nav-icon">📺</span> <span className="nav-text">여행설계사 TV</span>
              </button>
            </li>
            <li><a href="#designer" onClick={() => setIsMenuOpen(false)}><span className="nav-icon">👔</span> <span className="nav-text">여행 설계사</span></a></li>
            <li><a href="#regions" onClick={() => setIsMenuOpen(false)}><span className="nav-icon">🌍</span> <span className="nav-text">서비스 지역</span></a></li>
            <li className="nav-divider"></li>
            <li className="nav-action-item"><button onClick={() => { onLogin('admin'); setIsMenuOpen(false); }}><span className="nav-icon">🔑</span> <span className="nav-text">관리자</span></button></li>
            <li className="nav-action-item"><button onClick={() => { onLogin('designer'); setIsMenuOpen(false); }}><span className="nav-icon">🔓</span> <span className="nav-text">설계사</span></button></li>
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
