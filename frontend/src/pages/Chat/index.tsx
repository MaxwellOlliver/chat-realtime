import React, { useContext } from 'react';

import { Container } from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const Chat: React.FC = () => {
  const { selectedTheme } = useContext<any>(ThemeContext);

  return <Container theme={selectedTheme}></Container>;
};

export default Chat;
