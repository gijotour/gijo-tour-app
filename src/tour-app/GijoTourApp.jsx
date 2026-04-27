// UPDATED VERSION WITH PREMIUM LANDING
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import PremiumLanding from './PremiumLanding';

function GijoTourApp() {
  return (
    <div className="gijo-tour-main-layout">
      <Routes>
        <Route index element={<PremiumLanding />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </div>
  );
}

export default GijoTourApp;
