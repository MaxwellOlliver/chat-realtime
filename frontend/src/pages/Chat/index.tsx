import React, { useContext, useState } from 'react';

import { FiLogOut, FiSend, FiEye } from 'react-icons/fi';
import ContextMenuModal from '../../components/ContextMenuModal';

import { Container, Body, Users, Chat as ChatComponent } from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const Chat: React.FC = () => {
  const [showContext, setShowContext] = useState(false);
  const [coordinates, setCoordinates] = useState<{ x?: number; y?: number }>(
    {}
  );
  const { selectedTheme } = useContext<any>(ThemeContext);

  function openContextMenu(e: MouseEvent, message: any) {
    e.preventDefault();
    let coords = { x: e.clientX, y: e.clientY };

    setCoordinates(coords);
    setShowContext(true);
  }

  function closeContext(e: Event) {
    console.log(e);
  }

  return (
    <Container theme={selectedTheme}>
      <div>
        <header>
          <h1>RealTime</h1>
          <FiLogOut color="#333" size={16} />
        </header>
        <Body>
          <Users></Users>
          <ChatComponent theme={selectedTheme}>
            <div className="messages">
              {showContext && (
                <ContextMenuModal
                  show={showContext}
                  x={coordinates.x}
                  y={coordinates.y}
                  message={{}}
                />
              )}

              <div className="sent">
                <div>
                  <p onContextMenu={(event: any) => openContextMenu(event, {})}>
                    Ola Maria
                  </p>
                  <span>
                    <FiEye size={11} color="#333" /> Hoje às 22:34
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
              <input
                type="text"
                name="message-bar"
                id="message-bar"
                placeholder="Type your message..."
              />
              <button id="send-message">
                <FiSend color="#fff" size={20} />
              </button>
            </div>
          </ChatComponent>
        </Body>
      </div>
    </Container>
  );
};

export default Chat;
