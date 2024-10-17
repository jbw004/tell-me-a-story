import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Editor from './Editor';
import ExportComponent from './ExportComponent';
import { magazineTemplates } from '../templates.js';
import { v4 as uuidv4 } from 'uuid';
import useMobileDetect from '../useMobileDetect';
import MobileWarningModal from './MobileWarningModal';
import { useAuth } from '../AuthContext';
import { saveDraft, loadDraft, deleteDraft } from '../firebase';
import ConfirmationModal from './ConfirmationModal';
import SaveNotification from './SaveNotification';


function EditorPage() {
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const templateRefs = useRef({});
  const [selectedText, setSelectedText] = useState(null);
  const [textStyles, setTextStyles] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [backgroundStyles, setBackgroundStyles] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMagazineId, setEditedMagazineId] = useState(null);
  const location = useLocation();



  // ... (keep all the handler functions from the original App component)

  const isMobile = useMobileDetect();
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowMobileWarning(true);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleUserLogin = async () => {
      setIsLoading(true);
      if (user) {
        try {
          // First, try to load existing draft
          const draftData = await loadDraft(user.uid);
          if (draftData) {
            // Existing draft found, load it
            setSelectedTemplates(draftData.templates || []);
            setUploadedImages(draftData.uploadedImages || {});
            setTextStyles(draftData.textStyles || {});
            setBackgroundStyles(draftData.backgroundStyles || {});
          } else {
            // No existing draft, check if there's unsaved work
            if (selectedTemplates.length > 0) {
              // Save current state as new draft
              const currentState = {
                templates: selectedTemplates,
                uploadedImages,
                textStyles,
                backgroundStyles
              };
              await saveDraft(user.uid, currentState);
              console.log('New draft saved for user');
            } else {
              // No existing draft and no unsaved work, initialize empty state
              setSelectedTemplates([]);
              setUploadedImages({});
              setTextStyles({});
              setBackgroundStyles({});
            }
          }
        } catch (error) {
          console.error("Error handling user login:", error);
          // Initialize with empty data if there's an error
          setSelectedTemplates([]);
          setUploadedImages({});
          setTextStyles({});
          setBackgroundStyles({});
        }
      } else {
        // User is not logged in, reset to empty state
        setSelectedTemplates([]);
        setUploadedImages({});
        setTextStyles({});
        setBackgroundStyles({});
      }
      setIsLoading(false);
    };
  
    handleUserLogin();
  }, [user]);

  const [initialLoginHandled, setInitialLoginHandled] = useState(false);
  
  const handleSaveDraft = async () => {
    if (user && !isSaving) {
      setIsSaving(true);
      try {
        const draftData = {
        templates: selectedTemplates.map(template => ({
          ...template,
          content: templateRefs.current[template.uniqueId]?.innerHTML || template.content
        })),
        uploadedImages,
        textStyles,
        backgroundStyles,
      };
      await saveDraft(user.uid, draftData);
        setShowSaveNotification(true);
        
        // Hide the notification after 2 seconds
        setTimeout(() => setShowSaveNotification(false), 2000);
      } catch (error) {
        console.error("Error saving draft:", error);
        // Optionally show an error notification here
      } finally {
        // Re-enable the button after a short delay
        setTimeout(() => setIsSaving(false), 1000);
      }
    }
  };

  const handleDiscardDraft = async () => {
    if (user) {
      await deleteDraft(user.uid);
      setSelectedTemplates([]);
      setUploadedImages({});
      setTextStyles({});
      setBackgroundStyles({});
      setShowDiscardConfirmation(false);
    }
  };

  const handleExportStart = useCallback(() => {
    setIsExporting(true);
  }, []);

  const handleExportEnd = useCallback(() => {
    setIsExporting(false);
    // Redirect to the gallery after export
    navigate('/gallery');
  }, [navigate]);

  const handleMagazineSelect = (magazineId) => {
    const selected = magazineTemplates.find(mag => mag.id === magazineId);
    setSelectedMagazine(selected);
  };

  const handleTemplateSelect = (template, isExisting = false) => {
    if (isExisting) {
      scrollToTemplate(template.uniqueId);
    } else {
      const newTemplateId = uuidv4();
      const newTemplate = { ...template, uniqueId: newTemplateId };
      setSelectedTemplates(prev => [...prev, newTemplate]);
      // Scroll to the newly added template after a short delay to ensure it's rendered
      setTimeout(() => scrollToTemplate(newTemplateId), 100);
    }
  };

  const handleImageUpload = useCallback((templateUniqueId, imageId, file) => {
    console.log('Image uploaded:', templateUniqueId, imageId, file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImages(prev => ({
        ...prev,
        [templateUniqueId]: {
          ...prev[templateUniqueId],
          [imageId]: e.target.result
        }
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleReorderTemplates = useCallback((reorderedTemplates) => {
    setSelectedTemplates(reorderedTemplates);
  }, []);

  const handleDeleteTemplate = useCallback((templateId) => {
    setSelectedTemplates(prev => prev.filter(template => template.uniqueId !== templateId));
    setUploadedImages(prev => {
      const newUploadedImages = { ...prev };
      delete newUploadedImages[templateId];
      return newUploadedImages;
    });
  }, []);

  const handleTextSelect = useCallback((templateId, textId, text) => {
    setSelectedText({ templateId, textId, text });
    setSelectedBackground(null);
  }, []);

  const handleBackgroundSelect = useCallback((templateId, backgroundId) => {
    setSelectedBackground({ templateId, backgroundId });
    setSelectedText(null);
  }, []);

  const handleTextStyleChange = useCallback((style) => {
    if (selectedText) {
      setTextStyles(prev => ({
        ...prev,
        [selectedText.templateId]: {
          ...prev[selectedText.templateId],
          [selectedText.textId]: {
            ...prev[selectedText.templateId]?.[selectedText.textId],
            ...style
          }
        }
      }));
    }
  }, [selectedText]);

  const handleBackgroundStyleChange = useCallback((style) => {
    if (selectedBackground) {
      setBackgroundStyles(prev => ({
        ...prev,
        [selectedBackground.templateId]: {
          ...prev[selectedBackground.templateId],
          [selectedBackground.backgroundId]: {
            ...prev[selectedBackground.templateId]?.[selectedBackground.backgroundId],
            ...style
          }
        }
      }));
    }
  }, [selectedBackground]);

  const handleObjectDelete = useCallback((templateId, objectId) => {
    console.log('Handling object delete:', templateId, objectId);
    setSelectedTemplates(prevTemplates => 
      prevTemplates.map(template => {
        if (template.uniqueId === templateId) {
          console.log('Found template:', templateId);
          const parser = new DOMParser();
          const doc = parser.parseFromString(template.content, 'text/html');
          
          // Log all data-object-id attributes in the template
          const allObjects = doc.querySelectorAll('[data-object-id]');
          console.log('All object IDs in template:', Array.from(allObjects).map(el => el.getAttribute('data-object-id')));
          
          const elementToDelete = doc.querySelector(`[data-object-id="${objectId}"]`);
          if (elementToDelete) {
            console.log('Found element to delete:', objectId);
            elementToDelete.remove();
            // Clear the styles for the deleted object
            if (elementToDelete.hasAttribute('data-text-id')) {
              setTextStyles(prev => {
                const newStyles = {...prev};
                if (newStyles[templateId]) {
                  delete newStyles[templateId][objectId];
                }
                return newStyles;
              });
            } else if (elementToDelete.hasAttribute('data-background-id')) {
              setBackgroundStyles(prev => {
                const newStyles = {...prev};
                if (newStyles[templateId]) {
                  delete newStyles[templateId][objectId];
                }
                return newStyles;
              });
            }
            return {
              ...template,
              content: doc.body.innerHTML
            };
          } else {
            console.log('Element not found:', objectId);
            console.log('Template content:', template.content);
          }
        }
        return template;
      })
    );
  }, []);

  const handleAddTocItem = useCallback((templateId) => {
    setSelectedTemplates(prevTemplates => 
      prevTemplates.map(template => {
        if (template.uniqueId === templateId && template.id === 'contents-mobile') {
          const parser = new DOMParser();
          const doc = parser.parseFromString(template.content, 'text/html');
          const tocContainer = doc.getElementById('tocContainer');
          
          if (tocContainer) {
            const newItem = doc.createElement('div');
            newItem.className = 'toc-item';
            newItem.innerHTML = `
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-new-title" data-object-id="contents-item-new-title" data-deletable="true">New Item</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-new-page" data-object-id="contents-item-new-page" data-deletable="true">00</span>
            `;
            tocContainer.appendChild(newItem);

            return {
              ...template,
              content: doc.body.innerHTML
            };
          }
        }
        return template;
      })
    );
  }, []);

  const handleRemoveTocItem = useCallback((templateId) => {
    setSelectedTemplates(prevTemplates => 
      prevTemplates.map(template => {
        if (template.uniqueId === templateId && template.id === 'contents-mobile') {
          const parser = new DOMParser();
          const doc = parser.parseFromString(template.content, 'text/html');
          const tocContainer = doc.getElementById('tocContainer');
          
          if (tocContainer && tocContainer.lastElementChild) {
            tocContainer.removeChild(tocContainer.lastElementChild);

            return {
              ...template,
              content: doc.body.innerHTML
            };
          }
        }
        return template;
      })
    );
  }, []);

  const scrollToTemplate = (templateId) => {
    const ref = templateRefs.current[templateId];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const registerTemplateRef = useCallback((id, ref) => {
    templateRefs.current[id] = ref;
  }, []);

  return (
    <>
      <MobileWarningModal 
        open={showMobileWarning} 
        onClose={() => setShowMobileWarning(false)} 
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="main-content" style={{ paddingTop: '29px' }}>
          <Editor 
            templates={selectedTemplates}
            onImageUpload={handleImageUpload}
            uploadedImages={uploadedImages}
            onReorderTemplates={handleReorderTemplates}
            onDeleteTemplate={handleDeleteTemplate}
            registerTemplateRef={registerTemplateRef}
            onTextSelect={handleTextSelect}
            onBackgroundSelect={handleBackgroundSelect}
            textStyles={textStyles}
            backgroundStyles={backgroundStyles}
            onObjectDelete={handleObjectDelete}
            isExporting={isExporting}
            onAddTocItem={handleAddTocItem}
            onRemoveTocItem={handleRemoveTocItem}
          />
          <div className="editor-panels">
            <LeftPanel 
              magazines={magazineTemplates} 
              onMagazineSelect={handleMagazineSelect}
              selectedMagazine={selectedMagazine}
              onTemplateSelect={handleTemplateSelect}
              selectedTemplates={selectedTemplates}
              templates={selectedTemplates}
              templateRefs={templateRefs}
              onExportStart={handleExportStart}
              onExportEnd={handleExportEnd}
              onSaveDraft={handleSaveDraft}
              onDiscardDraft={() => setShowDiscardConfirmation(true)}
              user={user}
              showSaveNotification={showSaveNotification}
              isSaving={isSaving}
            />
            <RightPanel 
              selectedText={selectedText}
              selectedBackground={selectedBackground}
              onTextStyleChange={handleTextStyleChange}
              onBackgroundStyleChange={handleBackgroundStyleChange}
            />
          </div>
        </div>
      )}
      <ConfirmationModal
      isOpen={showDiscardConfirmation}
      onClose={() => setShowDiscardConfirmation(false)}
      onConfirm={handleDiscardDraft}
      message="Are you sure you want to discard your draft? This action cannot be undone."
    />
    </>
  );
}

export default EditorPage;