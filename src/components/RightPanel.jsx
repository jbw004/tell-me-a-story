import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const googleFonts = [
  'Arial', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Source Sans Pro', 
  'Raleway', 'Merriweather', 'PT Sans', 'Nunito', 'Playfair Display', 'Poppins', 
  'Roboto Condensed', 'Ubuntu', 'Noto Sans', 'Roboto Slab', 'Quicksand', 
  'Titillium Web', 'Rubik', 'Work Sans', 'Fira Sans', 'Nunito Sans', 'Barlow', 
  'Inconsolata', 'Libre Franklin', 'Crimson Text', 'Mulish', 'Karla', 'Inter'
];

function RightPanel({ selectedText, selectedBackground, onTextStyleChange, onBackgroundStyleChange }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shadowOffset, setShadowOffset] = useState(2);
  const [shadowColor, setShadowColor] = useState('#000000');

  const handleShadowChange = (offset, color) => {
    const shadowStyle = `${offset}px ${offset}px ${offset}px ${color}`;
    onTextStyleChange({ textShadow: shadowStyle });
  };

  return (
    <div className="floating-panel right-panel">
      {selectedText && (
        <>
          <h2 className="panel-header">Text Properties</h2>
          <div className="property-group">
            <h3 className="section-header">Font</h3>
            <label>
              Family
              <select 
                onChange={(e) => onTextStyleChange({ fontFamily: e.target.value })}
                value={selectedText.fontFamily || 'Arial'}
              >
                {googleFonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
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
            <h3 className="section-header">Stroke</h3>
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
            <h3 className="section-header">Drop Shadow</h3>
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
            <h3 className="section-header">Background</h3>
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
          <h2 className="panel-header">Background Properties</h2>
          <div className="property-group">
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
          </div>
        </>
      )}
    </div>
  );
}

export default RightPanel;