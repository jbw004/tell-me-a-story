import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MagazineCarousel = () => {
  const [magazines, setMagazines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const storedMagazines = JSON.parse(localStorage.getItem('exportedMagazines')) || [];
    setMagazines(storedMagazines);

    if (id) {
      const index = storedMagazines.findIndex(mag => mag.id === id);
      if (index !== -1) {
        setSelectedIndex(index);
        setExpanded(true);
      }
    }
  }, [id]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: selectedIndex * 320, // Adjust based on your card width + margin
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    navigate(`/gallery/${magazines[index].id}`);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      navigate(`/gallery/${magazines[selectedIndex].id}`);
    } else {
      navigate('/gallery');
    }
  };

  if (magazines.length === 0) {
    return <div>No magazines found.</div>;
  }

  return (
    <div className="magazine-carousel">
      <div className="magazine-scroll-container" ref={carouselRef}>
        {magazines.map((magazine, index) => (
          <div
            key={magazine.id}
            className={`magazine-cover-card ${index === selectedIndex ? 'selected' : ''}`}
            onClick={() => handleSelect(index)}
          >
            <h3>{magazine.title}</h3>
            <p>Created: {new Date(magazine.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="magazine-view">
        {expanded ? (
          <iframe
            srcDoc={magazines[selectedIndex].content}
            style={{ width: '100%', height: '80vh', border: 'none' }}
            title={magazines[selectedIndex].title}
          />
        ) : (
          <div className="cover-preview">
            <h2>{magazines[selectedIndex].title}</h2>
            <p>Created: {new Date(magazines[selectedIndex].createdAt).toLocaleString()}</p>
          </div>
        )}
        <button onClick={toggleExpand}>{expanded ? 'Collapse' : 'Expand'}</button>
      </div>
    </div>
  );
};

export default MagazineCarousel;