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

  > div {
    width: 60%;
    min-height: 70vh;
    background-color: #fff;

    border-radius: 4px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;

    header {
      width: 100%;
      height: 30px;

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;

      border-radius: 4px 4px 0 0;

      h1 {
        font-size: 18px;
        color: ${(props) => props.theme.fontColor};
        font-weight: 300;
        margin: 0 auto;
      }

      svg {
        cursor: pointer;
      }
    }
  }
`;

export const Body = styled.div`
  width: 100%;
  height: calc(70vh - 30px);

  border-radius: 0 0 4px 4px;

  display: flex;
`;

export const Users = styled.div`
  width: 40%;
  height: calc(70vh - 30px);
  background-color: #eee;

  border-radius: 0 0 0 4px;
`;

export const Chat = styled.div`
  width: 80%;
  height: calc(70vh - 30px);

  border-radius: 0 0 4px 0;

  .messages {
    width: 100%;
    height: calc(100% - 60px);
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 7px;
    }

    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 1px;
      border-radius: 1px;
      background: linear-gradient(
          to bottom,
          ${(props) => props.theme.primary},
          ${(props) => props.theme.secondary}
        )
        center;
    }

    ::-webkit-scrollbar-track {
      background-color: #eee;
      border-radius: 1px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #ccc;
    }

    .received,
    .sent {
      min-width: 100%;
      width: 100%;
      color: #fff;
      display: flex;

      > div {
        display: flex;
        flex-direction: column;
        width: auto;
        max-width: 60%;
        padding-right: 10px;
        p {
          background: linear-gradient(
              to left,
              ${(props) => props.theme.primary},
              ${(props) => props.theme.secondary}
            )
            center;
          background-size: 200%;

          padding: 10px 15px;
          border-radius: 4px;
          margin: 0 0 5px 0;
          min-width: 100%;

          font-size: 16px;
          font-weight: 300;
          text-align: justify;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          word-wrap: break-word;
          -webkit-hyphens: auto;
          hyphens: manual;
        }

        span {
          display: flex;
          align-items: center;
          color: #777;
          font-size: 11px;
          margin-left: 5px;

          svg {
            margin-right: 5px;
          }
        }
      }
    }

    .received {
      justify-content: flex-start;
      align-self: flex-start;
      div {
        padding: 0 0 0 10px;
      }
    }

    .sent {
      justify-content: flex-end;
      align-self: flex-end;
      div {
        p {
          background: #dadada;
          color: #333;
        }

        span {
          margin: 0 5px 0 0;
          justify-content: flex-end;
        }
      }
    }
  }

  .message-bar {
    width: 100%;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 -10px 15px -5px rgba(0, 0, 0, 0.1);

    background-color: #fff;
    border-radius: 0 0 4px 0;

    input {
      width: 80%;
      height: 40px;
      border-radius: 4px;

      padding: 0 10px;
      font-size: 16px;
      color: #333;
      font-weight: 300;
      margin-right: 20px;

      background-color: #eee;

      &::placeholder {
        color: #a8a8a8;
      }
    }

    button {
      height: 40px;
      width: 60px;
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
      border-radius: 4px;

      transition: filter 0.3s;
    }
  }
`;
