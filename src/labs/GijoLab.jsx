import { useNavigate } from 'react-router-dom';

const GijoLab = () => {
  const navigate = useNavigate();
  const onEnterApp = () => navigate('/gijotour');
  return (
    <div className="lab-landing page-fade-in">
      <section className="lab-hero">
        <div className="lab-badge animate-up">GIJO LAB & INNOVATION</div>
        <h1 className="lab-title animate-up delay-1">
          FUTURE OF <span>TRAVEL TECH</span>
        </h1>
        <p className="lab-description animate-up delay-2">
          gijo LAB은 단순한 여행을 넘어, 데이터와 기술을 결합하여 
          초개인화된 여행 경험의 미래를 설계합니다. 우리는 기술로 여행의 가치를 혁신합니다.
        </p>
        
        <div className="lab-cta-group animate-up delay-3">
          <button className="btn-lab-primary" onClick={onEnterApp}>
            Try gijo-tour App
          </button>
          <button className="btn-lab-secondary">
            View Research
          </button>
        </div>
      </section>

      <section className="lab-showcase">
        <div className="container">
          <div className="section-badge animate-up" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>THE ECOSYSTEM</div>
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '5rem' }} className="animate-up">Our Innovation Suites</h2>
          
          <div className="showcase-grid">
            {/* App 1: gijo-tour */}
            <div className="showcase-card animate-up delay-1" style={{ border: '1px solid var(--lab-accent)' }}>
              <div className="video-badge" style={{ position: 'relative', top: 0, right: 0, marginBottom: '1.5rem', width: 'fit-content' }}>FLAGSHIP PROJECT</div>
              <h3 className="sc-title">gijo-tour</h3>
              <p className="sc-desc" style={{ marginBottom: '2.5rem' }}>
                GIJO Labs의 첫 번째 결과물인 글로벌 B2B 여행 설계 플랫폼. 
                전 세계 전문가들이 사용하는 지능형 투어 빌더와 리얼타임 시스템입니다.
              </p>
              <button className="btn-lab-primary" style={{ width: '100%' }} onClick={onEnterApp}>
                Launch Platform 🚀
              </button>
            </div>

            {/* App 2: gijo-data (Hypothetical) */}
            <div className="showcase-card animate-up delay-2">
              <div className="video-badge" style={{ position: 'relative', top: 0, right: 0, marginBottom: '1.5rem', width: 'fit-content', borderColor: '#ff3366', color: '#ff3366', boxShadow: 'none' }}>COMING SOON</div>
              <h3 className="sc-title">gijo-data</h3>
              <p className="sc-desc" style={{ marginBottom: '2.5rem' }}>
                전 세계 여행 데이터를 집약한 빅데이터 분석 엔진. 
                시장 트렌드와 고객 선호도를 예측하여 비즈니스 통찰력을 제공합니다.
              </p>
              <button className="btn-lab-secondary" style={{ width: '100%', cursor: 'not-allowed' }} disabled>
                Reserved
              </button>
            </div>

            {/* App 3: gijo-insight (Hypothetical) */}
            <div className="showcase-card animate-up delay-3">
              <div className="video-badge" style={{ position: 'relative', top: 0, right: 0, marginBottom: '1.5rem', width: 'fit-content', borderColor: '#9b51e0', color: '#9b51e0', boxShadow: 'none' }}>RESEARCH</div>
              <h3 className="sc-title">gijo-insight</h3>
              <p className="sc-desc" style={{ marginBottom: '2.5rem' }}>
                AI 기반의 고객 경험 최적화 도구. 고객의 숨은 니즈를 발견하고 
                여행 만족도를 극대화하는 개인화된 솔루션입니다.
              </p>
              <button className="btn-lab-secondary" style={{ width: '100%', cursor: 'not-allowed' }} disabled>
                In Lab
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-showcase">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '6rem', borderRadius: '40px', background: 'linear-gradient(135deg, rgba(0,255,210,0.05) 0%, rgba(0,102,255,0.05) 100%)' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Experience the Future Today</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.7, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              gijo LAB이 설계한 첫 번째 결과물, gijo-tour 플랫폼을 지금 바로 체험해 보세요.
            </p>
            <button className="btn-primary btn-large" style={{ padding: '1.5rem 4rem' }} onClick={onEnterApp}>
              Get Started with gijo-tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GijoLab;
