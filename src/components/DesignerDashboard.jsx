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
          <div className="tab-content">
            <div className="content-header">
              <h2>설계사 프로필 관리</h2>
              <p>고객에게 신뢰를 줄 수 있는 전문적인 프로필을 구성하세요.</p>
            </div>
            <div className="account-form glass-card">
              <div className="form-section">
                <h3>기본 정보</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>설계사 성명 / 활동명</label>
                    <input type="text" defaultValue="홍길동 (Alex)" />
                  </div>
                  <div className="form-group">
                    <label>전문 분야</label>
                    <input type="text" defaultValue="태국/베트남 프리미엄 투어" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>연락처</label>
                    <input type="text" defaultValue="010-1234-5678" />
                  </div>
                  <div className="form-group">
                    <label>활동 가능 지역</label>
                    <input type="text" defaultValue="동남아 전역, 일본, 괌" />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3>전문성 강화</h3>
                <div className="form-group full-width">
                  <label>자기 소개 (Professional Bio)</label>
                  <textarea rows="4" defaultValue="15년 경력의 베테랑 여행 설계사입니다. 단순한 관광이 아닌, 고객의 가치관과 목적에 가장 부합하는 여정을 설계해 드립니다." />
                </div>
                <div className="form-group full-width">
                  <label>경력 및 자격 사항</label>
                  <textarea rows="3" defaultValue="- 관광통역안내사 (태국어, 영어)&#10;- 前 OO투어 동남아 팀장&#10;- 2,000건 이상의 인센티브 투어 기획 경험" />
                </div>
              </div>

              <div className="form-section">
                <h3>금융 정보</h3>
                <div className="form-group full-width">
                  <label>정산 계좌 정보</label>
                  <input type="text" defaultValue="국민은행 123-4567-890 (예금주: 홍길동)" />
                </div>
              </div>
              
              <button className="btn-save">프로필 설정 저장</button>
            </div>
          </div>
        );
      case 'settlements':
        return (
          <div className="tab-content">
            <div className="content-header">
              <h2>정산 및 수익 내역</h2>
              <button className="btn-download">엑셀 다운로드</button>
            </div>
            <div className="stats-row">
              <div className="stat-card glass-card">
                <span className="label">총 누적 수익</span>
                <span className="value">₩12,450,000</span>
              </div>
              <div className="stat-card glass-card">
                <span className="label">이번 달 정산 완료</span>
                <span className="value">₩4,300,000</span>
              </div>
              <div className="stat-card glass-card warning">
                <span className="label">정산 대기 금액</span>
                <span className="value">₩4,200,000</span>
              </div>
            </div>
            <div className="table-container glass-card">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>프로젝트명</th>
                    <th>금액</th>
                    <th>상태</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {settlements.map(s => (
                    <tr key={s.id}>
                      <td>{s.date}</td>
                      <td className="bold">{s.project}</td>
                      <td>{s.amount}</td>
                      <td><span className={`status-tag ${s.status === '정산대기' ? 'pending' : 'paid'}`}>{s.status}</span></td>
                      <td><button className="btn-small">상세</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="tab-content">
            <div className="content-header">
              <h2>시스템 설정</h2>
            </div>
            <div className="settings-grid">
              <div className="settings-card glass-card">
                <h3>보안 및 계정</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>비밀번호 변경</h4>
                    <p>마지막 변경일: 2개월 전</p>
                  </div>
                  <button className="btn-secondary">관리</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>2단계 인증</h4>
                    <p>보안 강화를 위해 권장합니다.</p>
                  </div>
                  <div className="toggle-switch"></div>
                </div>
              </div>
              
              <div className="settings-card glass-card">
                <h3>알림 설정</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>새로운 제안 요청 알림</h4>
                    <p>이메일 및 앱 푸시</p>
                  </div>
                  <div className="toggle-switch active"></div>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>정산 결과 알림</h4>
                    <p>정산 완료 시 메일 발송</p>
                  </div>
                  <div className="toggle-switch active"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'proposals':
      default:
        return (
          <div className="tab-content">
            <div className="content-header">
              <h2>나의 전담 설계 제안</h2>
              <button className="btn-request" onClick={() => setShowModal(true)}>+ 새로운 제안 등록</button>
            </div>
            <div className="stats-row">
              <div className="stat-card glass-card">
                <span className="label">대기중인 제안</span>
                <span className="value">5건</span>
              </div>
              <div className="stat-card glass-card">
                <span className="label">확정된 일정</span>
                <span className="value">2건</span>
              </div>
              <div className="stat-card glass-card">
                <span className="label">매칭 확률</span>
                <span className="value">78%</span>
              </div>
            </div>
            <div className="proposal-list">
              {proposals.map(p => (
                <div key={p.id} className="proposal-item glass-card">
                  <div className="p-info">
                    <span className="p-designer">{p.designer}</span>
                    <span className="p-region">{p.region}</span>
                    <h3 className="p-title">{p.title}</h3>
                  </div>
                  <div className="p-meta">
                    <span className={`p-status ${p.status}`}>{p.status}</span>
                    <span className="p-date">{p.date}</span>
                    <button className="btn-view">제안서 보기</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* New Proposal Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h2>새로운 여행 설계 등록</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body custom-scrollbar">
              <div className="modal-section">
                <h3>기본 정보</h3>
                <div className="form-group">
                  <label>제안 제목</label>
                  <input type="text" placeholder="예: 방콕 테마 투어 패키지" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>지역</label>
                    <input type="text" placeholder="예: 태국 방콕" />
                  </div>
                  <div className="form-group">
                    <label>예산 범위 (인당)</label>
                    <input type="text" placeholder="예: 100~200만원" />
                  </div>
                </div>
                <div className="form-group">
                  <label>대표 이미지 첨부</label>
                  <div className="image-upload-area">
                    <input type="file" multiple onChange={handleImageUpload} id="file-upload" hidden />
                    <label htmlFor="file-upload" className="upload-label">
                      <span>📸 이미지를 드래그하거나 클릭하여 추가하세요</span>
                    </label>
                    <div className="selected-files">
                      {selectedImages.map((name, i) => (
                        <span key={i} className="file-tag">{name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <div className="section-header-flex">
                  <h3>여행 일정 (Itinerary)</h3>
                  <button className="btn-add-day" onClick={handleAddDay}>+ 일차 추가</button>
                </div>
                <div className="itinerary-list">
                  {itinerary.map((item, index) => (
                    <div key={index} className="itinerary-item glass-card">
                      <div className="item-header">
                        <span className="day-label">Day {item.day}</span>
                        {itinerary.length > 1 && (
                          <button className="btn-remove-day" onClick={() => handleRemoveDay(index)}>&times;</button>
                        )}
                      </div>
                      <textarea 
                        placeholder={`${item.day}일차의 주요 일정을 입력하세요...`}
                        value={item.content}
                        onChange={(e) => handleUpdateDay(index, e.target.value)}
                        rows="2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h3>상세 설명</h3>
                <textarea rows="4" placeholder="제안하시는 여행의 핵심 가치를 설명해 주세요."></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-submit" onClick={() => setShowModal(false)}>제안서 등록하기</button>
            </div>
          </div>
        </div>
      )}

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-placeholder">GT</div>
          <span>GIJO DESIGNER</span>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            📋 나의 제안 관리
          </button>
          <button 
            className={`nav-item ${activeTab === 'settlements' ? 'active' : ''}`}
            onClick={() => setActiveTab('settlements')}
          >
            📊 정산 및 수익
          </button>
          <button 
            className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            👩‍💼 프로필 관리
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ 시스템 설정
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={onLogout}>로그아웃</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="main-header">
          <div className="user-profile">
            <div className="avatar"></div>
            <span>홍길동 여행 설계사님</span>
          </div>
        </header>
        <div className="dashboard-body">
          {renderContent()}
        </div>
      </main>

    </div>
  );
};

export default DesignerDashboard;
