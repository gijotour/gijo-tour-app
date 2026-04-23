import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminPanel = ({ onLogout, designers, setDesigners, stats, pendingRequests = [], onApprove }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'active';

  const toggleStatus = (id) => {
    setDesigners(designers.map(d => {
      if (d.id === id) {
        const statuses = ['Active', 'Pending', 'Suspended'];
        const nextStatus = statuses[(statuses.indexOf(d.status) + 1) % statuses.length];
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  return (
    <div className="dashboard-elite-layout no-sidebar">

      <main className="dashboard-main-elite">
        <div className="elite-dashboard-content custom-scrollbar">
          <div className="content-intro">
            <h1>{activeTab === 'active' ? '운영 효율성 대시보드' : '여행설계사 가입 요청'}</h1>
            <p>{activeTab === 'active' ? '플랫폼 내 활동 여행설계사 및 실시간 비즈니스 지표를 관리합니다.' : '새로운 여행설계사 파트너들의 신청 내역을 검토하고 승인합니다.'}</p>
          </div>

          {activeTab === 'active' && (
            <div className="elite-stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="elite-stat-card glass-card">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                  <div className="stat-glow"></div>
                </div>
              ))}
            </div>
          )}

          <div className="elite-table-section glass-card">
            <div className="table-header-elite">
              <h3>{activeTab === 'active' ? '여행설계사 데이터베이스' : '가입 신청 내역'}</h3>
            </div>
            
            <table className="elite-dashboard-table">
              <thead>
                {activeTab === 'active' ? (
                  <tr>
                    <th>여행설계사</th>
                    <th>지역</th>
                    <th>기록</th>
                    <th>평점</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                ) : (
                  <tr>
                    <th>신청자 명</th>
                    <th>활동 지역</th>
                    <th>자기소개 및 경력</th>
                    <th>신청 일자</th>
                    <th>관리</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {activeTab === 'active' ? (
                  designers.map(d => (
                    <tr key={d.id}>
                      <td data-label="여행설계사">
                        <div className="designer-cell">
                          <div className="mini-avatar"></div>
                          <span>{d.name}</span>
                        </div>
                      </td>
                      <td data-label="지역">{d.region}</td>
                      <td data-label="기록">{d.totalProposals} Proposals</td>
                      <td data-label="평점" className="rating-cell">★ {d.rating}</td>
                      <td data-label="상태">
                        <span className={`elite-status-pill ${d.status.toLowerCase()}`}>
                          {d.status}
                        </span>
                      </td>
                      <td data-label="관리">
                        <div className="elite-table-btns">
                          <button className="btn-table-action" onClick={() => toggleStatus(d.id)}>
                            {d.status === 'Active' ? 'SUSPEND' : 'ACTIVATE'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  pendingRequests.length > 0 ? (
                    pendingRequests.map(req => (
                      <tr key={req.id}>
                        <td data-label="신청자 명"><strong>{req.name}</strong></td>
                        <td data-label="활동 지역">{req.region}</td>
                        <td data-label="자기소개 및 경력" style={{ maxWidth: '300px', fontSize: '0.85rem', opacity: 0.8 }}>{req.bio}</td>
                        <td data-label="신청 일자">{req.date}</td>
                        <td data-label="관리">
                          <button className="btn-table-action primary" onClick={() => onApprove(req.id)}>APPROVE</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>대기 중인 가입 요청이 없습니다.</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <style>{styles}</style>
    </div>
  );
};

const styles = `
  .content-intro { margin-bottom: 3rem; }
  .content-intro h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 0.5rem; }
  .content-intro p { opacity: 0.6; font-size: 1.1rem; }

  @media (max-width: 900px) {
    .dashboard-elite-layout { flex-direction: column; }
    .elite-sidebar { width: 100%; height: auto; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .sidebar-nav-elite { flex-direction: row; overflow-x: auto; padding: 0.5rem; gap: 0.3rem; }
    .nav-item-elite { padding: 6px 12px; font-size: 0.75rem; white-space: nowrap; border-radius: 8px; }
    .nav-item-elite .icon { font-size: 0.9rem; margin-right: 5px; }
    .sidebar-footer-elite { display: none; }
    .dashboard-main-elite { padding: 1rem; }
    .elite-stats-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .elite-stats-grid { grid-template-columns: 1fr; }
    .table-header-elite { flex-direction: column; align-items: flex-start; gap: 1rem; }
    
    /* Premium Card Layout for Admin */
    .elite-dashboard-table thead { display: none; }
    .elite-dashboard-table tr { 
      display: block; 
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      margin-bottom: 1.2rem;
      padding: 1.2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .elite-dashboard-table td { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      width: 100%; 
      border: none !important; 
      padding: 10px 0 !important;
      font-size: 0.85rem !important;
    }
    .elite-dashboard-table td::before { 
      content: attr(data-label); 
      font-weight: 700; 
      color: var(--accent-color); 
      font-size: 0.75rem; 
      opacity: 0.6;
    }
    .designer-cell { justify-content: flex-end !important; }
  }
`;

export default AdminPanel;
