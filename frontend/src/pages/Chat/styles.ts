import styled from 'styled-components';

interface SuggestionsProps {
  showSuggestions: boolean;
  theme: {
    primary: string;
    fontColor: string;
    secondary: string;
  };
}

export const Container = styled.div`
  width: 100vw;
  min-width: 1300px;
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

  .input-invisible {
    position: absolute;
    top: 0;
    left: 0;
  }

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
      border: 0px solid #ddd;
      border-bottom-width: 1px;

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

export const Suggestions = styled.ul<SuggestionsProps>`
  display: ${(props) => (props.showSuggestions ? 'block' : 'none')};
  width: 100%;
  max-height: 240px;
  position: absolute;
  top: 30px;

  list-style: none;
  overflow-y: auto;

  background-color: #fff;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.1);

  ::-webkit-scrollbar {
    width: 3px;
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
    border-radius: 0 4px 4px 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #ccc;
  }

  .suggest {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;

    span {
      font-weight: 300;
      font-size: 12px;
      margin-left: 20px;
      color: #949494;
    }
  }

  .result {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start !important;
    padding: 0 20px;
    background-color: #fff;

    cursor: pointer;
    transition: filter 0.3s;

    h4 {
      font-weight: 400;
      color: #333;
    }

    span {
      font-size: 12px;
      color: #949494;
      font-weight: 400;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
`;

export const Users = styled.div`
  width: 30%;
  height: calc(70vh - 30px);
  background-color: #fff;

  border-radius: 0 0 0 4px;

  display: flex;
  flex-direction: column;
  border: 0px solid #ddd;
  border-right-width: 1px;

  .search {
    width: 100%;
    height: 30px;
    display: flex;

    position: relative;

    .results {
      display: none;
      width: 100%;
      max-height: 240px;
      position: absolute;
      top: 30px;

      list-style: none;
      overflow-y: auto;

      background-color: #fff;
      box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.1);

      ::-webkit-scrollbar {
        width: 3px;
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
        border-radius: 0 4px 4px 0;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #ccc;
      }

      .suggest {
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;

        span {
          font-weight: 300;
          font-size: 12px;
          margin-left: 20px;
          color: #949494;
        }
      }

      .result {
        width: 100%;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start !important;
        padding: 0 20px;
        background-color: #fff;

        cursor: pointer;
        transition: filter 0.3s;

        h4 {
          font-weight: 400;
          color: #333;
        }

        span {
          font-size: 12px;
          color: #949494;
          font-weight: 400;
        }

        &:hover {
          filter: brightness(0.95);
        }
      }
    }

    input {
      height: 30px;
      width: 100%;
      color: #333;
      font-weight: 300;
      font-size: 12px;
      padding: 0 0 0 20px;
      background-color: #fff;
      transition: filter 0.3s;

      &:hover,
      &:focus {
        filter: brightness(0.98);
      }
    }

    button {
      width: 60px;
      background: #fff;

      transition: filter 0.3s;

      &:hover {
        filter: brightness(0.98);
      }
    }
  }

  > header {
    width: 100%;
    min-height: 100px;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start !important;
    border-radius: 0 !important;
    color: #333;
    border-width: 0px !important;
    padding: 0 40px !important;

    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.1);

    h3 {
      font-weight: 400;
      text-align: left;
    }

    span {
      font-size: 12px;
      font-weight: 300;
    }
  }

  > h3 {
    width: 100%;
    text-align: center;
    color: #333;
    font-weight: 300;
    font-size: 14px;
    height: 20px;
  }

  > ul {
    width: 100%;
    height: calc(100% - 130px);
    border-radius: 0 0 0 4px;
    list-style: none;
    overflow-y: auto;
    /* border-top: 1px solid #ddd; */

    ::-webkit-scrollbar {
      width: 3px;
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
      border-radius: 0 4px 4px 0;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #ccc;
    }

    li.recents {
      width: 100%;
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start !important;
      padding: 0 20px;

      cursor: pointer;
      transition: background-color 0.3s;

      h4 {
        font-weight: 400;
        color: #333;
      }

      span {
        font-size: 12px;
        color: #949494;
        font-weight: 400;
      }

      &:hover {
        background-color: #eee;
      }
    }

    li.no-recents {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;

      span {
        font-size: 14px;
        font-weight: 300;
        color: #949494;
      }
    }
  }
`;

export const Chat = styled.div`
  width: 70%;
  height: calc(70vh - 30px);
  max-height: calc(70vh - 30px);

  border-radius: 0 0 4px 0;

  .welcome {
    height: 100%;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    h3 {
      font-size: 45px;
      background: linear-gradient(
          to left,
          ${(props) => props.theme.primary},
          ${(props) => props.theme.secondary}
        )
        center;
      background-size: 200%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    span {
      font-size: 16px;
      color: #949494;
    }
  }

  .messages {
    width: 100%;
    height: calc(100% - 60px);

    min-height: calc(100% - 100px);
    max-height: calc(100% - 60px);
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    overflow-y: auto;

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

    .no-messages {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: #ccc;
        font-weight: 300;
      }
    }

    .received,
    .sent {
      min-width: 100%;
      width: 100%;
      color: #fff;
      display: flex;
      margin-bottom: 10px;

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
            margin-left: 5px;
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
    max-height: 100px;
    padding: 10px 0;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 -10px 15px -5px rgba(0, 0, 0, 0.1);

    background-color: #fff;
    border-radius: 0 0 4px 0;

    textarea {
      width: 80%;
      height: 40px;
      max-height: 80px;
      border-radius: 4px;
      resize: none;

      padding: 10px;
      font-size: 16px;
      color: #333;
      font-weight: 300;
      margin-right: 20px;
      overflow: auto;
      display: block;

      background-color: #eee;

      &::placeholder {
        color: #a8a8a8;
      }

      ::-webkit-scrollbar {
        width: 3px;
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
        border-radius: 0 4px 4px 0;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #ccc;
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
