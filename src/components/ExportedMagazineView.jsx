import React, { useState } from 'react';

const ExportedMagazineView = ({ templates }) => {
  const [showFullMagazine, setShowFullMagazine] = useState(false);

  const coverTemplate = templates[0]; // Assuming the first template is always the cover

  const CoverCard = () => (
    <div 
      className="cover-card"
      onClick={() => setShowFullMagazine(true)}
      style={{
        width: '375px',
        height: '812px',
        margin: '20px auto',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: coverTemplate.content }} />
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        Click to view full magazine
      </div>
    </div>
  );

  const FullMagazine = () => (
    <div className="full-magazine">
      <button 
        onClick={() => setShowFullMagazine(false)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        Close
      </button>
      {templates.map((template, index) => (
        <div 
          key={index}
          className="magazine-page"
          style={{
            width: '375px',
            margin: '20px auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: template.content }} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="exported-magazine-view">
      {showFullMagazine ? <FullMagazine /> : <CoverCard />}
    </div>
  );
};

export default ExportedMagazineView;