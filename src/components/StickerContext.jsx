import React, { createContext, useContext, useState } from 'react';

const StickerContext = createContext();

export const StickerProvider = ({ children }) => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [sessionStickers, setSessionStickers] = useState([]);
  const [placedStickers, setPlacedStickers] = useState([]);

  const value = {
    selectedSticker,
    setSelectedSticker,
    sessionStickers,
    setSessionStickers,
    placedStickers,
    setPlacedStickers,
  };

  return (
    <StickerContext.Provider value={value}>
      {children}
    </StickerContext.Provider>
  );
};

export const useStickers = () => {
  const context = useContext(StickerContext);
  if (!context) {
    throw new Error('useStickers must be used within a StickerProvider');
  }
  return context;
};