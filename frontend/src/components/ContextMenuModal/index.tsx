import React, { useRef } from 'react';

import { Modal } from './styles';

import { FiTrash, FiInfo, FiCopy } from 'react-icons/fi';
import api from '../../services/api';

const ContextMenuModal: React.FC<{
  show: boolean;
  x?: number;
  y?: number;
  onMoreInfo: Function;
  message: { _id: string };
}> = (props) => {
  const modalRef = useRef<HTMLUListElement>(null);
  const liRef = useRef(null);

  let coordinates = { x: props.x, y: props.y };

  function handleCopy() {
    let text: any = document.getElementById('content-1');
    let elem: any = document.createElement('textarea');
    if (text && elem) {
      document.body.appendChild(elem);
      elem.value = text.innerText;
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);
    }
  }

  async function handleDeleteAMessage() {
    // try {
    //   await api.put('/messages?method=delete', {
    //     headers: { msgId: props.message._id },
    //   });
    // } catch (error) {
    //   cpuUsage.log(error);
    // }
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
