import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigateHub = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 루트 경로(/)에서는 보이지 않게 처리
  if (location.pathname === '/') return null;

  return (
    <div className="elite-nav-hub animate-up">
      <button 
        className="nav-hub-btn back" 
        onClick={() => navigate(-1)}
        title="뒤로 가기"
      >
        <span className="icon">←</span>
        <span className="label">BACK</span>
      </button>
      <div className="nav-hub-divider"></div>
      <button 
        className="nav-hub-btn home" 
        onClick={() => navigate('/gijotour')}
        title="투어 홈으로"
      >
        <span className="icon">🏠</span>
        <span className="label">GT HOME</span>
      </button>
    </div>
  );
};

export default NavigateHub;
