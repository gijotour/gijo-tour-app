import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigateHub = ({ isLoggedIn, userName, userRole, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  // 루트 경로(/)에서는 보이지 않게 처리
  if (location.pathname === '/') return null;

  return (
    <div className="elite-nav-hub slim-hub animate-up">
      <button 
        className="nav-hub-btn back" 
        onClick={() => navigate(-1)}
        title="뒤로 가기"
      >
        <span className="icon">←</span>
      </button>
      <div className="nav-hub-divider"></div>
      <button 
        className="nav-hub-btn home" 
        onClick={() => navigate('/gijotour')}
        title="투어 홈으로"
      >
        <span className="icon">🏠</span>
      </button>

      {isLoggedIn && (
        <>
          <div className="nav-hub-divider"></div>
          <div className="nav-hub-user-wrapper">
            <button 
              className={`nav-hub-btn user ${isUserMenuOpen ? 'active' : ''}`}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title="내 정보"
            >
              <div className="nav-avatar mini" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${userName})` }}></div>
            </button>
            
            {isUserMenuOpen && (
              <div className="nav-hub-dropdown glass-card animate-down">
                <div className="hub-user-info">
                  <span className="name">{userName}님</span>
                  <span className="role">{userRole === 'admin' ? 'ADMIN' : 'DESIGNER'}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={() => { 
                  const el = document.getElementById('notice');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/gijotour');
                  setIsUserMenuOpen(false); 
                }}>📋 이모저모 (게시판)</button>
                <button className="dropdown-item" onClick={() => { navigate('/gijotour/designer'); setIsUserMenuOpen(false); }}>👤 대쉬보드</button>
                {userRole === 'admin' && (
                  <button className="dropdown-item" onClick={() => { navigate('/gijotour/admin'); setIsUserMenuOpen(false); }}>🛡️ 운영 시스템</button>
                )}
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={() => { onLogout(); setIsUserMenuOpen(false); }}>🚪 로그아웃</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NavigateHub;
