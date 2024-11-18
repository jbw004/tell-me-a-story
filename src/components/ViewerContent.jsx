import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { Oval } from 'react-loader-spinner';
import { useAuth } from '../AuthContext';
import { 
    loadPublishedCustomTemplate,
    loadTemplateStickers,
    saveSticker,
    updateStickerPosition,
    isStickerSupportEnabled
  } from '../firebase';
import StickerStore from './StickerStore';
import PlacedSticker from './PlacedSticker';
import { useStickers } from './StickerContext';

const ViewerContent = () => {
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate();
  const { userId, templateId } = useParams();
  const { user } = useAuth();
  const { 
    selectedSticker, 
    setSelectedSticker,
    sessionStickers,
    setSessionStickers,
    placedStickers,
    setPlacedStickers
  } = useStickers();
  const [isStickerEnabled, setIsStickerEnabled] = useState(false);


  const isOwner = user && user.uid === userId;

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!userId || !templateId) {
        setError("Invalid URL");
        setIsLoading(false);
        return;
      }

      try {
        const templateData = await loadPublishedCustomTemplate(userId, templateId);
        
        if (!templateData) {
          setError("Template not found");
          setIsLoading(false);
          return;
        }

        setTemplate({
          ...templateData,
          elements: templateData.elements || []
        });
      } catch (err) {
        console.error("Error fetching template:", err);
        setError("Failed to load template");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [userId, templateId]);

  useEffect(() => {
    const loadExistingStickers = async () => {
        if (!userId || !templateId) return;

        try {
            // Check if sticker support is enabled
            const isEnabled = await isStickerSupportEnabled(userId, templateId);
            setIsStickerEnabled(isEnabled);

            if (!isEnabled) return;

            // Load existing stickers
            const existingStickers = await loadTemplateStickers(userId, templateId);
            setPlacedStickers(existingStickers);
        } catch (err) {
            console.error("Error loading stickers:", err);
        }
    };

    loadExistingStickers();
}, [userId, templateId]);


const handlePageClick = async (e, pageNumber) => {
    if (!selectedSticker || !isStickerEnabled) return;

    const pageElement = e.currentTarget;
    const rect = pageElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSticker = {
        id: Date.now().toString(),
        type: selectedSticker,
        pageNumber,
        x,
        y,
        placedBy: 'session',
        timestamp: new Date().toISOString()
    };

    try {
        // Save to Firebase first
        await saveSticker(userId, templateId, newSticker);
        
        // Then update local state
        setPlacedStickers(prev => [...prev, newSticker]);
        setSessionStickers(prev => [...prev, newSticker.id]);
        setSelectedSticker(null);
    } catch (err) {
        console.error("Error saving sticker:", err);
    }
};


const handleStickerMove = async (stickerId, e, pageNumber) => {
    if (!sessionStickers.includes(stickerId)) return;

    const pageElement = e.currentTarget.closest('.pdf-page-container');
    if (!pageElement) return;

    const rect = pageElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
        // Update position in Firebase
        await updateStickerPosition(userId, templateId, stickerId, { x, y, pageNumber });
        
        // Update local state
        setPlacedStickers(prev => prev.map(sticker => 
            sticker.id === stickerId 
                ? { ...sticker, x, y, pageNumber }
                : sticker
        ));
    } catch (err) {
        console.error("Error updating sticker position:", err);
    }
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

  if (!template) return null;

  return (
    <div className="exported-magazine-view" style={{ 
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      backgroundColor: '#faf9f6'
    }}>
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
      <div className="viewer-main-content" style={{
        overscrollBehavior: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        <div className="pdf-viewer">
          <Document
            file={template.pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <Oval height={40} width={40} color="#4fa94d" />
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div 
                key={`page_${index + 1}`} 
                className="pdf-page-container"
                style={{
                  position: 'relative',
                  margin: '20px 0',
                }}
                onClick={(e) => handlePageClick(e, index + 1)}
              >
                <Page
                  pageNumber={index + 1}
                  width={700}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
                {/* Interactive elements */}
                {template.elements
                  ?.filter(elem => elem.pageNumber === index + 1)
                  .map(elem => (
                    <a
                      key={elem.id}
                      href={elem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: 'absolute',
                        left: elem.x,
                        top: elem.y,
                        cursor: 'pointer'
                      }}
                    >
                      <img 
                        src={`/images/${elem.type}_logo.png`}
                        alt={elem.type}
                        style={{
                          width: '32px',
                          height: '32px'
                        }}
                      />
                    </a>
                  ))}
                
                {/* Placed stickers */}
                {placedStickers
                  .filter(sticker => sticker.pageNumber === index + 1)
                  .map(sticker => (
                    <PlacedSticker
                      key={sticker.id}
                      {...sticker}
                      isOwned={sessionStickers.includes(sticker.id)}
                      onMove={(e) => handleStickerMove(sticker.id, e, index + 1)}
                    />
                  ))}
              </div>
            ))}
          </Document>
        </div>
      </div>

      {isStickerEnabled && !isOwner && (
        <StickerStore
            onStickerSelect={setSelectedSticker}
            isEnabled={true}
        />
        )}
    </div>
  );
};

export default ViewerContent;