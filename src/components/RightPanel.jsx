import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

function RightPanel({ selectedText, selectedBackground, onTextStyleChange, onBackgroundStyleChange }) {
  const { user, login, logout } = useAuth();
  const [shadowOffset, setShadowOffset] = useState(2);
  const [shadowColor, setShadowColor] = useState('#000000');

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      login();
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
        <button onClick={handleAuthAction} className="auth-button">
          {user ? 'Logout' : 'Login'}
        </button>
        <button onClick={handleViewGallery} className="view-gallery-button">
          View Gallery
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
    </div>
  );
}

export default RightPanel;