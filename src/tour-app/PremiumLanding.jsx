import React from 'react';

const PremiumLanding = () => {
  const kakaoUrl = 'https://pf.kakao.com/_YOUR_CHANNEL';

  const openKakao = () => {
    window.location.href = kakaoUrl;
  };

  return (
    <main className="premium-landing">
      <section className="premium-hero">
        <div className="premium-hero-bg" />
        <div className="premium-container premium-hero-inner">
          <p className="premium-badge">GIJO TOUR Premium Travel Design</p>
          <h1>여행 가서 왜 더 피곤해질까요?</h1>
          <p className="premium-subtitle">
            직접 알아보기 때문입니다. GIJO는 여행을 설계해서 보내드립니다.
          </p>
          <div className="premium-cta-row">
            <button type="button" onClick={openKakao}>카톡으로 3분 상담</button>
            <a href="#request">무료 여행 설계 받기</a>
            <a href="/gijotour/proposals" className="ghost">기존 제안 보기</a>
          </div>
          <div className="premium-proof-row">
            <span>한국 상담</span>
            <span>맞춤 일정</span>
            <span>검증 가이드</span>
            <span>현지 케어</span>
          </div>
        </div>
      </section>

      <section className="premium-section premium-pain">
        <div className="premium-container">
          <p className="premium-badge">Problem</p>
          <h2>여행이 아니라 노동이 되는 순간</h2>
          <div className="premium-grid four">
            <div>공항에서 대기</div>
            <div>일정 짜느라 스트레스</div>
            <div>가이드 퀄리티 복불복</div>
            <div>현지 사기·바가지 걱정</div>
          </div>
          <p className="premium-big-copy">그래서 여행은 쉬러 가는 게 아니라, 또 하나의 일이 됩니다.</p>
        </div>
      </section>

      <section className="premium-section premium-solution">
        <div className="premium-container split">
          <div>
            <p className="premium-badge">Solution</p>
            <h2>GIJO가 전부 설계합니다</h2>
            <p>
              고객은 상품을 고르는 것이 아니라, 상황을 말합니다. GIJO는 인원, 목적, 예산, 일정에 맞춰 여행 전체를 설계하고 검증된 현지 파트너와 연결합니다.
            </p>
          </div>
          <div className="premium-card-list">
            <div><strong>01</strong><span>한국에서 먼저 상담</span></div>
            <div><strong>02</strong><span>고객 상황별 일정 설계</span></div>
            <div><strong>03</strong><span>검증된 현지 가이드 배정</span></div>
            <div><strong>04</strong><span>여행 중 문제 대응</span></div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-product">
        <div className="premium-container">
          <p className="premium-badge">MVP Package</p>
          <h2>필리핀 프리미엄 3박4일 프라이빗 투어</h2>
          <p className="premium-subtitle small">아무것도 신경 안 써도 되는 여행</p>

          <div className="premium-days">
            <div>
              <strong>DAY 1</strong>
              <h3>도착하자마자 쉬는 여행</h3>
              <p>공항 도착 → 대기 없이 픽업 → 호텔 체크인 → 첫날은 무리하지 않고 휴식합니다.</p>
            </div>
            <div>
              <strong>DAY 2</strong>
              <h3>우리만의 프라이빗 일정</h3>
              <p>호핑, 현지 스팟, 식사 동선까지 가이드가 케어합니다. 복잡한 선택은 GIJO가 정리합니다.</p>
            </div>
            <div>
              <strong>DAY 3</strong>
              <h3>예약 스트레스 없는 하루</h3>
              <p>마사지, 자유 일정, 맛집 예약까지 고객 취향에 맞춰 설계합니다.</p>
            </div>
            <div>
              <strong>DAY 4</strong>
              <h3>공항까지 끝까지 케어</h3>
              <p>체크아웃부터 공항 이동까지 마지막 순간까지 편하게 마무리합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-trust">
        <div className="premium-container">
          <p className="premium-badge">Trust</p>
          <h2>GIJO를 써야 하는 이유</h2>
          <div className="premium-grid three">
            <div>
              <h3>한국 출발 풀케어</h3>
              <p>상담부터 일정 설계, 공항 케어까지 여행 전 과정을 한 번에 관리합니다.</p>
            </div>
            <div>
              <h3>검증된 현지 가이드</h3>
              <p>아무나 연결하지 않고 GIJO가 선별한 파트너만 운영합니다.</p>
            </div>
            <div>
              <h3>프라이빗 여행</h3>
              <p>단체 패키지가 아니라 가족, 부부, 소규모 그룹 중심의 맞춤 여행입니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-linked">
        <div className="premium-container">
          <p className="premium-badge">Connected Features</p>
          <h2>기존 기능은 뒤에서 매출 흐름을 받칩니다</h2>
          <div className="premium-feature-links">
            <a href="/gijotour/proposals">
              <span>제안서 보기</span>
              <strong>상담 후 고객에게 보여줄 맞춤 제안</strong>
              <em>기존 DesignerShowcase 연계</em>
            </a>
            <a href="/gijotour/reviews">
              <span>후기/공지</span>
              <strong>신뢰 확보용 후기와 운영 소식</strong>
              <em>기존 NoticeBoard 연계</em>
            </a>
            <a href="/gijotour/tv">
              <span>여행설계사 TV</span>
              <strong>콘텐츠와 영상으로 신뢰 강화</strong>
              <em>기존 DesignerTV 연계</em>
            </a>
            <a href="/gijotour/about">
              <span>기업 워크샵</span>
              <strong>B2B 문의와 지역 선택 흐름</strong>
              <em>기존 B2B/Region 기능 연계</em>
            </a>
          </div>
        </div>
      </section>

      <section className="premium-section premium-price">
        <div className="premium-container">
          <p className="premium-badge">Price</p>
          <h2>선택은 단순하게, 경험은 프리미엄하게</h2>
          <div className="premium-price-grid">
            <div>
              <span>BASIC</span>
              <strong>159만원~</strong>
              <p>4성급 숙소 / 기본 맞춤 일정 / 검증 가이드 케어</p>
            </div>
            <div className="premium-best">
              <span>PREMIUM</span>
              <strong>219만원~</strong>
              <p>5성급 또는 풀빌라 / VIP 일정 / 고급 커스터마이징</p>
            </div>
          </div>
          <p className="premium-note">항공 포함 여부는 상담 후 선택 가능합니다. 예약금 30%, 출발 7일 전 잔금 70% 구조로 운영합니다.</p>
        </div>
      </section>

      <section id="request" className="premium-section premium-request">
        <div className="premium-container split">
          <div>
            <p className="premium-badge">Request</p>
            <h2>무료 여행 설계 요청</h2>
            <p>상담만 하면 나머지는 GIJO가 설계합니다. 3분 상담으로 여행의 큰 틀을 잡아드립니다.</p>
            <div className="premium-mini-actions">
              <a href="/gijotour/proposals">제안서 확인</a>
              <a href="/gijotour/reviews">후기 보기</a>
              <a href="/gijotour/login">파트너/관리자 로그인</a>
            </div>
          </div>
          <form className="premium-form">
            <input placeholder="인원" />
            <input placeholder="여행 날짜" />
            <input placeholder="예산" />
            <input placeholder="여행 목적" />
            <input placeholder="연락처" />
            <button type="button" onClick={openKakao}>카톡 상담으로 진행하기</button>
          </form>
        </div>
      </section>

      <style>{`
        .premium-landing { background:#070707; color:#fff; font-family: Outfit, Pretendard, system-ui, sans-serif; overflow:hidden; }
        .premium-container { width:min(1120px, calc(100% - 40px)); margin:0 auto; }
        .premium-section { padding:110px 0; position:relative; }
        .premium-hero { min-height:100vh; display:flex; align-items:center; position:relative; isolation:isolate; }
        .premium-hero-bg { position:absolute; inset:0; background:linear-gradient(90deg, rgba(0,0,0,.88), rgba(0,0,0,.58), rgba(0,0,0,.88)), url('/assets/hero_bg.png') center/cover no-repeat; z-index:-2; }
        .premium-hero-bg:after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 30% 30%, rgba(214,179,106,.22), transparent 35%); z-index:-1; }
        .premium-hero-inner { padding-top:72px; }
        .premium-badge { display:inline-block; padding:8px 14px; border:1px solid rgba(214,179,106,.45); border-radius:999px; color:#d6b36a; font-weight:800; letter-spacing:.08em; font-size:13px; text-transform:uppercase; margin-bottom:22px; }
        .premium-landing h1 { font-size:clamp(48px, 7vw, 92px); line-height:1.03; letter-spacing:-.06em; max-width:860px; margin:0 0 24px; color:#fff; }
        .premium-landing h2 { font-size:clamp(34px, 5vw, 58px); line-height:1.1; letter-spacing:-.045em; margin:0 0 22px; color:#fff; }
        .premium-landing h3 { color:#fff; margin:12px 0 10px; font-size:22px; }
        .premium-landing p { color:#cfcfcf; font-size:18px; line-height:1.8; }
        .premium-subtitle { font-size:24px !important; max-width:720px; color:#ededed !important; }
        .premium-subtitle.small { font-size:20px !important; margin-bottom:32px; }
        .premium-cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-top:38px; }
        .premium-cta-row button, .premium-cta-row a, .premium-form button { background:#d6b36a; color:#111; border:0; border-radius:999px; padding:17px 25px; font-weight:900; text-decoration:none; cursor:pointer; box-shadow:0 18px 45px rgba(214,179,106,.2); }
        .premium-cta-row a { background:rgba(255,255,255,.08); color:#fff; border:1px solid rgba(255,255,255,.16); }
        .premium-cta-row .ghost { background:rgba(214,179,106,.12); color:#d6b36a; border-color:rgba(214,179,106,.35); }
        .premium-proof-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:46px; }
        .premium-proof-row span { padding:11px 15px; border-radius:999px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); color:#f2f2f2; }
        .premium-grid, .premium-days, .premium-price-grid { display:grid; gap:18px; }
        .premium-grid.four { grid-template-columns:repeat(4, 1fr); }
        .premium-grid.three { grid-template-columns:repeat(3, 1fr); }
        .premium-grid > div, .premium-days > div, .premium-price-grid > div, .premium-card-list > div, .premium-feature-links > a { padding:28px; border-radius:26px; background:rgba(255,255,255,.065); border:1px solid rgba(255,255,255,.12); box-shadow:0 18px 55px rgba(0,0,0,.25); }
        .premium-big-copy { font-size:26px !important; color:#fff !important; margin-top:34px; font-weight:800; }
        .split { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
        .premium-card-list { display:grid; gap:14px; }
        .premium-card-list > div { display:flex; gap:18px; align-items:center; }
        .premium-card-list strong { color:#d6b36a; font-size:22px; }
        .premium-card-list span { font-size:19px; font-weight:800; color:#fff; }
        .premium-product { background:linear-gradient(180deg, #070707, #111, #070707); }
        .premium-days { grid-template-columns:repeat(4, 1fr); margin-top:28px; }
        .premium-days strong { color:#d6b36a; letter-spacing:.08em; }
        .premium-linked { background:radial-gradient(circle at top right, rgba(214,179,106,.12), transparent 36%), #090909; }
        .premium-feature-links { display:grid; grid-template-columns:repeat(4, 1fr); gap:18px; margin-top:32px; }
        .premium-feature-links a { display:flex; flex-direction:column; gap:10px; text-decoration:none; transition:.25s ease; }
        .premium-feature-links a:hover { transform:translateY(-6px); border-color:rgba(214,179,106,.55); background:rgba(214,179,106,.10); }
        .premium-feature-links span { color:#d6b36a; font-weight:900; }
        .premium-feature-links strong { color:#fff; font-size:20px; line-height:1.35; }
        .premium-feature-links em { color:#aaa; font-style:normal; font-size:14px; }
        .premium-price-grid { grid-template-columns:repeat(2, 1fr); margin-top:30px; }
        .premium-price-grid span { color:#d6b36a; font-weight:900; letter-spacing:.08em; }
        .premium-price-grid strong { display:block; color:#fff; font-size:42px; margin:12px 0; }
        .premium-best { border-color:rgba(214,179,106,.75) !important; background:linear-gradient(145deg, rgba(214,179,106,.16), rgba(255,255,255,.06)) !important; }
        .premium-note { margin-top:22px; color:#aaa !important; }
        .premium-request { background:#0d0d0d; }
        .premium-form { display:grid; gap:13px; }
        .premium-form input { width:100%; padding:17px 18px; border-radius:16px; border:1px solid rgba(255,255,255,.15); background:rgba(255,255,255,.075); color:#fff; font:inherit; }
        .premium-form input::placeholder { color:#9b9b9b; }
        .premium-mini-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:24px; }
        .premium-mini-actions a { color:#fff; text-decoration:none; padding:11px 14px; border:1px solid rgba(255,255,255,.15); border-radius:999px; background:rgba(255,255,255,.06); font-weight:800; font-size:14px; }
        @media (max-width: 900px) { .premium-grid.four, .premium-grid.three, .premium-days, .premium-price-grid, .premium-feature-links, .split { grid-template-columns:1fr; } .premium-section { padding:80px 0; } .premium-hero { min-height:92vh; } }
      `}</style>
    </main>
  );
};

export default PremiumLanding;
