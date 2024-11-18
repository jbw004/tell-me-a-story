import React, { useState } from 'react';

const StickerStore = ({ onStickerSelect, isEnabled = true }) => {
  const [selectedSticker, setSelectedSticker] = useState(null);

  const handleStickerClick = (stickerId) => {
    if (!isEnabled) return;
    setSelectedSticker(stickerId);
    onStickerSelect?.(stickerId);
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700">Support with Stickers</h3>
      </div>
      
      <div className="p-3 flex gap-2">
        <button
          onClick={() => handleStickerClick('heart')}
          className={`w-12 h-12 rounded-lg transition-all ${
            selectedSticker === 'heart' ? 'bg-pink-50 scale-110' : 'hover:bg-gray-50'
          }`}
        >
          <img 
            src="/images/heart_sticker.png" 
            alt="Heart Sticker" 
            className="w-full h-full object-contain"
          />
        </button>
        
        <button
          onClick={() => handleStickerClick('music')}
          className={`w-12 h-12 rounded-lg transition-all ${
            selectedSticker === 'music' ? 'bg-blue-50 scale-110' : 'hover:bg-gray-50'
          }`}
        >
          <img 
            src="/images/music_sticker.png" 
            alt="Music Sticker" 
            className="w-full h-full object-contain"
          />
        </button>
        
        <button
          onClick={() => handleStickerClick('sad')}
          className={`w-12 h-12 rounded-lg transition-all ${
            selectedSticker === 'sad' ? 'bg-yellow-50 scale-110' : 'hover:bg-gray-50'
          }`}
        >
          <img 
            src="/images/sad_sticker.png" 
            alt="Sad Sticker" 
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {!isEnabled && (
        <div className="p-3 bg-gray-50 text-sm text-gray-600">
          Sticker support is not enabled for this magazine
        </div>
      )}
    </div>
  );
};

export default StickerStore;