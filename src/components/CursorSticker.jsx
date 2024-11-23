import React, { useState, useEffect } from 'react';

const CursorSticker = ({ stickerType, onPlace }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      <img 
        src={`/images/${stickerType}_sticker.png`}
        alt={`${stickerType} sticker preview`}
        className="w-12 h-12 object-contain opacity-70"
        draggable={false}
      />
    </div>
  );
};

export default CursorSticker;