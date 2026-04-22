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
    <div className="dashboard-elite-layout">
      <aside className="elite-sidebar glass-card">
        <div className="sidebar-brand">
          <span className="brand-dot"></span>
          <h2>GT SYSTEM</h2>
        </div>
        <nav className="sidebar-nav-elite">
          <button className="nav-item-elite active">
            <span className="icon">📊</span> DASHBOARD
          </button>
          <button className="nav-item-elite">
            <span className="icon">👔</span> 여행설계사 관리
          </button>
          <button className="nav-item-elite">
            <span className="icon">🏦</span> FINANCE
          </button>
          <button className="nav-item-elite">
            <span className="icon">⚙️</span> SETTINGS
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
            <span>ADMIN</span> / <strong>OVERVIEW</strong>
          </div>
          <div className="elite-admin-profile">
            <div className="admin-badge-premium">ELITE ADMIN</div>
            <div className="avatar-elite"></div>
          </div>
        </header>

        <div className="elite-dashboard-content custom-scrollbar">
          <div className="content-intro">
            <h1>운영 효율성 대시보드</h1>
            <p>플랫폼 내 활동 여행설계사 및 실시간 비즈니스 지표를 관리합니다.</p>
          </div>

          <div className="elite-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="elite-stat-card glass-card">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
                <div className="stat-glow"></div>
              </div>
            ))}
          </div>

          <div className="elite-table-section glass-card">
            <div className="table-header-elite">
              <h3>여행설계사 데이터베이스</h3>
              <div className="table-actions">
                <input type="text" placeholder="Search..." className="table-search" />
              </div>
            </div>
            
            <table className="elite-dashboard-table">
              <thead>
                <tr>
                  <th>여행설계사</th>
                  <th>지역</th>
                  <th>기록</th>
                  <th>평점</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {designers.map(d => (
                  <tr key={d.id}>
                    <td>
                      <div className="designer-cell">
                        <div className="mini-avatar"></div>
                        <span>{d.name}</span>
                      </div>
                    </td>
                    <td>{d.region}</td>
                    <td>{d.totalProposals} Proposals</td>
                    <td className="rating-cell">★ {d.rating}</td>
                    <td>
                      <span className={`elite-status-pill ${d.status.toLowerCase()}`}>
                        {d.status}
                      </span>
                    </td>
                    <td>
                      <div className="elite-table-btns">
                        {d.status === 'Pending' ? (
                          <button className="btn-table-action primary" onClick={() => approveDesigner(d.id)}>APPROVE</button>
                        ) : (
                          <button className="btn-table-action" onClick={() => toggleStatus(d.id)}>
                            {d.status === 'Active' ? 'SUSPEND' : 'ACTIVATE'}
                          </button>
                        )}
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
