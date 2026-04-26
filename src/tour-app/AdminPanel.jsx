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
            <h1>
              {activeTab === 'active' && '운영 효율성 대시보드'}
              {activeTab === 'pending' && '여행설계사 가입 요청'}
              {activeTab === 'cs' && '🚨 실시간 고객 CS 센터'}
              {activeTab === 'reports' && '📈 상세 퍼포먼스 리포트'}
              {activeTab === 'finance' && '🏦 정산 및 재무 관리'}
              {activeTab === 'settings' && '⚙️ 플랫폼 통합 설정'}
            </h1>
            <p>
              {activeTab === 'active' && '플랫폼 내 활동 여행설계사 및 실시간 비즈니스 지표를 관리합니다.'}
              {activeTab === 'pending' && '새로운 여행설계사 파트너들의 신청 내역을 검토하고 승인합니다.'}
              {activeTab === 'cs' && '여행 중인 고객 및 설계사의 긴급 문의와 티켓을 실시간으로 관리합니다.'}
              {activeTab === 'reports' && '상품 판매 추이와 설계사별 퍼포먼스를 상세한 그래프로 분석합니다.'}
              {activeTab === 'finance' && '수익금 배분, 결제 대금 정산 및 플랫폼 재무 건전성을 관리합니다.'}
              {activeTab === 'settings' && '결제 게이트웨이 연동, 권한 설정 등 플랫폼의 전반적인 환경을 제어합니다.'}
            </p>
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

          {(activeTab === 'active' || activeTab === 'pending') && (
            <div className="elite-data-table glass-card">
              <table>
                <thead>
                  <tr>
                    {activeTab === 'active' ? (
                      <>
                        <th>여행설계사 (마스터)</th>
                        <th>지역</th>
                        <th>기록</th>
                        <th>평점</th>
                        <th>상태</th>
                        <th>관리</th>
                      </>
                    ) : (
                      <>
                        <th>신청자 명</th>
                        <th>활동 지역</th>
                        <th>자기소개 및 경력</th>
                        <th>신청 일자</th>
                        <th>관리</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'active' ? (
                    designers.map(d => (
                      <tr key={d.id}>
                        <td data-label="여행설계사 (마스터)">
                          <div className="designer-profile-cell">
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
          )}

          {activeTab === 'cs' && (
            <div className="elite-stats-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="elite-stat-card glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🚨</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>실시간 CS 센터 (개발 중)</h3>
                <p style={{ color: 'var(--text-muted)' }}>웹소켓 기반의 실시간 채팅 및 티켓 관리 시스템이 v2.0에 업데이트될 예정입니다.</p>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="elite-stats-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="elite-stat-card glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📈</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>상세 퍼포먼스 리포트 (개발 중)</h3>
                <p style={{ color: 'var(--text-muted)' }}>설계사별 판매 그래프, 월간/연간 매출 추이 등 심층 통계 기능이 v2.0에 추가됩니다.</p>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="elite-stats-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="elite-stat-card glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🏦</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>정산 및 재무 관리 (개발 중)</h3>
                <p style={{ color: 'var(--text-muted)' }}>PayPal MCP 결제 모듈 연동 및 자동 정산 시스템이 v2.0에 통합됩니다.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="elite-stats-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="elite-stat-card glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>⚙️</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>플랫폼 통합 설정 (개발 중)</h3>
                <p style={{ color: 'var(--text-muted)' }}>운영 정책, 권한 제어, 시스템 로그 확인 기능이 v2.0에 업데이트될 예정입니다.</p>
              </div>
            </div>
          )}
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
