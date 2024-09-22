import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MagazineGallery = () => {
  const [magazines, setMagazines] = useState([]);
  const [newMagazineId, setNewMagazineId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Load magazines from local storage
    const storedMagazines = JSON.parse(localStorage.getItem('exportedMagazines')) || [];
    setMagazines(storedMagazines);

    // Check for newMagazineId in the URL
    const params = new URLSearchParams(location.search);
    const newId = params.get('newMagazineId');
    if (newId) {
      setNewMagazineId(newId);
    }
  }, [location]);

  return (
    <div className="magazine-gallery">
      <h1>Magazine Gallery</h1>
      {newMagazineId && (
        <div className="new-magazine-notification">
          New magazine added successfully!
        </div>
      )}
      <div className="magazine-list">
        {magazines.map(magazine => (
          <div key={magazine.id} className="magazine-item">
            <h2>{magazine.title}</h2>
            <p>Created: {new Date(magazine.createdAt).toLocaleString()}</p>
            <button onClick={() => window.open(`/magazine/${magazine.id}`, '_blank')}>
              View Magazine
            </button>
            {magazine.id === newMagazineId && (
              <span className="new-label">New</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagazineGallery;