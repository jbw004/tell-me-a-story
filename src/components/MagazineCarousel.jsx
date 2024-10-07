import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import ExportedMagazineView from './ExportedMagazineView';
import { useAuth } from '../AuthContext';


const MagazineCarousel = () => {
  const [magazines, setMagazines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFullMagazine, setShowFullMagazine] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const { userId, magazineId } = useParams();
  const { user } = useAuth();


  useEffect(() => {
    const fetchMagazines = async () => {
      if (!userId) {
        console.error("No userId provided in URL");
        setMagazines([]);
        return;
      }
    
      const db = getDatabase();
      const storage = getStorage();
    
      const magazinesRef = dbRef(db, `users/${userId}/magazines`);
      const snapshot = await get(magazinesRef);
      
      if (snapshot.exists()) {
        const magazinesData = snapshot.val();
        const magazinesArray = await Promise.all(Object.entries(magazinesData).map(async ([key, magazine]) => {
          // Fetch templates
          const templatesRef = dbRef(db, `users/${userId}/magazines/${key}/templates`);
          const templatesSnapshot = await get(templatesRef);
          const templates = templatesSnapshot.val() || [];
          
          // Fetch content from Cloud Storage
          const processedTemplates = await Promise.all(Object.values(templates).map(async (template) => {
            if (template.contentUrl) {
              const content = await getDownloadURL(storageRef(storage, template.contentUrl));
              return {
                ...template,
                content: content
              };
            }
            return template;
          }));
    
          return {
            id: key,
            ...magazine,
            templates: processedTemplates
          };
        }));
        
        setMagazines(magazinesArray);
    
        if (magazineId) {
          const index = magazinesArray.findIndex(mag => mag.id === magazineId);
          setSelectedIndex(index !== -1 ? index : 0);
        }
      } else {
        setMagazines([]);
      }
    };

    fetchMagazines();
  }, [userId, magazineId]);


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
    navigate(`/gallery/${userId}/${magazines[index].id}`);
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