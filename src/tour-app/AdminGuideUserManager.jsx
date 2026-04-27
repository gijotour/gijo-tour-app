import React, { useMemo, useState } from 'react';

const guideSeed = [
  {
    id: 1,
    name: '마크 보라카이',
    region: '필리핀 · 보라카이',
    role: 'VIP 현지 가이드',
    phone: '+63-900-000-0001',
    status: 'Active',
    rating: 5.0,
    memo: '가족/부부 프라이빗 일정 강점'
  },
  {
    id: 2,
    name: '제이 세부',
    region: '필리핀 · 세부',
    role: '공항 픽업/액티비티 파트너',
    phone: '+63-900-000-0002',
    status: 'Pending',
    rating: 4.8,
    memo: '테스트 운영 필요'
  }
];

const userSeed = [
  {
    id: 101,
    name: '김고객',
    type: 'Customer',
    contact: '010-0000-0001',
    request: '부모님 효도여행 / 3명 / 7월 초',
    status: 'Lead'
  },
  {
    id: 102,
    name: 'GIJO 운영자',
    type: 'Admin',
    contact: 'admin@gijo-tour.local',
    request: '운영 관리자',
    status: 'Active'
  }
];

const emptyGuide = {
  name: '',
  region: '',
  role: '',
  phone: '',
  memo: ''
};

const emptyUser = {
  name: '',
  type: 'Customer',
  contact: '',
  request: ''
};

const statusCycle = ['Active', 'Pending', 'Suspended'];

