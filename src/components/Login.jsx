import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Login = ({ onBack, onLoginSuccess, initialRole }) => {
  const [selectedRole, setSelectedRole] = useState(initialRole || 'designer'); // 'designer' or 'admin'

  return (
    <div className="login-portal">
      <div className="login-left">
        <div className="login-visual-content">
          <button className="btn-back" onClick={onBack}>
            ← 홈으로 돌아가기
          </button>
          <div className="brand-badge">GIJO TOUR PORTAL</div>
          <h1>새로운 여행의 기준<br /><span className="highlight">지조 투어 플랫폼</span></h1>
          <p>
            {selectedRole === 'admin' 
              ? '운영자 전용 모드입니다. 전체 시스템 및 설계사 관리를 위해 로그인해 주세요.'
              : '기업 고객 전용 모드입니다. 파트너 계정으로 로그인하여 맞춤 제안을 확인하세요.'}
          </p>
          
          <div className="value-props">
            <div className="prop">
              <span className="icon">🛡️</span>
              <div>
                <h4>Enterprise Security</h4>
                <p>모든 데이터는 최고 등급의 보안으로 보호됩니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-mesh"></div>
      </div>

      <div className="login-right">
        <div className="login-card glass-card">
          <div className="login-header">
            <img src={logo} alt="GIJO TOUR Logo" />
            <h2>{selectedRole === 'admin' ? '운영자 로그인' : '설계사 로그인'}</h2>
            <p>{selectedRole === 'admin' ? '관리자 인증 정보를 입력해 주세요.' : '설계사 계정으로 로그인해 주세요.'}</p>
          </div>

          <form className="login-form" onSubmit={(e) => { e.preventDefault(); onLoginSuccess(selectedRole); }}>
            <div className="input-group">
              <label>기업 이메일 / 아이디</label>
              <input type="text" placeholder="example@company.com" />
            </div>
            <div className="input-group">
              <label>비밀번호</label>
              <input type="password" placeholder="••••••••" />
            </div>
            
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                로그인 기억하기
              </label>
              <a href="#" className="forgot-link">비밀번호 찾기</a>
            </div>

            <button type="submit" className="btn-login">로그인</button>
          </form>

          {selectedRole === 'designer' && (
            <div className="login-footer">
              <p>아직 GIJO TOUR 설계사가 아니신가요?</p>
              <button className="btn-contact">여행 설계사 제휴 문의하기</button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Login;
