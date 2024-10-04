import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExportedMagazineView from './ExportedMagazineView';

const MagazineViewer = () => {
  const [magazine, setMagazine] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedMagazines = JSON.parse(localStorage.getItem('exportedMagazines')) || [];
    const selectedMagazine = storedMagazines.find(mag => mag.id === id);
    console.log("Selected magazine content:", selectedMagazine?.content);
    setMagazine(selectedMagazine);
  }, [id]);

  if (!magazine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="magazine-viewer">
      <button onClick={() => navigate('/gallery')} className="back-button">
        Back to Gallery
      </button>
      <ExportedMagazineView templates={[{ content: magazine.content }]} />
    </div>
  );
};

export default MagazineViewer;