import React, { useState } from 'react';

const DesignerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [showModal, setShowModal] = useState(false);

  // 새로운 제안 등록을 위한 상태
  const [itinerary, setItinerary] = useState([{ day: 1, content: '' }]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleAddDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, content: '' }]);
  };

  const handleRemoveDay = (index) => {
    if (itinerary.length > 1) {
      const newList = itinerary.filter((_, i) => i !== index).map((day, i) => ({ ...day, day: i + 1 }));
      setItinerary(newList);
    }
  };

  const handleUpdateDay = (index, value) => {
    const newList = [...itinerary];
    newList[index].content = value;
    setItinerary(newList);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files.map(f => f.name)]);
  };

  const proposals = [
    { id: 1, designer: "Alex Kim", region: "태국 방콕", title: "프리미엄 고객 인센티브 투어", status: "검토중", date: "2026-04-12" },
    { id: 2, designer: "Sarah Lee", region: "베트남 다낭", title: "VIP 고객 맞춤 특화 여행", status: "확정", date: "2026-04-10" },
    { id: 3, designer: "John Smith", region: "필리핀 클락", title: "골프 & 비즈니스 투어 토탈 케어", status: "완료", date: "2026-04-05" },
  ];

  const settlements = [
    { id: 1, date: "2026-04-01", project: "방콕 럭셔리 효도 관광", amount: "₩2,500,000", status: "지급완료" },
    { id: 2, date: "2026-03-25", project: "다낭 패밀리 서머 투어", amount: "₩1,800,000", status: "지급완료" },
    { id: 3, date: "2026-04-10", project: "마닐라 비즈니스 트립", amount: "₩4,200,000", status: "정산대기" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="elite-tab-container">
            <div className="elite-card-header">
              <h2>전문 설계사 프로필</h2>
              <p>귀하의 전문성을 돋보이게 하는 상세 프로필을 관리하세요.</p>
            </div>
            <div className="elite-profile-form glass-card">
              <div className="elite-form-section">
                <h3>기본 정보 및 연락처</h3>
                <div className="elite-form-row">
                  <div className="elite-input-wrap">
                    <label>성명 / 활동명</label>
                    <input type="text" defaultValue="홍길동 (Alex)" />
                  </div>
                  <div className="elite-input-wrap">
                    <label>전문 분야</label>
                    <input type="text" defaultValue="태국/베트남 프리미엄 투어" />
                  </div>
                </div>
                <div className="elite-form-row">
                  <div className="elite-input-wrap">
                    <label>연락처</label>
                    <input type="text" defaultValue="010-1234-5678" />
                  </div>
                  <div className="elite-input-wrap">
                    <label>활동 지역</label>
                    <input type="text" defaultValue="동남아 전역, 일본" />
                  </div>
                </div>
              </div>
              <button className="btn-elite-save">변경 사항 저장</button>
            </div>
          </div>
        );
      case 'settlements':
        return (
          <div className="elite-tab-container">
            <div className="elite-card-header">
              <h2>정산 및 수익 보고서</h2>
            </div>
            <div className="elite-stats-mini-row">
              <div className="mini-stat-box glass-card">
                <span className="label">총 누적 수익</span>
                <span className="value">₩12,450,000</span>
              </div>
              <div className="mini-stat-box glass-card accent">
                <span className="label">정산 대기</span>
                <span className="value">₩4,200,000</span>
              </div>
            </div>
            <div className="elite-table-box glass-card">
              <table className="elite-dashboard-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>프로젝트</th>
                    <th>금액</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {settlements.map(s => (
                    <tr key={s.id}>
                      <td>{s.date}</td>
                      <td className="bold">{s.project}</td>
                      <td>{s.amount}</td>
                      <td><span className={`elite-status-pill ${s.status === '정산대기' ? 'pending' : 'paid'}`}>{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'proposals':
      default:
        return (
          <div className="elite-tab-container">
            <div className="elite-card-header-flex">
              <div>
                <h2>나의 설계 제안 관리</h2>
                <p>현재 진행 중인 제안 및 매칭 상태를 확인하세요.</p>
              </div>
              <button className="btn-elite-add" onClick={() => setShowModal(true)}>+ 새로운 제안 등록</button>
            </div>
            <div className="elite-proposal-grid">
              {proposals.map(p => (
                <div key={p.id} className="elite-proposal-card glass-card">
                  <div className="p-header">
                    <span className="p-tag">{p.region}</span>
                    <span className={`p-badge ${p.status}`}>{p.status}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <div className="p-footer">
                    <span className="p-date">{p.date}</span>
                    <button className="btn-p-view">상세 보기</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-elite-layout">
      {/* New Proposal Modal (Elite Style) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card elite-wide-modal">
            <div className="modal-header-elite">
              <h2>새로운 여행 설계 등록</h2>
              <p>프리미엄 고객을 위한 최적의 여정을 제안하세요.</p>
            </div>
            <div className="modal-body-elite custom-scrollbar">
              <div className="elite-form-group">
                <label>제안 제목</label>
                <input type="text" placeholder="예: 방콕 테마 투어 패키지" />
              </div>
              <div className="elite-form-row">
                <div className="elite-form-group">
                  <label>지역</label>
                  <input type="text" placeholder="예: 태국 방콕" />
                </div>
                <div className="elite-form-group">
                  <label>유튜브 링크 (선택)</label>
                  <input type="text" placeholder="https://..." />
                </div>
              </div>
              <div className="elite-form-group">
                <label>여행 일정 구성</label>
                <button className="btn-day-add-small" onClick={handleAddDay}>+ 일차 추가</button>
                <div className="elite-itinerary-builder">
                  {itinerary.map((item, index) => (
                    <div key={index} className="itinerary-row-elite">
                      <span className="day-count">Day {item.day}</span>
                      <textarea 
                        placeholder="일정 세부 사항 입력..."
                        value={item.content}
                        onChange={(e) => handleUpdateDay(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer-elite">
              <button className="btn-close-elite" onClick={() => setShowModal(false)}>닫기</button>
              <button className="btn-submit-elite" onClick={() => setShowModal(false)}>제안서 제출하기</button>
            </div>
          </div>
        </div>
      )}

      <aside className="elite-sidebar glass-card">
        <div className="sidebar-brand">
          <span className="brand-dot designer"></span>
          <h2>GT DESIGNER</h2>
        </div>
        <nav className="sidebar-nav-elite">
          <button 
            className={`nav-item-elite ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            <span className="icon">📋</span> PROPOSALS
          </button>
          <button 
            className={`nav-item-elite ${activeTab === 'settlements' ? 'active' : ''}`}
            onClick={() => setActiveTab('settlements')}
          >
            <span className="icon">📊</span> REVENUE
          </button>
          <button 
            className={`nav-item-elite ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <span className="icon">👩‍💼</span> PROFILE
          </button>
        </nav>
        <div className="sidebar-footer-elite">
          <button className="btn-logout-elite" onClick={onLogout}>
            SECURE SIGN OUT
          </button>
        </div>
      </aside>

      <main className="dashboard-main-elite">
        <header className="elite-dashboard-header">
          <div className="header-breadcrumbs">
            <span>DESIGNER</span> / <strong>{activeTab.toUpperCase()}</strong>
          </div>
          <div className="elite-admin-profile">
            <span className="designer-name-elite">홍길동 설계사님</span>
            <div className="avatar-elite designer-avatar"></div>
          </div>
        </header>

        <div className="elite-dashboard-content custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DesignerDashboard;
