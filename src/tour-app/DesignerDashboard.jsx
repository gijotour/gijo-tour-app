import React, { useState } from 'react';

const DesignerDashboard = ({ onLogout, proposals = [], onAddProposal, tvVideos = [], onAddTvVideo }) => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [showModal, setShowModal] = useState(false);
  const [showTvModal, setShowTvModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 내 제안서 필터링 (Alex Kim 것이라고 가정하거나 전체 표시)
  const myProposals = proposals;

  // 새로운 제안 등록을 위한 상태
  const [newProposal, setNewProposal] = useState({
    title: '',
    region: '',
    price: '',
    youtubeUrl: '',
    description: '',
    itinerary: [{ day: 1, content: '' }]
  });

  // 새로운 TV 비디오 등록을 위한 상태
  const [newTvVideo, setNewTvVideo] = useState({
    title: '',
    category: '',
    youtubeUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bd6e79a?q=80&w=2039&auto=format&fit=crop'
  });

  const handleAddDay = () => {
    setNewProposal({
      ...newProposal,
      itinerary: [...newProposal.itinerary, { day: newProposal.itinerary.length + 1, content: '' }]
    });
  };

  const handleUpdateDay = (index, value) => {
    const newList = [...newProposal.itinerary];
    newList[index].content = value;
    setNewProposal({ ...newProposal, itinerary: newList });
  };

  const handleSubmitProposal = () => {
    if (!newProposal.title || !newProposal.region) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    const created = {
      id: Date.now(),
      designer: "Alex Kim",
      ...newProposal,
      status: "검토중",
      date: new Date().toISOString().split('T')[0]
    };

    onAddProposal(created);
    setShowModal(false);
    setNewProposal({ title: '', region: '', price: '', youtubeUrl: '', description: '', itinerary: [{ day: 1, content: '' }] });
    alert('새로운 제안서가 등록되었습니다!');
  };

  const handleSubmitTvVideo = () => {
    if (!newTvVideo.title || !newTvVideo.youtubeUrl || !newTvVideo.category) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    // 유튜브 링크 임베드 형식으로 변환 (간단한 처리)
    let embedUrl = newTvVideo.youtubeUrl;
    if (embedUrl.includes('watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
    }

    onAddTvVideo({
      ...newTvVideo,
      youtubeUrl: embedUrl,
      designer: "Alex Kim"
    });
    setShowTvModal(false);
    setNewTvVideo({ title: '', category: '', youtubeUrl: '', thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bd6e79a?q=80&w=2039&auto=format&fit=crop' });
    alert('새로운 TV 영상이 등록되었습니다!');
  };

  const settlements = [
    { id: 1, date: "2026-04-01", project: "방콕 럭셔리 효도 관광", amount: "₩2,500,000", status: "지급완료" },
    { id: 2, date: "2026-03-25", project: "다낭 패밀리 서머 투어", amount: "₩1,800,000", status: "지급완료" },
    { id: 3, date: "2026-04-10", project: "마닐라 비즈니스 트립", amount: "₩4,200,000", status: "정산대기" },
  ];

  const filteredProposals = myProposals.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.region && p.region.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: "활성 제안서", value: myProposals.length, icon: "📄" },
    { label: "이번달 확정", value: "8건", icon: "✨" },
    { label: "예상 정산액", value: "₩8,420,000", icon: "💰" },
    { label: "평균 평점", value: "4.9", icon: "⭐" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tv':
        return (
          <div className="elite-tab-container page-fade-in">
            <div className="elite-card-header-flex">
              <div>
                <h2>여행설계사 TV 관리</h2>
                <p>영상을 통해 고객들에게 신뢰와 현장감을 전달하세요.</p>
              </div>
              <button className="btn-elite-add" onClick={() => setShowTvModal(true)}>+ 새로운 영상 등록</button>
            </div>
            <div className="elite-table-box glass-card" style={{ marginTop: '2rem' }}>
              <table className="elite-dashboard-table">
                <thead>
                  <tr>
                    <th>썸네일</th>
                    <th>제목</th>
                    <th>지역</th>
                    <th>조회수</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {tvVideos.filter(v => v.designer === "Alex Kim" || v.designer === "홍길동").map(v => (
                    <tr key={v.id}>
                      <td><img src={v.thumbnail} alt="" style={{ width: '80px', borderRadius: '4px' }} /></td>
                      <td className="bold">{v.title}</td>
                      <td>{v.category}</td>
                      <td>{v.views}</td>
                      <td><button className="btn-p-view">삭제</button></td>
                    </tr>
                  ))}
                  {tvVideos.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>등록된 영상이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="elite-tab-container page-fade-in">
            <div className="elite-card-header">
              <h2>전문 여행설계사 프로필</h2>
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
          <div className="elite-tab-container page-fade-in">
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
            <div className="elite-table-box glass-card" style={{ marginTop: '2rem' }}>
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
          <div className="elite-tab-container page-fade-in">
            <div className="elite-stats-grid" style={{ marginBottom: '3rem' }}>
              {stats.map((s, i) => (
                <div key={i} className="elite-stat-card glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="stat-label">{s.label}</span>
                    <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  </div>
                  <span className="stat-value">{s.value}</span>
                  <div className="stat-glow"></div>
                </div>
              ))}
            </div>

            <div className="elite-card-header-flex">
              <div>
                <h2>나의 설계 제안 관리</h2>
                <p>현재 진행 중인 제안 및 매칭 상태를 확인하고 데이터를 직접 추가해 보세요.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="제목 또는 지역 검색..." 
                  className="table-search" 
                  style={{ width: '250px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn-elite-add" onClick={() => setShowModal(true)}>+ 새로운 제안 등록</button>
              </div>
            </div>

            <div className="elite-proposal-grid">
              {filteredProposals.map(p => (
                <div key={p.id} className="elite-proposal-card glass-card">
                  <div className="p-header">
                    <span className="p-tag">{p.region}</span>
                    <span className={`p-badge ${p.status === '검토중' ? 'Pending' : p.status === '확정' ? 'Active' : 'Completed'}`}>{p.status}</span>
                  </div>
                  <h3 style={{ minHeight: '3em' }}>{p.title}</h3>
                  <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between', opacity: 0.7, fontSize: '0.9rem' }}>
                    <span>예상 단가</span>
                    <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>{p.price || '상담 요청'}</span>
                  </div>
                  <div className="p-footer">
                    <span className="p-date">{p.date}</span>
                    <button className="btn-p-view">상세 편집</button>
                  </div>
                </div>
              ))}
              {filteredProposals.length === 0 && (
                <div className="empty-state-wrap glass-card" style={{ gridColumn: '1 / -1', padding: '5rem' }}>
                   <span style={{ fontSize: '3rem' }}>🔍</span>
                   <p style={{ marginTop: '1rem', opacity: 0.6 }}>검색 결과가 없거나 등록된 제안서가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-elite-layout">
      {/* Proposal Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card elite-wide-modal animate-up">
            <div className="modal-header-elite">
              <h2>새로운 여행 설계 등록</h2>
              <p>프리미엄 고객을 위한 최적의 여정을 제안하세요.</p>
            </div>
            <div className="modal-body-elite custom-scrollbar">
              <div className="elite-form-group">
                <label>제안 제목 (핵심 상품명)</label>
                <input 
                  type="text" 
                  placeholder="예: 방콕 테마 투어 패키지" 
                  value={newProposal.title}
                  onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                />
              </div>
              <div className="elite-form-row">
                <div className="elite-form-group">
                  <label>활동 지역 (예: 필리핀 클락)</label>
                  <input 
                    type="text" 
                    placeholder="국가명을 포함하면 검색이 더 정확해집니다." 
                    value={newProposal.region}
                    onChange={(e) => setNewProposal({...newProposal, region: e.target.value})}
                  />
                </div>
                <div className="elite-form-group">
                  <label>예상 1인 단가</label>
                  <input 
                    type="text" 
                    placeholder="예: ₩850,000" 
                    value={newProposal.price}
                    onChange={(e) => setNewProposal({...newProposal, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="elite-form-group">
                <label>상품 상세 설명 (간략히)</label>
                <textarea 
                  placeholder="상품의 핵심 셀링 포인트를 입력하세요..."
                  value={newProposal.description}
                  onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                />
              </div>
              <div className="elite-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={{ margin: 0 }}>여행 일정 구성</label>
                  <button className="btn-day-add-small" onClick={handleAddDay}>+ 일차 추가</button>
                </div>
                <div className="elite-itinerary-builder">
                  {newProposal.itinerary.map((item, index) => (
                    <div key={index} className="itinerary-row-elite">
                      <span className="day-count">Day {item.day}</span>
                      <textarea 
                        placeholder="해당 일차의 상세 일정을 입력하세요..."
                        value={item.content}
                        onChange={(e) => handleUpdateDay(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer-elite">
              <button className="btn-close-elite" onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-submit-elite" onClick={handleSubmitProposal}>데이터 등록하기</button>
            </div>
          </div>
        </div>
      )}

      {/* TV Video Modal */}
      {showTvModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card elite-wide-modal animate-up">
            <div className="modal-header-elite">
              <h2>새로운 여행설계사 TV 영상 등록</h2>
              <p>영상을 통해 더 많은 비즈니스 파트너와 연결되세요.</p>
            </div>
            <div className="modal-body-elite">
              <div className="elite-form-group">
                <label>영상 제목</label>
                <input 
                  type="text" 
                  placeholder="예: 다낭 럭셔리 리조트 실제 투숙기" 
                  value={newTvVideo.title}
                  onChange={(e) => setNewTvVideo({...newTvVideo, title: e.target.value})}
                />
              </div>
              <div className="elite-form-row">
                <div className="elite-form-group">
                  <label>지역/카테고리</label>
                  <input 
                    type="text" 
                    placeholder="예: 베트남" 
                    value={newTvVideo.category}
                    onChange={(e) => setNewTvVideo({...newTvVideo, category: e.target.value})}
                  />
                </div>
                <div className="elite-form-group">
                  <label>YouTube 링크</label>
                  <input 
                    type="text" 
                    placeholder="https://www.youtube.com/watch?v=..." 
                    value={newTvVideo.youtubeUrl}
                    onChange={(e) => setNewTvVideo({...newTvVideo, youtubeUrl: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer-elite">
              <button className="btn-close-elite" onClick={() => setShowTvModal(false)}>취소</button>
              <button className="btn-submit-elite" onClick={handleSubmitTvVideo}>영상 등록하기</button>
            </div>
          </div>
        </div>
      )}

      <aside className="elite-sidebar glass-card">
        <div className="sidebar-brand">
          <span className="brand-dot designer"></span>
          <h2>GT 여행설계사</h2>
        </div>
        <nav className="sidebar-nav-elite">
          <button 
            className={`nav-item-elite ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            <span className="icon">📋</span> PROPOSALS
          </button>
          <button 
            className={`nav-item-elite ${activeTab === 'tv' ? 'active' : ''}`}
            onClick={() => setActiveTab('tv')}
          >
            <span className="icon">📺</span> 여행설계사 TV
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
            <span>GT Labs Project</span> / <strong>여행설계사 {activeTab.toUpperCase()}</strong>
          </div>
          <div className="elite-admin-profile">
            <span className="designer-name-elite">홍길동 여행설계사님 (DEMO)</span>
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
