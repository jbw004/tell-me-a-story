import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { Oval } from 'react-loader-spinner';
import ExportedMagazineView from './ExportedMagazineView';
import { useAuth } from '../AuthContext';
import { deleteMagazine, moveMagazineToDraft } from '../firebase';
import ConfirmationModal from './ConfirmationModal';

const StandaloneMagazine = () => {
  const [magazine, setMagazine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const navigate = useNavigate();
  const { userId, magazineId } = useParams();
  const { user } = useAuth();

  const isOwner = user && user.uid === userId;

  useEffect(() => {
    const fetchMagazine = async () => {
      if (!userId || !magazineId) {
        setError("Invalid URL");
        setIsLoading(false);
        return;
      }

      try {
        const db = getDatabase();
        const storage = getStorage();
        
        // Fetch magazine data
        const magazineRef = dbRef(db, `users/${userId}/magazines/${magazineId}`);
        const snapshot = await get(magazineRef);
        
        if (!snapshot.exists()) {
          setError("Magazine not found");
          setIsLoading(false);
          return;
        }

        const magazineData = snapshot.val();
        
        // Fetch and process templates
        const templatesRef = dbRef(db, `users/${userId}/magazines/${magazineId}/templates`);
        const templatesSnapshot = await get(templatesRef);
        const templates = templatesSnapshot.val() || [];
        
        const processedTemplates = await Promise.all(Object.values(templates).map(async (template) => {
          if (template.contentUrl) {
            try {
              const content = await getDownloadURL(storageRef(storage, template.contentUrl));
              return {
                ...template,
                content: content
              };
            } catch (error) {
              console.error("Error fetching template content:", error);
              return template;
            }
          }
          return template;
        }));

        setMagazine({
          id: magazineId,
          ...magazineData,
          templates: processedTemplates
        });
      } catch (err) {
        setError("Failed to load magazine. Please try again later.");
        console.error("Error fetching magazine:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMagazine();
  }, [userId, magazineId]);

  const handleDelete = async () => {
    if (!isOwner) return;

    if (window.confirm('Are you sure you want to delete this magazine?')) {
      try {
        await deleteMagazine(userId, magazineId);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error deleting magazine:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  const handleEdit = () => {
    setShowEditConfirmation(true);
  };

  const confirmEdit = async () => {
    try {
      await moveMagazineToDraft(userId, magazineId);
      navigate('/', { state: { fromEdit: true, editedMagazineId: magazineId } });
    } catch (error) {
      console.error("Error moving magazine to draft:", error);
      // Handle error (show error message to user)
    }
    setShowEditConfirmation(false);
  };

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
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-xl text-gray-700 mb-4">{error}</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-500 hover:text-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (!magazine) return null;

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', width: '375px', height: '812px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ExportedMagazineView
          templates={magazine.templates}
          showFull={true}
          onDelete={isOwner ? handleDelete : null}
          onEdit={isOwner ? handleEdit : null}
          isOwner={isOwner}
        />
        
        <ConfirmationModal
          isOpen={showEditConfirmation}
          onClose={() => setShowEditConfirmation(false)}
          onConfirm={confirmEdit}
          message="Editing this magazine will move it to 'draft', overriding any existing draft that you may have saved and not yet published. Would you like to proceed?"
        />
      </div>
    </div>
  );
};

export default StandaloneMagazine;