import React, { useRef, useContext } from 'react';

import { Modal } from './styles';

import { FiTrash, FiInfo, FiCopy } from 'react-icons/fi';
import api from '../../services/api';
import { Message } from '../../pages/Chat';
import { UserContext } from '../../context/UserContext';

const ContextMenuModal: React.FC<{
  show: boolean;
  x?: number;
  y?: number;
  onMoreInfo: Function;
  message: Partial<Message>;
  messages: Partial<Message[]>;
  setMessages(message: Message[]): void;
}> = (props) => {
  const modalRef = useRef<HTMLUListElement>(null);
  const liRef = useRef(null);

  const { token } = useContext(UserContext);

  let coordinates = { x: props.x, y: props.y };

  function handleCopy() {
    let elem: any = document.createElement('textarea');
    if (elem) {
      document.body.appendChild(elem);
      elem.value = props.message.content;
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);
    }
  }

  async function handleDeleteAMessage() {
    try {
      await api.patch(
        `/messages?method=delete&messageId=${props.message._id}`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      let arr: any = props.messages;

      arr.forEach((value: Message) => {
        if (value._id === props.message._id) {
          value.deleted = true;
        }
      });

      props.setMessages(arr);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal coordinates={coordinates} id="context-modal" ref={modalRef}>
      <li id="context-menu" ref={liRef} onClick={handleCopy}>
        <FiCopy size={18} color="#333" />
        <span>Copy message</span>
      </li>
      <li id="context-menu" onClick={handleDeleteAMessage}>
        <FiTrash size={18} color="#333" />
        <span>Delete message</span>
      </li>
      <li id="context-menu" onClick={() => props.onMoreInfo(true)}>
        <FiInfo size={18} color="#333" />
        <span>More info</span>
      </li>
    </Modal>
  );
};

export default ContextMenuModal;
