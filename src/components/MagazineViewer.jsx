import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MagazineViewer = () => {
  const [magazine, setMagazine] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMagazine = () => {
      const storedMagazines = JSON.parse(localStorage.getItem('exportedMagazines')) || [];
      const foundMagazine = storedMagazines.find(mag => mag.id === id);
      setMagazine(foundMagazine);
    };

    fetchMagazine();
  }, [id]);

  if (!magazine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="magazine-viewer">
      <Link to="/gallery">Back to Gallery</Link>
      <h1>{magazine.title}</h1>
      <iframe
        srcDoc={magazine.content}
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title={magazine.title}
      />
    </div>
  );
};

export default MagazineViewer;