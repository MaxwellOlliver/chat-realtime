import React, { useEffect, useState, useRef } from 'react';

import { Modal } from './styles';

import { FiTrash, FiInfo, FiCopy } from 'react-icons/fi';

const ContextMenuModal: React.FC<{
  show: boolean;
  x?: number;
  y?: number;
  message: object;
}> = (props) => {
  const modalRef = useRef<HTMLUListElement>(null);
  const liRef = useRef(null);

  let coordinates = { x: props.x, y: props.y };

  useEffect(() => {
    if (modalRef) {
      console.log(modalRef?.current?.focus());
    }
  });

  return (
    <Modal coordinates={coordinates} id="context-modal" ref={modalRef}>
      <li id="context-menu" ref={liRef}>
        <FiCopy size={18} color="#333" />
        <span>Copy message</span>
      </li>
      <li id="context-menu">
        <FiTrash size={18} color="#333" />
        <span>Delete message</span>
      </li>
      <li id="context-menu">
        <FiInfo size={18} color="#333" />
        <span>More info</span>
      </li>
    </Modal>
  );
};

export default ContextMenuModal;
