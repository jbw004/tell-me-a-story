import React from 'react';

function RightPanel({ selectedTemplate }) {
  return (
    <div className="floating-panel right-panel">
      <h2>Text Properties</h2>
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