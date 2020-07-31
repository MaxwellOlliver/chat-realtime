import React, { useState, useContext } from 'react';

import { Container, Arrow, ListColor } from './styles';
import { ThemeContext } from '../../context/ThemeContext';

import { motion } from 'framer-motion';

const ThemeSwitcher: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { selectedTheme, selectTheme, colors } = useContext<any>(ThemeContext);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <Container theme={selectedTheme} onMouseLeave={closeModal}>
      <motion.button onMouseEnter={openModal}>
        <div></div>
        theme
      </motion.button>
      <motion.div
        onMouseLeave={closeModal}
        className="modal"
        animate={{
          opacity: showModal ? 1 : 0,
          height: showModal ? 87 : 60,
          pointerEvents: showModal ? 'unset' : 'none',
        }}
        transition={{
          ease: 'easeOut',
          opacity: { duration: 0.1 },
          height: { duration: 0.2 },
        }}
      >
        <Arrow />
        <h3>Select a theme</h3>
        <ul>
          {colors.map((color: any) => (
            <ListColor
              key={color.id}
              theme={color}
              onClick={() => selectTheme(color.id, setShowModal)}
            ></ListColor>
          ))}
        </ul>
      </motion.div>
    </Container>
  );
};

export default ThemeSwitcher;
