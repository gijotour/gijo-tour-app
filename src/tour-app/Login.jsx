import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Login = ({ onBack, onLoginSuccess, initialRole, onDesignerSignup, pendingRequests = [], activeDesigners = [] }) => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState(location.state?.initialView || 'login'); // 'login', 'signup', 'waiting'
  const [selectedRole, setSelectedRole] = useState(initialRole || 'designer');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [signupData, setSignupData] = useState({ name: '', email: '', region: '', bio: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    const inputId = id.trim();
    const isAdminAcc = ['admin', 'john', 'TINA', 'Bryan'].includes(inputId);

    if (selectedRole === 'admin' || isAdminAcc) {
      if (isAdminAcc && pw === 'admin1234') {
        let displayName = '시스템 관리자';
        if (inputId === 'john') displayName = 'John Admin';
        if (inputId === 'TINA') displayName = 'TINA Master';
        if (inputId === 'Bryan') displayName = 'Bryan Master';
        
        onLoginSuccess('admin', displayName);
      } else {
        alert('관리자 정보가 일치하지 않습니다. (비밀번호: admin1234)');
      }
    } else {
      // 1. 승인 대기 목록을 먼저 체크 (가장 높은 우선순위)
      const isPending = pendingRequests.find(req => 
        req.email.toLowerCase() === inputId.toLowerCase() || 
        req.name.toLowerCase() === inputId.toLowerCase()
      );

      if (isPending) {
        setViewMode('waiting');
        return;
      }

      // 2. 이미 승인된 활성 설계사 목록 체크
      const isActive = activeDesigners.find(d => 
        d.name.toLowerCase() === inputId.toLowerCase()
      );

      if (isActive || inputId === 'demo') {
        const finalName = isActive ? isActive.name : (inputId === 'demo' ? '데모설계사' : inputId);
        onLoginSuccess('designer', finalName);
      } else {
        alert('등록되지 않은 계정이거나 승인 대기 중입니다. 가입 정보를 확인해 주세요.');
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.region) {
      return alert('필수 정보를 모두 입력해 주세요.');
    }
    onDesignerSignup(signupData);
    setViewMode('waiting');
  };

  if (viewMode === 'waiting') {
    return (
      <div className="login-screen-wrapper">
        <div className="login-cinema-container animate-up">
          <div className="login-card-elite glass-card centered" style={{ padding: '4rem', textAlign: 'center' }}>
            <div className="waiting-icon animate-pulse">⏳</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>가입 승인 대기 중</h2>
            <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {signupData.name || id} 여행설계사님, 반갑니다!<br />
              현재 관리자가 가입 정보를 검토하고 있습니다.<br />
              승인이 완료되면 등록하신 이메일로 안내해 드리겠습니다.
            </p>
            <div className="waiting-steps">
              <div className="step active">신청 완료</div>
              <div className="step-line"></div>
              <div className="step">정보 검토</div>
              <div className="step-line"></div>
              <div className="step">최종 승인</div>
            </div>
            <button className="btn-primary" style={{ marginTop: '3rem', width: '100%' }} onClick={onBack}>홈으로 돌아가기</button>
          </div>
        </div>
        <div className="cinema-overlay"></div>
        <style>{`
          .waiting-icon { font-size: 5rem; margin-bottom: 2rem; }
          .waiting-steps { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 2rem; }
          .step { font-size: 0.8rem; padding: 8px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }
          .step.active { background: var(--accent-color); color: white; font-weight: 700; box-shadow: 0 0 15px var(--accent-glow); }
          .step-line { width: 30px; height: 1px; background: rgba(255,255,255,0.1); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="login-screen-wrapper">
      <button className="btn-back-home" onClick={onBack}>
        <span>←</span> BACK TO MAIN
      </button>

      <div className="login-cinema-container animate-up">
        <div className="login-card-elite glass-card">
          {viewMode === 'login' ? (
            <>
              <div className="login-header-elite">
                <div className="elite-badge">GIJO TOUR ACCESS</div>
                <h2>{selectedRole === 'admin' ? '운영자 시스템' : '여행설계사 포털'}</h2>
                <p>보안 인증을 통해 {selectedRole === 'admin' ? '관리자 권한' : '전문가 계정'}으로 접속하세요.</p>
              </div>

              <div className="role-switcher">
                <button className={selectedRole === 'designer' ? 'active' : ''} onClick={() => setSelectedRole('designer')}>여행설계사</button>
                <button className={selectedRole === 'admin' ? 'active' : ''} onClick={() => setSelectedRole('admin')}>SUPER ADMIN</button>
              </div>

              <form className="login-form-elite" onSubmit={handleLogin}>
                <div className="elite-input-group">
                  <label>ID / EMAIL</label>
                  <input type="text" placeholder="ID 또는 이메일을 입력하세요" value={id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <div className="elite-input-group">
                  <label>PASSWORD</label>
                  <input type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} required />
                </div>
                <button type="submit" className="btn-login-elite">SECURE LOGIN</button>
                
                <div className="demo-access-section" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '1rem' }}>마스터 계정: john, TINA, Bryan (PW: admin1234)</p>
                  <div className="master-btn-grid" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button type="button" className="btn-secondary" style={{ flex: '1 1 calc(33.3% - 0.5rem)', minWidth: '80px', fontSize: '0.7rem', padding: '10px 4px' }} onClick={() => { setId('john'); setPw('admin1234'); setSelectedRole('admin'); }}>john</button>
                    <button type="button" className="btn-secondary" style={{ flex: '1 1 calc(33.3% - 0.5rem)', minWidth: '80px', fontSize: '0.7rem', padding: '10px 4px' }} onClick={() => { setId('TINA'); setPw('admin1234'); setSelectedRole('admin'); }}>TINA</button>
                    <button type="button" className="btn-secondary" style={{ flex: '1 1 calc(33.3% - 0.5rem)', minWidth: '80px', fontSize: '0.7rem', padding: '10px 4px' }} onClick={() => { setId('Bryan'); setPw('admin1234'); setSelectedRole('admin'); }}>Bryan</button>
                  </div>
                </div>
              </form>

              {selectedRole === 'designer' && (
                <div className="login-footer-elite">
                  <p>아직 파트너가 아니신가요?</p>
                  <button className="btn-apply-designer" onClick={() => setViewMode('signup')}>여행설계사 제휴 신청</button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="login-header-elite">
                <div className="elite-badge">PARTNERSHIP</div>
                <h2>여행설계사 회원가입</h2>
                <p>GIJO TOUR의 프리미엄 설계사로 등록하여 비즈니스를 시작하세요.</p>
              </div>

              <form className="login-form-elite" onSubmit={handleSignupSubmit}>
                <div className="elite-input-group">
                  <label>성함 (실명)</label>
                  <input type="text" placeholder="홍길동" value={signupData.name} onChange={(e) => setSignupData({...signupData, name: e.target.value})} required />
                </div>
                <div className="elite-input-group">
                  <label>이메일 주소 (ID로 사용)</label>
                  <input type="email" placeholder="example@mail.com" value={signupData.email} onChange={(e) => setSignupData({...signupData, email: e.target.value})} required />
                </div>
                <div className="elite-input-group">
                  <label>주요 전문 지역</label>
                  <input type="text" placeholder="베트남 다낭, 필리핀 등" value={signupData.region} onChange={(e) => setSignupData({...signupData, region: e.target.value})} required />
                </div>
                <div className="elite-input-group">
                  <label>경력 및 자기소개</label>
                  <textarea rows="3" placeholder="간단한 이력을 입력해 주세요." value={signupData.bio} onChange={(e) => setSignupData({...signupData, bio: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', color: 'white' }}></textarea>
                </div>
                <button type="submit" className="btn-login-elite">가입 신청하기</button>
                <button type="button" className="btn-link" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setViewMode('login')}>이미 계정이 있으신가요? 로그인</button>
              </form>
            </>
          )}
        </div>
      </div>
      <div className="cinema-overlay"></div>
    </div>
  );
};

export default Login;
