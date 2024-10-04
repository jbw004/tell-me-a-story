import React from 'react';

const ExportedMagazineView = ({ templates, onViewFull, showFull }) => {
  console.log("ExportedMagazineView render. showFull:", showFull);
  console.log("Received templates:", templates);

  if (!templates || templates.length === 0) {
    console.error("No templates provided to ExportedMagazineView");
    return <div>No magazine content available.</div>;
  }
  
  const coverTemplate = templates[0];
  console.log("Cover template:", coverTemplate);
  
  const CoverCard = () => (
    <div 
      className="cover-card"
      onClick={onViewFull}
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
      <div 
        dangerouslySetInnerHTML={{ __html: coverTemplate.content }} 
        style={{ width: '100%', height: '100%' }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
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
    <div className="full-magazine" style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
      <button 
        onClick={onViewFull}
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
          <div 
            dangerouslySetInnerHTML={{ __html: template.content }}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="exported-magazine-view" style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {showFull ? <FullMagazine /> : <CoverCard />}
    </div>
  );
};

export default ExportedMagazineView;