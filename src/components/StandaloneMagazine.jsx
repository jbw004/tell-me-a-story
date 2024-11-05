import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { Oval } from 'react-loader-spinner';
import ExportedMagazineView from './ExportedMagazineView';
import { useAuth } from '../AuthContext';

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
      {isOwner && (
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Dashboard
      </button>
    )}
      <div style={{ position: 'relative', width: '375px', height: '812px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ExportedMagazineView
          templates={magazine.templates}
          showFull={true}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
};

export default StandaloneMagazine;