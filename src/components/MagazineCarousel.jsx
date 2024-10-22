import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { Oval } from 'react-loader-spinner';
import ExportedMagazineView from './ExportedMagazineView';
import { useAuth } from '../AuthContext';
import { deleteMagazine, moveMagazineToDraft } from '../firebase';
import { ChevronLeft, ChevronRight } from 'lucide-react';  // Assuming you're using lucide-react for icons
import ConfirmationModal from './ConfirmationModal';


const MagazineCarousel = () => {
  const [magazines, setMagazines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullMagazine, setShowFullMagazine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Start with loading true
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userId, magazineId } = useParams();
  const { user } = useAuth();
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [magazineToEdit, setMagazineToEdit] = useState(null);

  const isOwner = user && user.uid === userId;

  const handleEdit = (magazine) => {
    setMagazineToEdit(magazine);
    setShowEditConfirmation(true);
  };

  const confirmEdit = async () => {
    if (magazineToEdit) {
      try {
        await moveMagazineToDraft(userId, magazineToEdit.id);
        navigate('/', { state: { fromEdit: true, editedMagazineId: magazineToEdit.id } });
      } catch (error) {
        console.error("Error moving magazine to draft:", error);
        // Handle error (show error message to user)
      }
    }
    setShowEditConfirmation(false);
  };


  useEffect(() => {
    const fetchMagazines = async () => {
      if (!userId) {
        setError("No userId provided in URL");
        setIsLoading(false);
        setHasAttemptedLoad(true);
        return;
      }
    
      try {
        const db = getDatabase();
        const storage = getStorage();
      
        const magazinesRef = dbRef(db, `users/${userId}/magazines`);
        const snapshot = await get(magazinesRef);
        
        if (snapshot.exists()) {
          const magazinesData = snapshot.val();
          const magazinesArray = await Promise.all(Object.entries(magazinesData).map(async ([key, magazine]) => {
            const templatesRef = dbRef(db, `users/${userId}/magazines/${key}/templates`);
            const templatesSnapshot = await get(templatesRef);
            const templates = templatesSnapshot.val() || [];
            
            const processedTemplates = await Promise.all(Object.values(templates).map(async (template) => {
              if (template.contentUrl) {
                let retries = 3;
                while (retries > 0) {
                  try {
                    const content = await getDownloadURL(storageRef(storage, template.contentUrl));
                    return {
                  ...template,
                  content: content
                };
              } catch (error) {
                retries--;
                if (retries === 0) {
                  console.error("Failed to load image after 3 attempts:", error);
                  return template;
                }
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
              }
            }
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
            setCurrentIndex(index !== -1 ? index : 0);
          }
        } else {
          setMagazines([]);
        }
      } catch (err) {
        setError("Failed to fetch magazines. Please try again later.");
        console.error("Error fetching magazines:", err);
      } finally {
        setIsLoading(false);
        setHasAttemptedLoad(true);
      }
    };

    fetchMagazines();
  }, [userId, magazineId]);


  useEffect(() => {
    if (magazineId) {
      const index = magazines.findIndex(mag => mag.id === magazineId);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [magazines, magazineId]);

  const handleDelete = async (magazineId) => {
    if (!isOwner) {
      console.error("User doesn't have permission to delete this magazine");
      return;
    }

    if (window.confirm('Are you sure you want to delete this magazine?')) {
      await deleteMagazine(userId, magazineId);
      const updatedMagazines = magazines.filter(mag => mag.id !== magazineId);
      setMagazines(updatedMagazines);
      if (updatedMagazines.length > 0) {
        setCurrentIndex(0);
        navigate(`/gallery/${userId}/${updatedMagazines[0].id}`);
      } else {
        navigate(`/gallery/${userId}`);
      }
    }
  };

  const navigateCarousel = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = magazines.length - 1;
    if (newIndex >= magazines.length) newIndex = 0;
    setCurrentIndex(newIndex);
    navigate(`/gallery/${userId}/${magazines[newIndex].id}`);
  };

  const toggleFullMagazine = () => {
    setShowFullMagazine(!showFullMagazine);
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <div style={{ 
          color: '#666', 
          fontSize: '16px',
          textAlign: 'center'
        }}>
          Loading gallery contents...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px',
        color: '#666'
      }}>
        {error}
      </div>
    );
  }

  // No magazines state (only show after loading is complete)
  if (hasAttemptedLoad && magazines.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px',
        color: '#666'
      }}>
        No magazines found.
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', width: '375px', height: '812px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ExportedMagazineView
          templates={magazines[currentIndex].templates || [{ content: magazines[currentIndex].content }]}
          onViewFull={toggleFullMagazine}
          showFull={false}
          onDelete={isOwner ? () => handleDelete(magazines[currentIndex].id) : null}
          onEdit={isOwner ? () => handleEdit(magazines[currentIndex]) : null}
          isOwner={isOwner} // Pass isOwner as a prop
        />
        {magazines.length > 1 && (
          <>
            <button
              onClick={() => navigateCarousel(-1)}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.7)',
                border: 'none',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => navigateCarousel(1)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.7)',
                border: 'none',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      {showFullMagazine && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#FAF9F6', zIndex: 1000, overflow: 'auto' }}>
          <ExportedMagazineView
            templates={magazines[currentIndex].templates || [{ content: magazines[currentIndex].content }]}
            onViewFull={toggleFullMagazine}
            showFull={true}
            onDelete={isOwner ? () => handleDelete(magazines[currentIndex].id) : null}
            onEdit={isOwner ? () => handleEdit(magazines[currentIndex]) : null}
            isOwner={isOwner} // Pass isOwner as a prop
          />
          <ConfirmationModal
        isOpen={showEditConfirmation}
        onClose={() => setShowEditConfirmation(false)}
        onConfirm={confirmEdit}
        message="Editing this magazine will move it to 'draft', overriding any existing draft that you may have saved and not yet published. Would you like to proceed?"
      />
    </div>
      )}
    </div>
  );
};

export default MagazineCarousel;