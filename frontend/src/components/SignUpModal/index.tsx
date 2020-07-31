import React, { useContext, useEffect, useState } from 'react';

import { Container, Modal, Stars } from './styles';

import StarsSvg from '../Stars';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const SignUpModal: React.FC<{ show: boolean }> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { selectedTheme } = useContext<any>(ThemeContext);

  useEffect(() => setShowModal(props.show), [props.show]);

  return (
    <>
      {showModal && (
        <Container>
          <Modal theme={selectedTheme}>
            <Stars>
              <StarsSvg id="1" />
              <StarsSvg id="2" />
              <StarsSvg id="3" />
            </Stars>
            <h1>Account created successfully!</h1>
            <Link to="/">Sign In</Link>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default SignUpModal;
