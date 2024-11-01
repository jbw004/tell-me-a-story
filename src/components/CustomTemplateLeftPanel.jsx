import React from 'react';

const CustomTemplateLeftPanel = () => {
  const onDragStart = (e, type) => {
    e.dataTransfer.setData('elementType', type);
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
    </div>
  );
};

export default CustomTemplateLeftPanel;