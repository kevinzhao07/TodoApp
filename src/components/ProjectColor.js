import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

export const ProjectColor = ({selectedColor, setSelectedColor, showColor, setShowColor}) => {

  const allColors = ['#db4c3f', '#FF6663', '#FEB144', '#edd472', '#9EE09E', '#9EC1CF', '#CC99C9', '#b5b5b5', '#4a4a4a'];

  return (
    <div>
      {/* if showColor is true (if it has been pressed) */}
      {showColor && (
        <div className="color-overlay">
          <ul className="color-overlay_list">
            {allColors.map(color => (
              <li 
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setShowColor(false);
                }} // TODO
                >

                  {/* creates a circle */}
                  <svg 
                    height="40" 
                    width="40"
                  >
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="20" 
                      fill={color} 
                    />

                  </svg>
                  
                  {(color === selectedColor) && (

                    <FaPencilAlt
                      className="color-overlay_icon"
                    />
                    
                  )}

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}