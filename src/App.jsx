import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import EditorPage from './components/EditorPage';
import StandaloneMagazine from './components/StandaloneMagazine';
import CustomTemplateEditor from './components/CustomTemplateEditor';
import MagazineDashboard from './components/MagazineDashboard';
import './App.css';

const AppRoutes = () => {
  const location = useLocation();
  const isMagazineView = location.pathname.startsWith('/magazine/');

  return (
    <div className="App">
      {!isMagazineView && <Header />}
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/magazine/:userId/:magazineId" element={<StandaloneMagazine />} />
        <Route path="/custom-template" element={<CustomTemplateEditor />} />
        <Route path="/dashboard" element={<MagazineDashboard />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

// This function will open the magazine in a new window
export const openMagazineInNewWindow = (userId, magazineId) => {
  const magazineUrl = `/magazine/${userId}/${magazineId}`;
  window.open(magazineUrl, '_blank');
};