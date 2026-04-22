import { useNavigate } from 'react-router-dom';

const GijoLab = () => {
  const navigate = useNavigate();
  const onEnterApp = () => navigate('/gijotour');
  
  const logo = "https://img.icons8.com/isometric/100/experimental-rocket-isometric.png";

  return (
    <div className="lab-hub-wrapper page-fade-in">
      <div className="hub-background">
        <div className="hub-mesh hub-mesh-1"></div>
        <div className="hub-mesh hub-mesh-2"></div>
      </div>

      <div className="container hub-container">
        <header className="hub-header animate-up">
          <div className="hub-logo-wrap">
            <img src={logo} alt="GIJO Labs" className="hub-logo-img" />
            <h1 className="logo-text hub-logo-text">GIJO Labs</h1>
          </div>
          <p className="hub-subtitle">Advanced Travel Technology & Innovation</p>
        </header>

        <div className="hub-selection-grid">
          {/* Main Entry: GIJO TOUR */}
          <div className="hub-card flagship animate-up delay-1" onClick={onEnterApp}>
            <div className="hub-card-content">
              <div className="hub-card-badge">FLAGSHIP PROJECT</div>
              <h2 className="hub-card-title">지아지조 투어</h2>
              <p className="hub-card-desc">
                전문 여행설계사와 비즈니스를 연결하는 <br />
                하이엔드 B2B 투어 플랫폼
              </p>
              <div className="hub-card-footer">
                <span className="hub-cta">ENTER PORTAL</span>
                <span className="hub-arrow">→</span>
              </div>
            </div>
            <div className="hub-card-bg-glow"></div>
          </div>

          {/* Secondary Entries: Under Development */}
          <div className="hub-card locked animate-up delay-2">
            <div className="hub-card-content">
              <div className="hub-card-badge muted">COMING SOON</div>
              <h2 className="hub-card-title">GIJO DATA</h2>
              <p className="hub-card-desc">
                전 세계 여행 시장 분석을 위한 <br />
                지능형 빅데이터 엔진
              </p>
            </div>
          </div>

          <div className="hub-card locked animate-up delay-3">
            <div className="hub-card-content">
              <div className="hub-card-badge muted">RESEARCH</div>
              <h2 className="hub-card-title">GIJO INSIGHT</h2>
              <p className="hub-card-desc">
                AI 기반 초개인화 <br />
                고객 경험 최적화 솔루션
              </p>
            </div>
          </div>
        </div>

        <footer className="hub-footer animate-up delay-5">
          <p>© 2026 GIJO Labs. All projects are part of the GIJO Ecosystem.</p>
        </footer>
      </div>

      <style>{`
        .lab-hub-wrapper {
          min-height: 100vh;
          background: #030508;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .hub-background {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
        }
        .hub-mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.1;
        }
        .hub-mesh-1 {
          width: 600px; height: 600px;
          background: #00d2ff;
          top: -10%; left: -10%;
        }
        .hub-mesh-2 {
          width: 500px; height: 500px;
          background: #9b51e0;
          bottom: -10%; right: -10%;
        }
        .hub-container {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 4rem 2rem;
        }
        .hub-header {
          margin-bottom: 5rem;
        }
        .hub-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .hub-logo-img {
          width: 100px;
          filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.4));
        }
        .hub-logo-text {
          font-size: 3.5rem;
          margin: 0;
        }
        .hub-subtitle {
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          opacity: 0.5;
          font-weight: 500;
        }
        .hub-selection-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hub-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 3.5rem 2.5rem;
          text-align: left;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hub-card.flagship {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 210, 255, 0.2);
        }
        .hub-card:hover {
          transform: translateY(-15px) scale(1.02);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(0, 210, 255, 0.4);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        }
        .hub-card.flagship:hover {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 210, 255, 0.1);
        }
        .hub-card.locked {
          opacity: 0.6;
          cursor: default;
        }
        .hub-card.locked:hover {
          transform: none;
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: none;
        }
        .hub-card-badge {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(0, 210, 255, 0.1);
          border: 1px solid rgba(0, 210, 255, 0.2);
          color: #00d2ff;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 2rem;
        }
        .hub-card-badge.muted {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
        }
        .hub-card-title {
          font-size: 2.2rem;
          margin-bottom: 1.2rem;
          font-weight: 800;
        }
        .hub-card-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          opacity: 0.7;
          margin-bottom: 3rem;
        }
        .hub-card-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #00d2ff;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .hub-arrow {
          transition: transform 0.3s ease;
        }
        .hub-card:hover .hub-arrow {
          transform: translateX(8px);
        }
        .hub-footer {
          margin-top: 6rem;
          opacity: 0.3;
          font-size: 0.9rem;
        }
        @media (max-width: 1024px) {
          .hub-selection-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }
          .hub-logo-text { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default GijoLab;
