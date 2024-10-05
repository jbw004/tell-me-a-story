import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExportedMagazineView from './ExportedMagazineView';

const MagazineCarousel = () => {
  const [magazines, setMagazines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFullMagazine, setShowFullMagazine] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const storedMagazines = JSON.parse(localStorage.getItem('exportedMagazines')) || [];
    console.log("Stored magazines:", storedMagazines);
    setMagazines(storedMagazines);
  
    if (id) {
      const index = storedMagazines.findIndex(mag => mag.id === id);
      console.log("Selected magazine index:", index);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [id]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: selectedIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    navigate(`/gallery/${magazines[index].id}`);
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth);
      if (index !== selectedIndex) {
        handleSelect(index);
      }
    }
  };

  const toggleFullMagazine = () => {
    setShowFullMagazine(!showFullMagazine);
  };

  if (magazines.length === 0) {
    return <div>No magazines found.</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <div 
        ref={carouselRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          width: '100%',
          height: '100%'
        }}
      >
        {magazines.map((magazine, index) => {
          console.log(`Rendering magazine ${index}:`, magazine);
          return (
            <div key={magazine.id} style={{ flexShrink: 0, width: '100%', scrollSnapAlign: 'start' }}>
              <ExportedMagazineView
                templates={magazine.templates || [{ content: magazine.content }]} // Fallback for old data structure
                onViewFull={() => {
                  console.log(`Viewing full magazine ${index}`);
                  setSelectedIndex(index);
                  toggleFullMagazine();
                }}
                showFull={false}
              />
            </div>
          );
        })}
      </div>
      {showFullMagazine && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#FAF9F6', zIndex: 1000, overflow: 'auto' }}>
          <ExportedMagazineView
            templates={magazines[selectedIndex]?.templates || [{ content: magazines[selectedIndex]?.content }]} // Fallback for old data structure
            onViewFull={toggleFullMagazine}
            showFull={true}
          />
        </div>
      )}
    </div>
  );
};

export default MagazineCarousel;