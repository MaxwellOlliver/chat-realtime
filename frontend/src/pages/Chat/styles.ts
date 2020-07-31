import styled from 'styled-components';

export const Container = styled.div`
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
