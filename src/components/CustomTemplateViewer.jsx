import React from 'react';
import { StickerProvider } from './StickerContext';
import ViewerContent from './ViewerContent';

const CustomTemplateViewer = () => {
  return (
    <StickerProvider>
      <ViewerContent />
    </StickerProvider>
  );
};

export default CustomTemplateViewer;