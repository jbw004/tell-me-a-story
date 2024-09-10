import React from 'react';
import { fabric } from 'fabric';

function Toolbar({ canvas }) {
  const addRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 100,
        height: 100
      });
      canvas.add(rect);
      canvas.renderAll();
    }
  };

  return (
    <div>
      <button onClick={addRectangle}>Add Rectangle</button>
      {/* Add more editing tools here */}
    </div>
  );
}

export default Toolbar;