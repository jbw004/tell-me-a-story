import React from 'react';

function RightPanel({ selectedTemplate }) {
  return (
    <div className="floating-panel right-panel">
      <h2>Style</h2>
      <button className="style-button active">Text</button>
      <button className="style-button">Box</button>
      <button className="style-button">Image</button>
      
      <h2>Properties</h2>
      <label>
        Font
        <select>
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Courier</option>
        </select>
      </label>
      <label>
        Size
        <input type="number" defaultValue={24} />
      </label>
    </div>
  );
}

export default RightPanel;