import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import EditorPage from './components/EditorPage';
import MagazineCarousel from './components/MagazineCarousel';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<EditorPage />} />
            <Route path="/gallery" element={<MagazineCarousel />} />
            <Route path="/gallery/:userId" element={<MagazineCarousel />} />
            <Route path="/gallery/:userId/:magazineId" element={<MagazineCarousel />} />
          </Routes>
        </div>
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