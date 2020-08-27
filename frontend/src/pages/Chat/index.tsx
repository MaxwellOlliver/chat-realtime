import React, { useContext, useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import { formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import socketio from 'socket.io-client';

import {
  FiLogOut,
  FiSend,
  FiEye,
  FiSearch,
  FiEyeOff,
  FiClock,
} from 'react-icons/fi';
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
import Loader from '../../components/Loader';

interface Partner {
  readonly _id: string;
  name: string;
  email: string;
}

export interface Message {
  _id?: string;
  content: string;
  from: Partner;
  to: Partner;
  createdAt: string;
  wasReaded: boolean;
  deleted: boolean;
  formattedDate?: string;
  notSent?: boolean;
}

const Chat: React.FC<{ history: any }> = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(true);

  const [showContext, setShowContext] = useState(false);
  const [contextMessage, setContextMessage] = useState<Partial<Message>>({});
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

  function _setMessages(messages: Message[]) {
    let msgFormatted = messages.map((message: Message) => {
      if (!message.formattedDate) {
        return {
          ...message,
          formattedDate: formatRelative(
            parseISO(message.createdAt),
            new Date(),
            {
              locale: pt,
            }
          ),
        };
      } else {
        return message;
      }
    });

    setMessages(msgFormatted);
  }

  useEffect(() => {
    if (messageBodyRef.current && messages[messages.length - 1].notSent) {
      messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
    }
  }, [messages]);

  function openContextMenu(e: MouseEvent, message: Message) {
    e.preventDefault();
    let coords = { x: e.pageX, y: e.pageY };

    setContextMessage(message);
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
        const recents = await api.get('/message/recents', {
          headers: { authorization: `Bearer ${tk}` },
        });
        const loggedUser = await api.get<User>('/me', {
          headers: { authorization: `Bearer ${tk}` },
        });

        setRecents(recents.data);
        if (setUser) setUser(loggedUser.data);
        setLoading(false);
      } catch (err) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, setUser]);

  useEffect(() => {
    let tk = token || localStorage.getItem('CR_TOKEN');
    const socket = socketio('http://localhost:3333', {
      query: {
        token: tk,
      },
    });

    socket.on('message', async (data: Message) => {
      if (partner?._id === data.from._id) {
        try {
          await api.patch(
            `/messages?method=read&messageId=${data._id}`,
            {},
            {
              headers: { authorization: `Bearer ${tk}` },
            }
          );
          _setMessages([...messages, data]);
          console.table(
            messageBodyRef?.current?.scrollTop,
            messageBodyRef?.current?.scrollHeight
          );
          // if (
          //   messageBodyRef.current &&
          //   messageBodyRef.current.scrollTop >
          //     messageBodyRef.current.scrollHeight - 100
          // ) {
          //   messageBodyRef.current.scrollTop =
          //     messageBodyRef.current.scrollHeight;
          // }
        } catch (error) {
          console.log(error);
        }
      } else {
        let notify = document.querySelector(`#msg-${data.from._id}`);

        if (notify) {
          notify.classList.add('message-received');
        }
      }

      if (recents.find((value: Partner) => value._id === data.from._id)) {
        let arr: Partner[] = recents;
        arr.splice(
          arr
            .map((value) => (value as Partner)._id)
            .indexOf(data.from._id as string),
          1
        );
        setRecents([{ ...data.from }, ...arr]);
      } else {
        setRecents((state) => [{ ...data.from }, ...state]);
      }
    });

    socket.on('readMessage', (data: Message) => {
      if (Array.isArray(data)) {
        _setMessages(data);
      } else {
        let arr: Message[] = messages;

        arr.forEach((value: Message) => {
          if (value._id === data._id) {
            value.wasReaded = true;
          }
        });

        _setMessages(arr);
      }
    });

    socket.on('deleteMessage', (data: Message) => {
      let arr: Message[] = messages;

      arr.forEach((value: Message) => {
        if (value._id === data._id) {
          value.content = data.content;
          value.deleted = true;
        }
      });

      _setMessages(arr);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner, messages, recents]);

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

  async function loadMessages(user: Partner) {
    if (user._id === partner?._id) return;

    try {
      setPartner({ ...user });
      const response: AxiosResponse<Message[]> = await api.get(
        `/message/list?recipient=${user._id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      let notify = document.querySelector(`#recent-${user._id}`);

      if (notify) {
        if (notify.classList.contains('message-received')) {
          notify.classList.remove('message-received');
        }
      }

      _setMessages(response.data);
      setMessageLoading(false);

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
        let date = new Date().toISOString();
        let message: Message = {
          content: messageContent,
          from: user as Partner,
          to: partner as Partner,
          wasReaded: false,
          createdAt: date,
          deleted: false,
          notSent: true,
        };

        _setMessages([...messages, message]);
        setMessageContent('');

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

        if (response.data) {
          let msgArr = messages.filter((value) => value.notSent !== true);
          _setMessages([...msgArr, response.data]);
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
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // const loadMoreMessages = _.debounce(async () => {
  //   if (messageBodyRef.current) {
  //     if (messageBodyRef.current.scrollTop <= 300) {
  //       try {
  //         page.current++;
  //         const response: AxiosResponse<Message[]> = await api.get(
  //           `/message/list?recipient=${partner?._id}&page=${page.current}`,
  //           {
  //             headers: { authorization: `Bearer ${token}` },
  //           }
  //         );

  //         _setMessages([...response.data, ...messages]);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  // }, 100);

  if (loading) {
    return (
      <Container>
        <div className="loading">
          <Loader />
        </div>
      </Container>
    );
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
                  <span>
                    {suggestions[0] ? 'Suggestions' : 'No suggestions'}
                  </span>
                </li>
                {suggestions.map((value: any) => (
                  <li
                    className="result"
                    key={value._id}
                    onMouseDown={() => loadMessages(value)}
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
                    className={
                      value._id === partner?._id ? 'recents active' : 'recents'
                    }
                    onClick={() => loadMessages(value)}
                    key={value._id}
                  >
                    <h4>{value.name}</h4>
                    <span>{value.email}</span>
                    <div className="" id={`recent-${value._id}`}></div>
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
            {partner?._id && messageLoading && (
              <div className="welcome">
                <Loader />
              </div>
            )}
            {partner?._id && !messageLoading && (
              <>
                <div
                  className="messages"
                  ref={messageBodyRef}
                  // onScroll={loadMoreMessages}
                >
                  {showContext && (
                    <ContextMenuModal
                      show={showContext}
                      x={coordinates.x}
                      y={coordinates.y}
                      message={contextMessage}
                      messages={messages}
                      setMessages={_setMessages}
                      onMoreInfo={() => {}}
                    />
                  )}
                  {!messages[0] && (
                    <div className="no-messages">
                      <p>No messages</p>
                    </div>
                  )}

                  {messages.map((value: any, index: number) =>
                    value.from._id === partner?._id ? (
                      <div className="received" key={value._id || index}>
                        <div>
                          <p className={value.deleted ? 'excluded' : undefined}>
                            {value.deleted
                              ? 'That message has been deleted.'
                              : value.content}
                          </p>
                          {!value.deleted && <span>{value.formattedDate}</span>}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={value._id ? 'sent' : 'sent not-sent'}
                        key={value._id || index}
                      >
                        <div>
                          <p
                            className={value.deleted ? 'excluded' : undefined}
                            onContextMenu={(event: any) =>
                              openContextMenu(event, value)
                            }
                          >
                            {value.deleted
                              ? 'This message has been deleted.'
                              : value.content}
                          </p>
                          {!value.deleted && (
                            <span>
                              {value.formattedDate}
                              {value.notSent ? (
                                <FiClock size={11} color="#333" />
                              ) : !value.wasReaded ? (
                                <FiEyeOff size={11} color="#333" />
                              ) : (
                                <FiEye size={11} color="#333" />
                              )}
                            </span>
                          )}
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
            )}
            {!partner && (
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
