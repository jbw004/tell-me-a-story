import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import ConfirmationModal from './ConfirmationModal';

function RightPanel({ selectedText, selectedBackground, onTextStyleChange, onBackgroundStyleChange }) {
  const { user, login, logout } = useAuth();
  const [shadowOffset, setShadowOffset] = useState(2);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      setShowLogoutModal(true);
    } else {
      login();
    }
  };

  const confirmLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
      window.location.href = 'https://tellmeastory.press';
    } catch (error) {
      console.error('Logout failed', error);
      // Handle logout error (show an error message to the user)
    }
  };

  const handleViewGallery = () => {
    if (user) {
      const galleryUrl = `/gallery/${user.uid}`;
      window.open(galleryUrl, '_blank');
    }
  };

  const handleShadowChange = (offset, color) => {
    const shadowStyle = `${offset}px ${offset}px ${offset}px ${color}`;
    onTextStyleChange({ textShadow: shadowStyle });
  };

  return (
    <div className="floating-panel right-panel">
      <div className="auth-buttons">
      {user && (
          <button onClick={handleViewGallery} className="view-gallery-button">
            View Gallery
          </button>
        )}
        <button onClick={handleAuthAction} className="auth-button">
          {user ? 'Logout' : 'Login'}
        </button>
      </div>
      
      {selectedText && (
        <>
          <h2>Text Properties</h2>
          <div className="property-group">
            <h3>Font</h3>
            <label>
              Family
              <select onChange={(e) => onTextStyleChange({ fontFamily: e.target.value })}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier">Courier</option>
              </select>
            </label>
            <label>
              Size
              <input 
                type="number" 
                defaultValue={24} 
                onChange={(e) => onTextStyleChange({ fontSize: `${e.target.value}px` })}
              />
            </label>
            <label>
              Color
              <input 
                type="color" 
                defaultValue="#000000" 
                onChange={(e) => onTextStyleChange({ color: e.target.value })}
              />
            </label>
          </div>
          <div className="property-group">
            <h3>Stroke</h3>
            <label>
              Color
              <input 
                type="color" 
                defaultValue="#000000" 
                onChange={(e) => onTextStyleChange({ WebkitTextStrokeColor: e.target.value })}
              />
            </label>
            <label>
              Width
              <input 
                type="number" 
                defaultValue={0} 
                onChange={(e) => onTextStyleChange({ WebkitTextStrokeWidth: `${e.target.value}px` })}
              />
            </label>
          </div>
          <div className="property-group">
            <h3>Drop Shadow</h3>
            <label>
              Offset
              <input 
                type="number" 
                value={shadowOffset}
                onChange={(e) => {
                  const newOffset = e.target.value;
                  setShadowOffset(newOffset);
                  handleShadowChange(newOffset, shadowColor);
                }}
              />
            </label>
            <label>
              Color
              <input 
                type="color" 
                value={shadowColor}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setShadowColor(newColor);
                  handleShadowChange(shadowOffset, newColor);
                }}
              />
            </label>
          </div>
          <div className="property-group">
            <h3>Background</h3>
            <label>
              Color
              <input 
                type="color" 
                defaultValue="#ffffff" 
                onChange={(e) => onTextStyleChange({ backgroundColor: e.target.value })}
              />
            </label>
          </div>
        </>
      )}
      
      {selectedBackground && (
        <>
          <h2>Background Properties</h2>
          <label>
            Color
            <input 
              type="color" 
              defaultValue="#ffffff" 
              onChange={(e) => onBackgroundStyleChange({ backgroundColor: e.target.value })}
            />
          </label>
          <label>
            Opacity
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              defaultValue="1"
              onChange={(e) => onBackgroundStyleChange({ opacity: e.target.value })}
            />
          </label>
        </>
      )}

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to log out? Any unsaved progress will be lost."
      />
    </div>
  );
}

export default RightPanel;