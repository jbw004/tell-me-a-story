import React, { useState, useRef, useEffect } from 'react';

const TemplatePreviewTooltip = ({ children, templateName, magazineStyle }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const updateTooltipPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + window.scrollY + (rect.height / 2), // Center vertically with button
        left: rect.right + window.scrollX + 8, // Small gap from button
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
            width: '124px',  // Adjusted width to match screenshot
            height: '265px', // Adjusted height to match screenshot
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <img
            src={`/${magazineStyle.toLowerCase()}_${templateName.toLowerCase().replace(' ', '_')}.png`}
            alt={`${magazineStyle} ${templateName} preview`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              console.error(`Failed to load preview image for ${magazineStyle}_${templateName}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TemplatePreviewTooltip;