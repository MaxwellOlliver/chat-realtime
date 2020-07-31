import styled from 'styled-components';

export const Container = styled.div`
  width: auto;
  min-height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 9999;

  box-sizing: 0 0 20px 0 rgba(0, 0, 0, 0.3);

  button {
    padding: 0 20px;
    width: 50%;
    height: 40px;
    background-color: #fff;
    border-radius: 8px;
    font-weight: 300;
    color: #333;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    div {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 8px;

      background: linear-gradient(
          to left,
          ${(props) => props.theme.primary},
          ${(props) => props.theme.secondary}
        )
        center;
      background-size: 200%;
    }
  }
  .modal {
    display: flex;
    background-color: #fff;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
    border-radius: 8px;

    opacity: 0;

    h3 {
      color: #333;
      font-size: 14px;
      font-weight: 300;
    }

    ul {
      list-style: none;
      display: flex;
      padding: 10px;
    }
  }
`;

export const Modal = styled.div`
  display: flex;
  background-color: #fff;
  position: absolute;
  top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 5px;
  border-radius: 8px;

  h3 {
    color: #333;
    font-size: 14px;
    font-weight: 300;
  }

  ul {
    list-style: none;
    display: flex;
    padding: 10px;
  }
`;

export const Arrow = styled.div`
  width: 10px;
  height: 10px;
  background-color: #fff;
  transform: rotate(45deg);
  border-radius: 4px 0 0 0;

  position: absolute;
  top: -5px;
  right: 62px;
`;

export const ListColor = styled.li`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 8px;

  background: linear-gradient(
      to left,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    )
    center;
  background-size: 200%;
  transition: all 0.3s;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;
