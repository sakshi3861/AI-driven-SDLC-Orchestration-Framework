import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthPage from './pages/HealthPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HealthPage />} />
      </Routes>
    </Router>
  );
}
