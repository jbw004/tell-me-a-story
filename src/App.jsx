import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import EditorPage from './components/EditorPage';
import MagazineCarousel from './components/MagazineCarousel';
import CustomTemplateEditor from './components/CustomTemplateEditor'; // Add this import
import MagazineDashboard from './components/MagazineDashboard'; // Add this import
import './App.css';

// This component will contain the routes and conditionally render the Header
const AppRoutes = () => {
  const location = useLocation();
  const isGalleryPage = location.pathname.startsWith('/gallery');

  return (
    <div className="App">
      {!isGalleryPage && <Header />}
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/gallery" element={<MagazineCarousel />} />
        <Route path="/gallery/:userId" element={<MagazineCarousel />} />
        <Route path="/gallery/:userId/:magazineId" element={<MagazineCarousel />} />
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

// This function will open the gallery in a new window
export const openGalleryInNewWindow = (userId, magazineId) => {
  const galleryUrl = userId ? `/gallery/${userId}${magazineId ? `/${magazineId}` : ''}` : '/gallery';
  window.open(galleryUrl, '_blank');
};