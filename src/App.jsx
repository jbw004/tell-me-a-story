import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { pdfjs } from 'react-pdf';  // Add this import
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import EditorPage from './components/EditorPage';
import StandaloneMagazine from './components/StandaloneMagazine';
import CustomTemplateEditor from './components/CustomTemplateEditor';
import MagazineDashboard from './components/MagazineDashboard';
import CustomTemplateViewer from './components/CustomTemplateViewer';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const AppRoutes = () => {
  const location = useLocation();
  const isViewerRoute = location.pathname.startsWith('/magazine/') || 
                       (location.pathname.startsWith('/custom-template/') && location.pathname.split('/').length > 3);

  return (
    <div className="App">
      {!isViewerRoute && <Header />}
      <Routes>
        <Route path="/" element={<CustomTemplateEditor />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/magazine/:userId/:magazineId" element={<StandaloneMagazine />} />
        <Route path="/dashboard" element={<MagazineDashboard />} />
        <Route path="/custom-template/:userId/:templateId" element={<CustomTemplateViewer />} />
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