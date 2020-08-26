import React from 'react';
import { UserProvider } from '../../context/UserContext';
import { ThemeProvider } from '../../context/ThemeContext';
import Theme from '../Theme';

const BindContext: React.FC = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>
        <Theme>{children}</Theme>
      </ThemeProvider>
    </UserProvider>
  );
};

export default BindContext;
