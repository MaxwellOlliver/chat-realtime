import styled from 'styled-components';

interface Props {
  coordinates: {
    x?: number;
    y?: number;
  };
}

export const Modal = styled.ul<Props>`
  list-style: none;
  width: 200px;
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  position: absolute;
  top: ${(props) => props.coordinates.y}px;
  left: ${(props) => props.coordinates.x}px;

  li {
    height: 40px;
    padding: 0 20px;
    cursor: pointer;
    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    transition: filter 0.3s;

    svg {
      margin-right: 10px;
    }

    span {
      color: #333;
      font-size: 14px;
    }

    &:hover {
      filter: brightness(0.9);
    }

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
`;
