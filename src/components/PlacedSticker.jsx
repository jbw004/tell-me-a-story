import React from 'react';

const PlacedSticker = ({ type, x, y, isOwned, onMove }) => {
  return (
    <div
      className={`absolute cursor-${isOwned ? 'move' : 'default'} transition-transform hover:scale-110`}
      style={{ left: x, top: y }}
      draggable={isOwned}
      onDragEnd={onMove}
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