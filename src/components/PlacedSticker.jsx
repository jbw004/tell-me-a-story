import React from 'react';

const PlacedSticker = ({ id, type, x, y, isOwned, onMove }) => {
  const handleDragEnd = (e) => {
    // Check if this sticker was purchased and placed in this session
    const sessionStickers = JSON.parse(sessionStorage.getItem('purchasedStickers') || '[]');
    const stickerExists = sessionStickers.some(sticker => 
      sticker.stickerId === type && isOwned
    );

    // Only allow movement if the sticker was purchased in this session
    if (stickerExists) {
      onMove?.(e);
    }
  };

  return (
    <div
      className={`absolute transition-transform ${
        isOwned ? 'cursor-move hover:scale-110' : 'cursor-default'
      }`}
      style={{ 
        left: x, 
        top: y,
        // Add subtle visual feedback for movable stickers
        filter: isOwned ? 'brightness(1.1)' : 'brightness(1)'
      }}
      draggable={isOwned}
      onDragEnd={handleDragEnd}
    >
      <img 
        src={`/images/${type}_sticker.png`}
        alt={`${type} sticker`}
        className="w-12 h-12 object-contain"
        draggable={false} // Prevent image dragging
      />
    </div>
  );
};

export default PlacedSticker;