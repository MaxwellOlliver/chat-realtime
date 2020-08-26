import React, { useContext } from 'react';

import { ThemeProvider } from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

const Theme: React.FC = ({ children }) => {
  const { selectedTheme } = useContext(ThemeContext);
  return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
};

export default Theme;
