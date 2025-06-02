import { Modal, Rate } from 'antd';
import React, { useState } from 'react';
import image from '@/assets/images/genesis/agent/agent_1.png';
import styles from './index.less';
export default function NewInfo({ onOpen, isOpen, setIsOpen }) {
  const messages = [
    {
      time: 'Today',
      messages: [
        'Can you ask me what web3 is?',
        'Can you ask me what web3 is?',
        'Can you ask me what web3 is?',
      ],
    },
    {
      time: '2025-03-21',
      messages: [
        'Can you ask me what web3 is?',
        'Can you ask me what web3 is?',
        'Can you ask me what web3 is?',
      ],
    },
  ];
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
      closable={false}
      className={styles['news-modal']}
      footer={false}
      style={{
        top: 100, // Ajusta la distancia superior
        left: -410, // Establece la posición a la derecha
      }}
    >
      {messages.map((group, index) => (
        <div key={index}>
          <p>{group.time}</p>
          <ul>
            {group.messages.map((msg, idx) => (
              <li key={idx}>
                <p>{msg}</p>
                <i className="iconfont icon-close" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Modal>
  );
}
