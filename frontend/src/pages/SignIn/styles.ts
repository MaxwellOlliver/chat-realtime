import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {

  }
  to {
    margin-top: 70%;
  }
`;

const slideUp = keyframes`
  from {
    margin-top: 70%;
  }
  to {
    margin-top: 0%;
  }
`;

const fade = keyframes`
  from {
    opacity: 100;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    visibility: visible;
    opacity: 100;
  }
`;

export const Container: any = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
      to left,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    )
    center;
  background-size: 200%;
`;

export const Form: any = styled.form`
  width: 300px;
  max-height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  overflow: hidden;

  div {
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.fade {
      animation: ${fade} 0.3s forwards;
    }

    &.fadeOut {
      opacity: 0;
      animation: ${fadeOut} 3.3s 1s forwards;
    }
  }

  h1 {
    font-size: 35px;
    color: #fff;
    font-weight: 300;
    margin-bottom: 20px;
    margin-top: 0%;

    &.slide {
      animation: ${slideDown} 1s 0.3s ease-out forwards;
    }

    &.slideup {
      animation: ${slideUp} 1s ease-out forwards;
    }
  }

  input {
    width: 100%;
    height: 50px;
    border: 1px solid #ffffff6b;
    background-color: #ffffff31;
    border-radius: 2px;
    margin-bottom: 10px;
    color: #fff;
    padding: 0 10px;
    font-size: 18px;

    transition: all 0.3s;
    font-weight: 300;

    text-align: center;

    &:hover {
      background-color: #ffffff5b;
    }

    &:focus {
      border: 1px solid #ffffffab;
      background-color: #fff;
      color: ${(props) => props.theme.fontColor};
    }

    &::placeholder {
      color: #ffffffd0;
    }
  }

  span {
    width: 100%;
    color: #fff;
    text-decoration: none;
    text-align: center;
    font-weight: 300;
    font-size: 12px;
    height: 14px;

    margin-bottom: 10px;
  }

  button {
    width: 100%;
    height: 50px;
    background-color: #fff;
    color: ${(props) => props.theme.fontColor};
    border: 0;
    width: 100%;
    border-radius: 2px;
    cursor: pointer;
    margin: 10px 0;
    font-weight: 300;

    transition: background-color 0.3s;

    &:hover {
      background-color: #ffffffca;
    }

    &:last-child {
      margin: 0;
    }
  }

  a {
    width: 100%;
    color: #fff;
    text-decoration: none;
    text-align: left;
    font-weight: 300;
    font-size: 12px;

    &:hover {
      color: #ffffffce;
    }
  }
`;
