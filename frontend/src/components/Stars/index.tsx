import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Stars: React.FC<{ id: string }> = (props) => {
  const { selectedTheme } = useContext<any>(ThemeContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      id={`star-${props.id}`}
      viewBox="0 0 512 512"
    >
      <path
        fill={selectedTheme.fontColor}
        stroke={selectedTheme.fontColor}
        strokeWidth="37.615"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M259.216 29.942l71.054 143.977 158.89 23.088L374.185 309.08l27.145 158.23-142.114-74.698-142.112 74.698 27.146-158.23L29.274 197.007l158.891-23.088z"
      />
    </svg>
  );
};

export default Stars;
