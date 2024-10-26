import React, { useState, useRef, useEffect } from 'react';

const TemplatePreviewTooltip = ({ children, templateName, magazineStyle }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // Helper function to generate the correct image path for Vite
  const getImagePath = (style, template) => {
    // For Vite, we need to reference the public directory with a leading forward slash
    return `/images/${style.toLowerCase()}_${template.toLowerCase().replace(' ', '_')}.png`;
  };

  const updateTooltipPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + window.scrollY + (rect.height / 2),
        left: rect.right + window.scrollX + 8,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateTooltipPosition);
    window.addEventListener('resize', updateTooltipPosition);
    
    return () => {
      window.removeEventListener('scroll', updateTooltipPosition);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, []);

  const handleMouseEnter = () => {
    updateTooltipPosition();
    setShowTooltip(true);
  };

  // Add image preloading
  useEffect(() => {
    if (magazineStyle && templateName) {
      const img = new Image();
      img.src = getImagePath(magazineStyle, templateName);
    }
  }, [magazineStyle, templateName]);

  return (
    <div 
      ref={buttonRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      
      {showTooltip && magazineStyle && (
        <div
          className="fixed z-50"
          style={{
            position: 'fixed',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translate(0, -50%)',
            width: '124px',
            height: '265px',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <img
            src={getImagePath(magazineStyle, templateName)}
            alt={`${magazineStyle} ${templateName} preview`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              console.error(`Failed to load preview image: ${e.target.src}`);
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TemplatePreviewTooltip;