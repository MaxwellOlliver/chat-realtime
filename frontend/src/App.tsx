import React from 'react';
import Routes from './routes';

import { Global } from './styles/globals';
import ThemeSwitcher from './components/ThemeSwitcher';
import BindContext from './helpers/BindContext';

function App() {
  return (
    <>
      <Global />
      <BindContext>
        <ThemeSwitcher />
        <Routes />
      </BindContext>
    </>
  );
}

export default App;
