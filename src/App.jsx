import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import GijoLab from './labs/GijoLab';
import GijoTourApp from './tour-app/GijoTourApp';
import SizeControl from './shared/SizeControl';
import NavigateHub from './shared/NavigateHub';

function App() {
  const [uiScale, setUiScale] = useState(1.0);
  
  // Auth State with Persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('gijo_auth') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('gijo_role') || 'designer';
  });

  useEffect(() => {
    localStorage.setItem('gijo_auth', isLoggedIn);
    localStorage.setItem('gijo_role', userRole);
  }, [isLoggedIn, userRole]);
  
  const location = useLocation();

  const isLabView = location.pathname === '/';
  
  return (
    <div 
      className="app-main page-fade-in"
      style={{ '--ui-scale': uiScale }}
    >
      <div className="bg-mesh-container">
        <div className="mesh-circle mesh-1"></div>
        <div className="mesh-circle mesh-2"></div>
        <div className="mesh-circle mesh-3"></div>
      </div>

      {!isLoggedIn && (
        <Navbar 
          isLoggedIn={isLoggedIn}
          onLogin={() => {}} // Navbar internally handles navigation to login
        />
      )}

      <main style={{ paddingTop: (!isLoggedIn && !isLabView) ? '80px' : '0' }}>
        <Routes>
          <Route path="/" element={<GijoLab />} />
          <Route 
            path="/gijotour/*" 
            element={
              <GijoTourApp 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userRole={userRole}
                setUserRole={setUserRole}
              />
            } 
          />
        </Routes>
      </main>

      {!isLoggedIn && <Footer />}
      
      <NavigateHub />
      <SizeControl uiScale={uiScale} onScaleChange={setUiScale} />
    </div>
  );
}

export default App;
