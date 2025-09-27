import React from "react";

const colors = [
  { name: '#fcc201', role: 'Primary' },
  { name: '#d4a000', role: 'Primary Dark' },
  { name: '#ffe680', role: 'Primary Light' },
  { name: '#f9f9f9', role: 'Background' },
  { name: '#ffffff', role: 'Surface' },
  { name: '#e0e0e0', role: 'Border' },
  { name: '#333333', role: 'Text Primary' },
  { name: '#666666', role: 'Text Secondary' },
  { name: '#4CAF50', role: 'Success' },
  { name: '#FF9800', role: 'Warning' },
  { name: '#F44336', role: 'Error' },
  { name: '#2196F3', role: 'Info' },
  { name: '#121212', role: 'Dark Background' },
  { name: '#1E1E1E', role: 'Dark Surface' },
  { name: '#f5f5f5', role: 'Dark Text' },
  { name: '#ffd633', role: 'Dark Accent Yellow' },
];


const ColorPalette: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-6 p-6">
      {colors.map((color) => (
        <div key={color.name} className="flex flex-col items-center w-28">
          <div
            className="w-16 h-16 rounded-full border border-gray-300"
            style={{ backgroundColor: color.name }}
          ></div>
          <div className="text-center mt-2 text-sm text-gray-700">
            <strong>{color.role}</strong>
            <br />
            <span className="text-xs text-gray-500">{color.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
