import React, { useState } from 'react';
import { 
  publishCustomTemplate, 
  deleteCustomTemplateDraft, 
  loadCustomTemplateDraft  // Add this import
} from '../firebase';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import MagazineMetadataModal from './MagazineMetadataModal';  // Add this import


const CustomTemplateLeftPanel = ({ 
  onSaveDraft, 
  isLoading 
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);  // Add this state

  const onDragStart = (e, type) => {
    e.dataTransfer.setData('elementType', type);
  };

  const handlePublishClick = () => {
    if (!user) return;
    setShowMetadataModal(true);
  };

  const handleMetadataSave = async (metadata) => {
    if (!user) return;
  
    setPublishing(true);
    try {
      // First save the current state
      await onSaveDraft();
      
      // Get the latest draft data
      const draftData = await loadCustomTemplateDraft(user.uid);
      console.log('Loaded draft data:', draftData);
  
      if (!draftData) {
        throw new Error('No draft data found');
      }
  
      if (!draftData.pdfUrl) {
        throw new Error('No PDF file found in draft');
      }
  
      // Then publish the draft with metadata
      const publishedTemplate = await publishCustomTemplate(user.uid, {
        ...draftData,
        name: metadata.title,
        previewImage: metadata.previewImage,
        elements: draftData.elements || []
      });
      
      // Open the viewer in a new tab
      const viewerUrl = `/custom-template/${user.uid}/${publishedTemplate.id}`;
      window.open(viewerUrl, '_blank');
      
      // Navigate the current tab to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error publishing template:', error);
      let errorMessage = 'Failed to publish template';
      if (error.message === 'No draft data found') {
        errorMessage = 'Please save your template as a draft first';
      } else if (error.message === 'No PDF file found in draft') {
        errorMessage = 'Please upload a PDF file before publishing';
      }
      alert(errorMessage);
    } finally {
      setPublishing(false);
      setShowMetadataModal(false);
    }
  };

  const handleDiscardDraft = async () => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to discard this draft? This action cannot be undone.')) {
      try {
        await deleteCustomTemplateDraft(user.uid);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error discarding draft:', error);
        // You might want to show an error notification here
      }
    }
  };

  return (
    <div className="LeftPanel">
      <h2 className="panel-header">Interactive Elements</h2>
      <div className="panel-section">
        <div className="templates-list">
          <div 
            className="draggable-item"
            draggable
            onDragStart={(e) => onDragStart(e, 'instagram')}
          >
            <img 
              src="/images/instagram_logo.png" 
              alt="Instagram" 
              className="element-icon"
            />
            <span>Instagram Link</span>
          </div>
          
          <div 
            className="draggable-item"
            draggable
            onDragStart={(e) => onDragStart(e, 'spotify')}
          >
            <img 
              src="/images/spotify_logo.png" 
              alt="Spotify" 
              className="element-icon"
            />
            <span>Spotify Link</span>
          </div>
          
          <div 
            className="draggable-item"
            draggable
            onDragStart={(e) => onDragStart(e, 'donation')}
          >
            <img 
              src="/images/donation_logo.png" 
              alt="Donation" 
              className="element-icon"
            />
            <span>Donation Link</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      {user && (
        <div className="panel-section">
          <div className="action-buttons">
            {/* Publish Button */}
            <button
              onClick={handlePublishClick}  // Change from handlePublish to handlePublishClick
              disabled={publishing || isLoading}
              className="action-button publish-button"
            >
              {publishing ? (
                <Oval
                  height={20}
                  width={20}
                  color="#ffffff"
                  visible={true}
                  ariaLabel='publishing'
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                'Publish'
              )}
            </button>

            {/* Save Draft Button */}
            <button 
              onClick={onSaveDraft}
              disabled={isLoading}
              className="action-button save-draft-button"
            >
              {isLoading ? 'Saving...' : 'Save Draft'}
            </button>

            {/* Discard Draft Button */}
            <button 
              onClick={handleDiscardDraft}
              disabled={isLoading || publishing}
              className="action-button discard-draft-button"
            >
              Discard Draft
            </button>
          </div>
        </div>
      )}
      <MagazineMetadataModal
        isOpen={showMetadataModal}
        onClose={() => setShowMetadataModal(false)}
        onSave={handleMetadataSave}
        initialTitle="My Template"
        showPreviewImageOption={true}
      />
    </div>
  );
};

export default CustomTemplateLeftPanel;