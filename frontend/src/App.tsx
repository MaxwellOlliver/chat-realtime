import React from 'react';
import Routes from './routes';

import { Global } from './styles/globals';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <>
      <Global />
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
