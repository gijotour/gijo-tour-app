import React from 'react';

const AdminPanel = ({ onLogout, designers, setDesigners, stats }) => {
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

  const approveDesigner = (id) => {
    setDesigners(designers.map(d => 
      d.id === id ? { ...d, status: 'Active' } : d
    ));
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">AD</div>
          <span>GIJO ADMIN</span>
        </div>
        <nav className="admin-nav">
          <button className="nav-item active">📊 대시보드</button>
          <button className="nav-item">👔 설계사 관리</button>
          <button className="nav-item">🏢 정산 관리</button>
          <button className="nav-item">⚙️ 설정</button>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="btn-logout" onClick={onLogout}>시스템 로그아웃</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-search">
            <input type="text" placeholder="설계사 이름 또는 지역 검색..." />
          </div>
          <div className="admin-profile">
            <span className="badge-admin">Super Admin</span>
            <div className="avatar"></div>
          </div>
        </header>

        <div className="admin-body">
          <div className="admin-title">
            <h2>여행 설계사(Designer) 관리</h2>
            <p>플랫폼 내 활동 중인 모든 전문가 리스트 및 승인 상태를 관리합니다.</p>
          </div>

          <div className="admin-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card purple-card">
                <span className="label">{stat.label}</span>
                <span className="value">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="admin-table-container glass-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>활동 지역</th>
                  <th>누적 제안수</th>
                  <th>평점</th>
                  <th>상태</th>
                  <th>관리 액션</th>
                </tr>
              </thead>
              <tbody>
                {designers.map(d => (
                  <tr key={d.id}>
                    <td className="bold">{d.name}</td>
                    <td>{d.region}</td>
                    <td>{d.totalProposals}건</td>
                    <td className="rating">★ {d.rating}</td>
                    <td>
                      <span className={`status-badge ${d.status}`}>{d.status}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {d.status === 'Pending' ? (
                          <button className="btn-approve" onClick={() => approveDesigner(d.id)}>승인</button>
                        ) : (
                          <button className="btn-toggle" onClick={() => toggleStatus(d.id)}>
                            {d.status === 'Active' ? '정지' : '활성화'}
                          </button>
                        )}
                        <button className="btn-edit-small">수정</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

    </div>
  );
};

export default AdminPanel;
