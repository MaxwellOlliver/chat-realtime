import React from 'react';
import Routes from './routes';

import { Global } from './styles/globals';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <>
      <Global />
      <ThemeProvider>
        <ThemeSwitcher />
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
