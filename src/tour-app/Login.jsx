import React, { useState } from 'react';

const Login = ({ onBack, onLoginSuccess, initialRole }) => {
  const [selectedRole, setSelectedRole] = useState(initialRole || 'designer');

  return (
    <div className="login-screen-wrapper">
      <button className="btn-back-home" onClick={onBack}>
        <span>←</span> BACK TO MAIN
      </button>

      <div className="login-cinema-container animate-up">
        <div className="login-card-elite glass-card">
          <div className="login-header-elite">
            <div className="elite-badge">GIJO TOUR ACCESS</div>
            <h2>{selectedRole === 'admin' ? '운영자 시스템' : '여행 설계사 포털'}</h2>
            <p>보안 인증을 통해 {selectedRole === 'admin' ? '관리자 권한' : '전문가 계정'}으로 접속하세요.</p>
          </div>

          <div className="role-switcher">
            <button 
              className={selectedRole === 'designer' ? 'active' : ''} 
              onClick={() => setSelectedRole('designer')}
            >
              TRAVEL DESIGNER
            </button>
            <button 
              className={selectedRole === 'admin' ? 'active' : ''} 
              onClick={() => setSelectedRole('admin')}
            >
              SUPER ADMIN
            </button>
          </div>

          <form className="login-form-elite" onSubmit={(e) => { e.preventDefault(); onLoginSuccess(selectedRole); }}>
            <div className="elite-input-group">
              <label>ID / EMAIL</label>
              <input type="text" placeholder="example@gijo.co.kr" />
            </div>
            <div className="elite-input-group">
              <label>PASSWORD</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <div className="elite-form-actions">
              <label className="elite-checkbox">
                <input type="checkbox" />
                <span>정보 기억하기</span>
              </label>
              <button type="button" className="btn-link">암호 복구</button>
            </div>

            <button type="submit" className="btn-login-elite">
              SECURE LOGIN
            </button>

            <div className="demo-access-section" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.2rem' }}>직접 체험해 보세요 (테스트용)</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ flex: 1, padding: '0.8rem', fontSize: '0.85rem' }}
                  onClick={() => onLoginSuccess('admin')}
                >
                  Admin 체험 👑
                </button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ flex: 1, padding: '0.8rem', fontSize: '0.85rem' }}
                  onClick={() => onLoginSuccess('designer')}
                >
                  설계사 체험 👔
                </button>
              </div>
            </div>
          </form>

          {selectedRole === 'designer' && (
            <div className="login-footer-elite">
              <p>아직 설계사로 등록되지 않으셨나요?</p>
              <button className="btn-apply-designer">파트너십 제휴 신청</button>
            </div>
          )}
        </div>
      </div>
      
      {/* Cinematic Overlays */}
      <div className="cinema-overlay"></div>
    </div>
  );
};

export default Login;
