import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0
  } to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.4);

  z-index: 9999;
`;

export const Modal = styled.div`
  background-color: #fff;
  width: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 20px 0;
  border-radius: 8px;

  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;

  h1 {
    text-align: center;
    color: #333;
    font-size: 25px;
    margin-bottom: 20px;
  }

  a {
    color: ${(props) => props.theme.fontColor};
    transition: filter 0.3s;
    font-weight: 400;
    text-decoration: none;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const Stars = styled.div`
  position: relative;
  width: 80px;
  height: 80px;

  > svg {
    position: absolute;
  }

  #star-1 {
    width: 50px;
    height: 50px;
    transform: rotate(45deg);
  }

  #star-2 {
    width: 30px;
    height: 30px;
    right: 0;
    transform: rotate(-45deg);
  }

  #star-3 {
    width: 20px;
    height: 20px;
    bottom: 20px;
    right: 10px;

    transform: rotate(15deg);
  }
`;
