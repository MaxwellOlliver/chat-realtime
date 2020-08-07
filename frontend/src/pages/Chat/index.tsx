import React, { useContext, useState, useEffect, ChangeEvent } from 'react';

import { FiLogOut, FiSend, FiEye, FiSearch } from 'react-icons/fi';
import ContextMenuModal from '../../components/ContextMenuModal';

import {
  Container,
  Body,
  Users,
  Chat as ChatComponent,
  Suggestions,
} from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const Chat: React.FC<{ history: any }> = ({ history }) => {
  const [showContext, setShowContext] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [partnerId, setPartnerId] = useState(null);
  const [coordinates, setCoordinates] = useState<{ x?: number; y?: number }>(
    {}
  );
  const { selectedTheme } = useContext<any>(ThemeContext);

  function openContextMenu(e: MouseEvent, message: any) {
    e.preventDefault();
    let coords = { x: e.pageX, y: e.pageY };

    setCoordinates(coords);
    setShowContext(true);
  }

  useEffect(() => {
    window.addEventListener('click', () => setShowContext(false));

    return () =>
      window.removeEventListener('click', () => setShowContext(false));
  }, []);

  function autosize() {
    let el = document.querySelector('textarea');
    let msg: any = document.querySelector('.messages');

    if (el && msg) {
      el.style.cssText = 'height:auto';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
      msg.style.cssText = `height: calc(100% - ${el.scrollHeight + 20}px)`;
    }
  }

  function resizeOnDelete() {
    let el = document.querySelector('textarea');
    let msg: any = document.querySelector('.messages');
    if (msg && el && el.value.length === 0) {
      msg.style.cssText = 'height: calc(100% - 60px)';
      el.style.cssText = 'height: 40px';
    }
  }

  function logout() {
    localStorage.removeItem('CR_TOKEN');

    history.replace('/');
  }

  function search(e: any) {
    if (e.target.value.length === 0) return setShowSuggestions(false);

    // search

    setShowSuggestions(true);
  }

  return (
    <Container theme={selectedTheme}>
      <div>
        <header>
          <h1>RealTime</h1>
          <FiLogOut color="#333" size={16} onClick={logout} />
        </header>
        <Body>
          <Users theme={selectedTheme}>
            <div className="search">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search someone by email..."
                autoComplete="off"
                onChange={search}
                onBlur={() => setShowSuggestions(false)}
              />
              <button>
                <FiSearch size={14} color="#333" />
              </button>

              <Suggestions
                theme={selectedTheme}
                showSuggestions={showSuggestions}
              >
                <li className="suggest">
                  <span>Suggestions</span>
                </li>
                <li className="result">
                  <h4>Rafael Martins</h4>
                  <span>rafael.martins@gmail.com</span>
                </li>
              </Suggestions>
            </div>
            <header>
              <h3>Hello, Maxwell Olliver!</h3>
              <span>maxwellmacedo2015@gmail.com</span>
            </header>
            <ul className="recents">
              {/* <li className="no-recents">
                <span>No recent conversations</span>
              </li> */}
              <li className="recents">
                <h4>Rafael Martins</h4>
                <span>rafael.martins@gmail.com</span>
              </li>
              <li className="recents">
                <h4>Rafael Martins</h4>
                <span>rafael.martins@gmail.com</span>
              </li>
              <li className="recents">
                <h4>Rafael Martins</h4>
                <span>rafael.martins@gmail.com</span>
              </li>
              <li className="recents">
                <h4>Rafael Martins</h4>
                <span>rafael.martins@gmail.com</span>
              </li>
              <li className="recents">
                <h4>Rafael Martins</h4>
                <span>rafael.martins@gmail.com</span>
              </li>
              <li className="recents">
                <h4>Rafael Martins</h4>
                <span>rafael.martins@gmail.com</span>
              </li>
              <li className="recents">
                <h4>Rafael Martins</h4>
                <span>rafael.martins@gmail.com</span>
              </li>
            </ul>
          </Users>
          <ChatComponent theme={selectedTheme}>
            {partnerId ? (
              <>
                <div className="messages">
                  {showContext && (
                    <ContextMenuModal
                      show={showContext}
                      x={coordinates.x}
                      y={coordinates.y}
                      message={{ _id: '' }}
                      onMoreInfo={() => {}}
                    />
                  )}

                  <div className="sent">
                    <div>
                      <p
                        onContextMenu={(event: any) =>
                          openContextMenu(event, {})
                        }
                        id="content-1"
                      >
                        Ola Maria
                      </p>
                      <span>
                        Hoje às 22:34 <FiEye size={11} color="#333" />
                      </span>
                    </div>
                  </div>
                  <div className="received">
                    <div>
                      <p>Olá Pedro</p>
                      <span>Hoje às 22:34</span>
                    </div>
                  </div>
                </div>
                <div className="message-bar">
                  <textarea
                    onKeyDown={autosize}
                    onKeyUp={resizeOnDelete}
                    rows={1}
                    name="message-bar"
                    id="message-bar"
                    placeholder="Type your message..."
                  />
                  <button id="send-message">
                    <FiSend color="#fff" size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="welcome">
                <h3>Welcome!</h3>
                <span>Start a conversation with your friends...</span>
              </div>
            )}
          </ChatComponent>
        </Body>
      </div>
    </Container>
  );
};

export default Chat;