const AdminGuideUserManager = () => {
  const [tab, setTab] = useState('guides');
  const [guides, setGuides] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_admin_guides');
      return saved ? JSON.parse(saved) : guideSeed;
    } catch {
      return guideSeed;
    }
  });
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('gijo_admin_users');
      return saved ? JSON.parse(saved) : userSeed;
    } catch {
      return userSeed;
    }
  });
  const [guideForm, setGuideForm] = useState(emptyGuide);
  const [userForm, setUserForm] = useState(emptyUser);
  const [search, setSearch] = useState('');

  const persistGuides = (next) => {
    setGuides(next);
    localStorage.setItem('gijo_admin_guides', JSON.stringify(next));
  };

  const persistUsers = (next) => {
    setUsers(next);
    localStorage.setItem('gijo_admin_users', JSON.stringify(next));
  };

  const guideStats = useMemo(() => ({
    total: guides.length,
    active: guides.filter(g => g.status === 'Active').length,
    pending: guides.filter(g => g.status === 'Pending').length,
    suspended: guides.filter(g => g.status === 'Suspended').length
  }), [guides]);

  const userStats = useMemo(() => ({
    total: users.length,
    customers: users.filter(u => u.type === 'Customer').length,
    admins: users.filter(u => u.type === 'Admin').length,
    leads: users.filter(u => u.status === 'Lead').length
  }), [users]);

  const filteredGuides = guides.filter(g => (
    `${g.name} ${g.region} ${g.role} ${g.phone} ${g.memo}`.toLowerCase().includes(search.toLowerCase())
  ));

  const filteredUsers = users.filter(u => (
    `${u.name} ${u.type} ${u.contact} ${u.request}`.toLowerCase().includes(search.toLowerCase())
  ));

  const addGuide = (e) => {
    e.preventDefault();
    if (!guideForm.name.trim() || !guideForm.region.trim()) {
      alert('가이드 이름과 지역은 필수입니다.');
      return;
    }
    const next = [{
      id: Date.now(),
      ...guideForm,
      status: 'Pending',
      rating: 5.0
    }, ...guides];
    persistGuides(next);
    setGuideForm(emptyGuide);
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.contact.trim()) {
      alert('유저 이름과 연락처는 필수입니다.');
      return;
    }
    const next = [{
      id: Date.now(),
      ...userForm,
      status: userForm.type === 'Admin' ? 'Active' : 'Lead'
    }, ...users];
    persistUsers(next);
    setUserForm(emptyUser);
  };

  const cycleGuideStatus = (id) => {
    const next = guides.map(g => {
      if (g.id !== id) return g;
      const currentIndex = statusCycle.indexOf(g.status);
      return { ...g, status: statusCycle[(currentIndex + 1) % statusCycle.length] };
    });
    persistGuides(next);
  };

  const cycleUserStatus = (id) => {
    const flow = ['Lead', 'Consulting', 'Booked', 'Active', 'Suspended'];
    const next = users.map(u => {
      if (u.id !== id) return u;
      const currentIndex = flow.indexOf(u.status);
      return { ...u, status: flow[(currentIndex + 1) % flow.length] };
    });
    persistUsers(next);
  };

  const deleteGuide = (id) => {
    if (!window.confirm('이 가이드를 삭제할까요?')) return;
    persistGuides(guides.filter(g => g.id !== id));
  };

  const deleteUser = (id) => {
    if (!window.confirm('이 유저를 삭제할까요?')) return;
    persistUsers(users.filter(u => u.id !== id));
  };

  return (
    <main className="admin-manager">
      <section className="admin-hero">
        <div>
          <p className="admin-badge">GIJO Admin Console</p>
          <h1>가이드 · 유저 관리</h1>
          <p>선별 파트너 가이드와 상담 고객/관리자 계정을 한 곳에서 관리합니다.</p>
        </div>
        <a className="admin-home" href="/gijotour">랜딩으로 돌아가기</a>
      </section>

      <section className="admin-tabs">
        <button className={tab === 'guides' ? 'active' : ''} onClick={() => setTab('guides')}>가이드 관리</button>
        <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>유저 관리</button>
      </section>

      <section className="admin-stats">
        {tab === 'guides' ? (
          <>
            <div><span>전체 가이드</span><strong>{guideStats.total}</strong></div>
            <div><span>활성</span><strong>{guideStats.active}</strong></div>
            <div><span>승인대기</span><strong>{guideStats.pending}</strong></div>
            <div><span>중지</span><strong>{guideStats.suspended}</strong></div>
          </>
        ) : (
          <>
            <div><span>전체 유저</span><strong>{userStats.total}</strong></div>
            <div><span>고객</span><strong>{userStats.customers}</strong></div>
            <div><span>관리자</span><strong>{userStats.admins}</strong></div>
            <div><span>리드</span><strong>{userStats.leads}</strong></div>
          </>
        )}
      </section>

      <section className="admin-search-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="이름, 지역, 연락처, 요청 내용 검색" />
      </section>

      {tab === 'guides' ? (
        <section className="admin-content-grid">
          <form className="admin-form" onSubmit={addGuide}>
            <h2>가이드 추가</h2>
            <input placeholder="가이드 이름" value={guideForm.name} onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })} />
            <input placeholder="지역 예: 필리핀 · 보라카이" value={guideForm.region} onChange={(e) => setGuideForm({ ...guideForm, region: e.target.value })} />
            <input placeholder="역할 예: VIP 현지 가이드" value={guideForm.role} onChange={(e) => setGuideForm({ ...guideForm, role: e.target.value })} />
            <input placeholder="연락처" value={guideForm.phone} onChange={(e) => setGuideForm({ ...guideForm, phone: e.target.value })} />
            <textarea placeholder="메모 / 강점 / 주의사항" value={guideForm.memo} onChange={(e) => setGuideForm({ ...guideForm, memo: e.target.value })} />
            <button type="submit">가이드 등록</button>
          </form>

          <div className="admin-table-card">
            <h2>가이드 목록</h2>
            <div className="admin-table-wrap">
              <table>
                <thead><tr><th>이름</th><th>지역</th><th>역할</th><th>상태</th><th>평점</th><th>관리</th></tr></thead>
                <tbody>
                  {filteredGuides.map(g => (
                    <tr key={g.id}>
                      <td><strong>{g.name}</strong><small>{g.phone}</small></td>
                      <td>{g.region}</td>
                      <td>{g.role}<small>{g.memo}</small></td>
                      <td><span className={`status ${g.status.toLowerCase()}`}>{g.status}</span></td>
                      <td>★ {g.rating}</td>
                      <td className="actions"><button onClick={() => cycleGuideStatus(g.id)}>상태변경</button><button className="danger" onClick={() => deleteGuide(g.id)}>삭제</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <section className="admin-content-grid">
          <form className="admin-form" onSubmit={addUser}>
            <h2>유저 추가</h2>
            <input placeholder="이름" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
            <select value={userForm.type} onChange={(e) => setUserForm({ ...userForm, type: e.target.value })}>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
              <option value="Partner">Partner</option>
            </select>
            <input placeholder="연락처 / 이메일" value={userForm.contact} onChange={(e) => setUserForm({ ...userForm, contact: e.target.value })} />
            <textarea placeholder="상담 요청 / 권한 메모" value={userForm.request} onChange={(e) => setUserForm({ ...userForm, request: e.target.value })} />
            <button type="submit">유저 등록</button>
          </form>

          <div className="admin-table-card">
            <h2>유저 목록</h2>
            <div className="admin-table-wrap">
              <table>
                <thead><tr><th>이름</th><th>유형</th><th>연락처</th><th>요청/메모</th><th>상태</th><th>관리</th></tr></thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.name}</strong></td>
                      <td>{u.type}</td>
                      <td>{u.contact}</td>
                      <td>{u.request}</td>
                      <td><span className={`status ${u.status.toLowerCase()}`}>{u.status}</span></td>
                      <td className="actions"><button onClick={() => cycleUserStatus(u.id)}>상태변경</button><button className="danger" onClick={() => deleteUser(u.id)}>삭제</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .admin-manager{min-height:100vh;background:#070707;color:#fff;padding:110px 28px 70px;font-family:Outfit,Pretendard,system-ui,sans-serif}.admin-hero,.admin-tabs,.admin-stats,.admin-search-row,.admin-content-grid{width:min(1280px,100%);margin:0 auto}.admin-hero{display:flex;justify-content:space-between;gap:24px;align-items:flex-end;margin-bottom:28px}.admin-badge{display:inline-block;color:#d6b36a;border:1px solid rgba(214,179,106,.45);padding:8px 14px;border-radius:999px;font-weight:900;font-size:13px;text-transform:uppercase}.admin-hero h1{font-size:clamp(38px,5vw,64px);margin:16px 0 10px;letter-spacing:-.05em}.admin-hero p{color:#cfcfcf;font-size:18px}.admin-home{color:#111;background:#d6b36a;text-decoration:none;font-weight:900;border-radius:999px;padding:14px 20px;white-space:nowrap}.admin-tabs{display:flex;gap:10px;margin-bottom:18px}.admin-tabs button{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#fff;border-radius:999px;padding:13px 20px;font-weight:900}.admin-tabs button.active{background:#d6b36a;color:#111}.admin-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.admin-stats div,.admin-form,.admin-table-card{background:rgba(255,255,255,.065);border:1px solid rgba(255,255,255,.12);border-radius:24px;box-shadow:0 18px 55px rgba(0,0,0,.24)}.admin-stats div{padding:22px}.admin-stats span{display:block;color:#aaa;font-weight:800}.admin-stats strong{font-size:34px;color:#d6b36a}.admin-search-row{margin-bottom:20px}.admin-search-row input,.admin-form input,.admin-form textarea,.admin-form select{width:100%;padding:15px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#fff;font:inherit}.admin-form select option{background:#111}.admin-content-grid{display:grid;grid-template-columns:360px 1fr;gap:18px}.admin-form{padding:24px;display:grid;gap:12px;align-self:start}.admin-form h2,.admin-table-card h2{font-size:24px;margin:0 0 10px}.admin-form textarea{min-height:110px;resize:vertical}.admin-form button,.actions button{background:#d6b36a;color:#111;border:0;border-radius:999px;padding:13px 16px;font-weight:900;cursor:pointer}.admin-table-card{padding:24px;overflow:hidden}.admin-table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:760px}th,td{text-align:left;border-bottom:1px solid rgba(255,255,255,.08);padding:15px 12px;vertical-align:middle}th{color:#d6b36a;font-size:13px;text-transform:uppercase;letter-spacing:.06em}td small{display:block;color:#999;margin-top:5px}.status{display:inline-flex;padding:7px 10px;border-radius:999px;font-size:12px;font-weight:900;border:1px solid rgba(255,255,255,.14)}.status.active,.status.booked{background:rgba(56,189,248,.14);color:#7dd3fc}.status.pending,.status.lead,.status.consulting{background:rgba(214,179,106,.14);color:#d6b36a}.status.suspended{background:rgba(248,113,113,.13);color:#fca5a5}.actions{display:flex;gap:8px}.actions .danger{background:rgba(248,113,113,.15);color:#fca5a5;border:1px solid rgba(248,113,113,.28)}@media(max-width:960px){.admin-hero{flex-direction:column;align-items:flex-start}.admin-stats,.admin-content-grid{grid-template-columns:1fr}.admin-manager{padding-top:90px}}
      `}</style>
    </main>
  );
};

export default AdminGuideUserManager;
