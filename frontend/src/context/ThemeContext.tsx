import React, { createContext, useState, useCallback, useEffect } from 'react';

interface Color {
  id: number;
  primary: string;
  secondary: string;
  fontColor: string;
}

export const ThemeContext = createContext({});

export const ThemeProvider: React.FC = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState({
    id: 1,
    primary: '#518eb6',
    secondary: '#b55db8',
    fontColor: '#c48dda',
  });
  const colors: Color[] = [
    {
      id: 1,
      primary: '#518eb6',
      secondary: '#b55db8',
      fontColor: '#c48dda',
    },
    {
      id: 2,
      primary: '#53d8d1',
      secondary: '#5d8fb8',
      fontColor: '#8dc8da',
    },
    {
      id: 3,
      primary: '#5bc584',
      secondary: '#c2c05a',
      fontColor: '#8cce6d',
    },
    {
      id: 4,
      primary: '#c5bb5b',
      secondary: '#c2925a',
      fontColor: '#c9ac77',
    },
    {
      id: 5,
      primary: '#c5675b',
      secondary: '#c25a79',
      fontColor: '#c98288',
    },
    {
      id: 6,
      primary: '#c55b87',
      secondary: '#a15ac2',
      fontColor: '#c982bf',
    },
  ];

  const selectTheme = (id: number, showModal?: any): void => {
    localStorage.setItem('CR_THEME', String(id));

    let color: any = colors.find((value) => value.id === id);

    setSelectedTheme(color);
    showModal(false);
  };

  useEffect(() => {
    let color: any = localStorage.getItem('CR_THEME');

    if (color) {
      let selected: any = colors[Number(color) - 1];

      setSelectedTheme(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        selectTheme,
        selectedTheme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
