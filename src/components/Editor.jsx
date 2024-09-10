import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Toolbar from './Toolbar';
import Canvas from './Canvas';

function Editor({ template }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    // Load template elements here
    // This is a placeholder for where you'd parse your template JSON and create Fabric.js objects

    return () => {
      fabricCanvasRef.current.dispose();
    };
  }, [template]);

  return (
    <div>
      <Toolbar canvas={fabricCanvasRef.current} />
      <Canvas canvasRef={canvasRef} />
    </div>
  );
}

export default Editor;