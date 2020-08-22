import React, { useContext, useState, useEffect, useRef } from 'react';
import _ from 'lodash';

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

import api from '../../services/api';
import { UserContext, User } from '../../context/UserContext';

const Chat: React.FC<{ history: any }> = ({ history }) => {
  const [showContext, setShowContext] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState([]);

  const [recents, setRecents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [coordinates, setCoordinates] = useState<{ x?: number; y?: number }>(
    {}
  );

  const searchRef = useRef<HTMLInputElement>(null);
  const page = useRef<number>(1);

  const { selectedTheme } = useContext<any>(ThemeContext);
  const { user, token, setUser, _setToken } = useContext(UserContext);

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

  useEffect(() => {
    (async () => {
      try {
        let tk: any = localStorage.getItem('CR_TOKEN');
        if (_setToken) _setToken(tk);
        const response = await api.get('/message/recents', {
          headers: { authorization: `Bearer ${tk}` },
        });
        const loggedUser = await api.get<User>('/me', {
          headers: { authorization: `Bearer ${tk}` },
        });

        setRecents(response.data);
        if (setUser) setUser(loggedUser.data);
      } catch (err) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, setUser]);

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

  const search = _.debounce(async () => {
    if (searchRef.current !== null) {
      if (searchRef.current.value.length === 0)
        return setShowSuggestions(false);

      const response = await api.get(`/users?q=${searchRef.current.value}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setSuggestions(response.data);
      setShowSuggestions(true);
    }
  }, 100);

  async function loadMessages(id: string) {
    try {
      console.log('teste');
      const response = await api.get(`/message/list?recipient=${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setPartnerId(id);
      setMessages(response.data);
    } catch (err) {
      console.log(err);
    }
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
                onFocus={search}
                onBlur={() => setShowSuggestions(false)}
                ref={searchRef}
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
                {suggestions.map((value: any) => (
                  <li
                    className="result"
                    key={value._id}
                    onMouseDown={() => loadMessages(value._id)}
                  >
                    <h4>{value.name}</h4>
                    <span>{value.email}</span>
                  </li>
                ))}
              </Suggestions>
            </div>
            <header>
              <h3>Hello, {user?.name}!</h3>
              <span>{user?.email}</span>
            </header>
            <ul className="recents">
              {recents[0] ? (
                recents.map((value: any) => (
                  <li
                    className="recents"
                    onClick={() => loadMessages(value._id)}
                    key={value._id}
                  >
                    <h4>{value.name}</h4>
                    <span>{value.email}</span>
                  </li>
                ))
              ) : (
                <li className="no-recents">
                  <span>No recent conversations</span>
                </li>
              )}
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

                  {messages.map((value: any) =>
                    value.from === partnerId ? (
                      <div className="received">
                        <div>
                          <p>{value.content}</p>
                          <span>Hoje às 22:34</span>
                        </div>
                      </div>
                    ) : (
                      <div className="sent">
                        <div>
                          <p
                            onContextMenu={(event: any) =>
                              openContextMenu(event, {})
                            }
                            id="content-1"
                          >
                            {value.content}
                          </p>
                          <span>
                            Hoje às 22:34 <FiEye size={11} color="#333" />
                          </span>
                        </div>
                      </div>
                    )
                  )}
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
