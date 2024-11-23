import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { Oval } from 'react-loader-spinner';
import { useAuth } from '../AuthContext';
import { 
  loadPublishedCustomTemplate,
  loadTemplateStickers,
  isStickerSupportEnabled
} from '../firebase';
import StickerStore from './StickerStore';
import PlacedSticker from './PlacedSticker';
import { useStickers } from './StickerContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import CursorSticker from './CursorSticker';


const ViewerContent = () => {
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState(null);
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
  const [purchasedStickerInfo, setPurchasedStickerInfo] = useState(null);
  const [isStickerEnabled, setIsStickerEnabled] = useState(false);
  const [instructionPosition, setInstructionPosition] = useState({ x: 0, y: 0 });



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

        // Start with low-res version if available
        setCurrentPdfUrl(templateData.pdfLowResUrl || templateData.pdfUrl);

        // Preload high-res version if low-res is being shown
        if (templateData.pdfLowResUrl && templateData.pdfUrl) {
          const preloadHighRes = new Image();
          preloadHighRes.onload = () => {
            setCurrentPdfUrl(templateData.pdfUrl);
            setIsHighResLoaded(true);
          };
          preloadHighRes.src = templateData.pdfUrl;
        }
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

// Add this new useEffect right here, after the existing ones
useEffect(() => {
  if (selectedSticker && purchasedStickerInfo) {
    const stickerStore = document.querySelector('.sticker-store');
    if (stickerStore) {
      const rect = stickerStore.getBoundingClientRect();
      setInstructionPosition({
        x: rect.left,
        y: rect.top - 60 // Position above the sticker store
      });
    }
  }
}, [selectedSticker, purchasedStickerInfo]);


const handlePageClick = async (e, pageNumber) => {
  if (!selectedSticker || !isStickerEnabled || !purchasedStickerInfo) return;

  const pageElement = e.currentTarget;
  const rect = pageElement.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  try {
    const functions = getFunctions();
    const placePurchasedSticker = httpsCallable(functions, 'placePurchasedSticker');
    
    const result = await placePurchasedSticker({
      magazineId: templateId,
      creatorId: userId,
      stickerType: selectedSticker,
      x,
      y,
      pageNumber,
      paymentIntentId: purchasedStickerInfo.paymentIntentId
    });

    if (result.data.success) {
      // Add to local state
      const newSticker = {
        id: Date.now().toString(),
        type: selectedSticker,
        pageNumber,
        x,
        y,
        placedBy: 'session',
        timestamp: new Date().toISOString()
      };

      setPlacedStickers(prev => [...prev, newSticker]);
      setSessionStickers(prev => [...prev, newSticker.id]);
      setSelectedSticker(null);
      setPurchasedStickerInfo(null);
    }
  } catch (err) {
    console.error("Error placing sticker:", err);
    // You might want to show an error message to the user
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

      {selectedSticker && purchasedStickerInfo && (
          <CursorSticker stickerType={selectedSticker} />
        )}

        {selectedSticker && purchasedStickerInfo && (
          <div 
            className="fixed bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg z-50"
            style={{
              left: `${instructionPosition.x}px`,
              top: `${instructionPosition.y}px`,
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap'
            }}
          >
            Click anywhere on the page to place your sticker
          </div>
        )}

      <div className="viewer-main-content" style={{
        overscrollBehavior: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        <div className="pdf-viewer">
        <Document
            file={currentPdfUrl}  // Changed from template.pdfUrl to use currentPdfUrl
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

      {isStickerEnabled && (  // Removed !isOwner condition
        <StickerStore
          onStickerSelect={({ stickerId, paymentIntentId }) => {
            setPurchasedStickerInfo({ stickerId, paymentIntentId });
            setSelectedSticker(stickerId);
          }}
          isEnabled={isStickerEnabled}
          creatorId={userId}
          magazineId={templateId}
          requiresPayment={!isOwner}  // Keep this as is to maintain free stickers for owner
        />
      )}
    </div>
  );
};

export default ViewerContent;