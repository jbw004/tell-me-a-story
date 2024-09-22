import React from 'react';
import { useLocation } from 'react-router-dom';

const Gallery = () => {
  const location = useLocation();
  const zines = location.state?.zines || [];

  return (
    <div className="gallery">
      <h1>Zine Gallery</h1>
      <div className="zine-grid">
        {zines.map((zine, index) => (
          <div key={index} className="zine-item">
            <h2>Zine {index + 1}</h2>
            <div dangerouslySetInnerHTML={{ __html: zine }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;