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
            <Route path="/gallery/:id" element={<MagazineCarousel />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// This function will open the gallery in a new window
export const openGalleryInNewWindow = (zines) => {
  const galleryWindow = window.open('/gallery', '_blank');
  if (galleryWindow) {
    galleryWindow.onload = () => {
      galleryWindow.postMessage({ type: 'ZINES_DATA', zines }, '*');
    };
  }
};