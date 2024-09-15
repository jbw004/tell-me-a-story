import React from 'react';

function RightPanel({ selectedText, onTextStyleChange }) {
  if (!selectedText) {
    return <div className="floating-panel right-panel">Select text to edit</div>;
  }

  return (
    <div className="floating-panel right-panel">
      <h2>Text Properties</h2>
      <label>
        Font
        <select onChange={(e) => onTextStyleChange({ fontFamily: e.target.value })}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier">Courier</option>
        </select>
      </label>
      <label>
        Size
        <input 
          type="number" 
          defaultValue={24} 
          onChange={(e) => onTextStyleChange({ fontSize: `${e.target.value}px` })}
        />
      </label>
      <label>
        Color
        <input 
          type="color" 
          defaultValue="#000000" 
          onChange={(e) => onTextStyleChange({ color: e.target.value })}
        />
      </label>
    </div>
  );
}

export default RightPanel;