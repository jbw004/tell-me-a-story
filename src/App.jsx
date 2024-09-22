import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './components/EditorPage';
import MagazineGallery from './components/MagazineGallery';
import MagazineViewer from './components/MagazineViewer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="/gallery" element={<MagazineGallery />} />
          <Route path="/magazine/:id" element={<MagazineViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

// This function will open the gallery in a new window
export const openGalleryInNewWindow = (zines) => {
  const galleryWindow = window.open('/gallery', '_blank');
  if (galleryWindow) {
    galleryWindow.onload = () => {
      galleryWindow.postMessage({ type: 'ZINES_DATA', zines }, '*');
    };
  }
};

export default App;