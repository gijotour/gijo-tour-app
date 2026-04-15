import React, { useState, useEffect } from 'react';

const logo = "/home/john/.gemini/antigravity/brain/73b5278f-c6f4-4a4b-8a58-0430bf4a2f2e/gt_premium_logo_1776255667401.png";

const Navbar = ({ onLogin }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">
          <img src={logo} alt="GT GIJO TOUR Logo" />
          <span className="logo-text">GT GIJO TOUR</span>
        </div>
        
        <div className="nav-capsule">
          <ul className="nav-links">
            <li><a href="#hero"><span className="nav-icon">🏠</span> <span className="nav-text">홈</span></a></li>
            <li><a href="#designer"><span className="nav-icon">👔</span> <span className="nav-text">여행 설계사</span></a></li>
            <li><a href="#regions"><span className="nav-icon">🌍</span> <span className="nav-text">글로벌 서비스 지역</span></a></li>
            <li><a href="#b2b"><span className="nav-icon">💼</span> <span className="nav-text">B2B 전용</span></a></li>
            <li className="nav-divider"></li>
            <li className="nav-action-item"><button onClick={() => onLogin('admin')}><span className="nav-icon">🔑</span> <span className="nav-text">관리자</span></button></li>
            <li className="nav-action-item"><button onClick={() => onLogin('designer')}><span className="nav-icon">🔓</span> <span className="nav-text">설계사</span></button></li>
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
