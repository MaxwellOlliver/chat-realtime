import React, { useContext, useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import { formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import socketio from 'socket.io-client';

import { FiLogOut, FiSend, FiEye, FiSearch } from 'react-icons/fi';
import ContextMenuModal from '../../components/ContextMenuModal';

import {
  Container,
  Body,
  Users,
  Chat as ChatComponent,
  Suggestions,
} from './styles';

import api from '../../services/api';
import { UserContext, User } from '../../context/UserContext';
import { AxiosResponse } from 'axios';
import { parseISO } from 'date-fns/esm';

interface Partner {
  _id: string;
  name: string;
  email: string;
}

interface Message {
  _id: string;
  content: string;
  from: User;
  to: User;
  createdAt: string;
}

const Chat: React.FC<{ history: any }> = ({ history }) => {
  const [showContext, setShowContext] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [partner, setPartner] = useState<Partner | null>(null);
  const [suggestions, setSuggestions] = useState([]);

  const [recents, setRecents] = useState<Partner[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [coordinates, setCoordinates] = useState<{ x?: number; y?: number }>(
    {}
  );

  const searchRef = useRef<HTMLInputElement>(null);
  const page = useRef<number>(1);
  const messageBodyRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLAudioElement>(null);

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

  useEffect(() => {
    let tk = token || localStorage.getItem('CR_TOKEN');
    const socket = socketio.connect('http://localhost:3333', {
      query: {
        token: tk,
      },
    });

    socket.on('receivedMessage', (data: Message) => {
      console.log(data);
      if (partner?._id === data.from._id) {
        let newMessage = {
          ...data,
          formattedDate: formatRelative(parseISO(data.createdAt), new Date(), {
            locale: pt,
          }),
        };
        setMessages([...messages, newMessage]);
      }

      if (recents.filter((value) => value._id === partner?._id).length > 0) {
        recents.splice(
          recents
            .map((value) => (value as Partner)._id)
            .indexOf(partner?._id as string),
          1
        );
      }
      setRecents([{ ...(partner as Partner) }, ...recents]);
      // if (!partner._id) {
      //   document
      //     .querySelector(`#user-${data.from._id}`)
      //     .classList.add('message-received');
      // } else if (partner._id !== data.from._id) {
      //   document
      //     .querySelector(`#user-${data.from._id}`)
      //     .classList.add('message-received');
      // }

      if (messageBodyRef.current) {
        messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
      }
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, messages, recents]);

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

  async function loadMessages(_id: string, name: string, email: string) {
    if (_id === partner?._id) return;

    try {
      const response: AxiosResponse<Message[]> = await api.get(
        `/message/list?recipient=${_id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setPartner({ _id, name, email });

      let formatted = response.data.map((value: any) => {
        return {
          ...value,
          formattedDate: formatRelative(parseISO(value.createdAt), new Date(), {
            locale: pt,
          }),
        };
      });

      setMessages(formatted);
      if (messageBodyRef.current) {
        messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function sendMessage() {
    if (messageContent) {
      try {
        const response: AxiosResponse<Message> = await api.post(
          '/message',
          {
            content: messageContent,
            from: user?._id,
            to: partner?._id,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        let newMessage = {
          ...response.data,
          formattedDate: formatRelative(
            parseISO(response.data.createdAt),
            new Date(),
            {
              locale: pt,
            }
          ),
        };

        if (response.data) {
          setMessages((state) => [...state, newMessage]);
          if (
            recents.filter((value) => value._id === partner?._id).length > 0
          ) {
            recents.splice(
              recents
                .map((value) => (value as Partner)._id)
                .indexOf(partner?._id as string),
              1
            );
            setRecents([{ ...(partner as Partner) }, ...recents]);
          } else {
            setRecents([{ ...(partner as Partner) }, ...recents]);
          }

          setMessageContent('');
          if (messageBodyRef.current) {
            messageBodyRef.current.scrollTop =
              messageBodyRef.current.scrollHeight;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Container>
      {/* <audio src={notification} ref={notificationRef} /> */}
      <div>
        <header>
          <h1>RealTime</h1>
          <FiLogOut color="#333" size={16} onClick={logout} />
        </header>
        <Body>
          <Users>
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

              <Suggestions showSuggestions={showSuggestions}>
                <li className="suggest">
                  <span>Suggestions</span>
                </li>
                {suggestions.map((value: any) => (
                  <li
                    className="result"
                    key={value._id}
                    onMouseDown={() =>
                      loadMessages(value._id, value.name, value.email)
                    }
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
                    onClick={() =>
                      loadMessages(value._id, value.name, value.email)
                    }
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
          <ChatComponent>
            {partner?._id ? (
              <>
                <div className="messages" ref={messageBodyRef}>
                  {showContext && (
                    <ContextMenuModal
                      show={showContext}
                      x={coordinates.x}
                      y={coordinates.y}
                      message={{ _id: '' }}
                      onMoreInfo={() => {}}
                    />
                  )}
                  {!messages[0] && (
                    <div className="no-messages">
                      <p>No messages</p>
                    </div>
                  )}

                  {messages.map((value: any) =>
                    value.from._id === partner?._id ? (
                      <div className="received" key={value._id}>
                        <div>
                          <p>{value.content}</p>
                          <span>{value.formattedDate}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="sent" key={value._id}>
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
                            {value.formattedDate}{' '}
                            <FiEye size={11} color="#333" />
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
                    onChange={(e) => setMessageContent(e.target.value)}
                    value={messageContent}
                    rows={1}
                    name="message-bar"
                    id="message-bar"
                    placeholder="Type your message..."
                  />
                  <button id="send-message" onClick={sendMessage}>
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
