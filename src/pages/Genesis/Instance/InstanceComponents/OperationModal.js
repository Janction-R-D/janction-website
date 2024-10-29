import React, { useEffect, useRef, useState } from 'react';
import WebSocketClient from '@/utils/websocket';
import { Card } from 'antd';
import styles from './operation.less';
import XtermComponent from './Terminal';

export default function OperationModal({ record }) {
  const [showModal, setShowModal] = useState(true);
  const [visible, setVisible] = useState(false);
  const classname = showModal
    ? styles['card-modal-show']
    : styles['card-modal'];
  const handleClick = () => {
    setShowModal(!showModal);
  };

  // terminal and websocket
  const clientRef = useRef(null);
  const terminalRef = useRef(null); // 终端容器的引用
  const [socketData, setSocketData] = useState(null);

  useEffect(() => {
    if (clientRef.current != null) return;
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, [visible]);

  // Connect to WebSocket
  const connectWebSocket = () => {
    if (clientRef.current) return;

    clientRef.current = new WebSocketClient(
      'ws://18.181.196.49:8080/v0/resource/shell?resource_id=2178f72b-9d53-4f9a-99bd-07f29a795cef',
      '',
      (data) => receiveMessage(data),
      (error) => handleError(error), // Manejador de errores opcional
    );
  };

  // Processing socket data
  const receiveMessage = (data) => {
    setSocketData(data);
  };

  // Handle WebSocket errors
  const handleError = (error) => {
    console.error('WebSocket Error:', error);
  };

  // Close WebSocket
  const disconnectWebSocket = () => {
    if (!clientRef.current) return;
    clientRef.current.disconnect();
    clientRef.current = null;
  };

  const handleConnect = () => {
    // 创建一个 xterm 实例
    setVisible(true);
  };

  return (
    <div className="ellipsis operation-modal">
      <a onClick={handleClick}>More Functions</a>
      <Card className={classname} style={{ padding: '0px' }}>
        <div className={styles['panel']}>
          <span onClick={handleConnect}>Remote connection</span>
          <span>Renewal</span>
        </div>
      </Card>
      {visible && (
        <XtermComponent
          visible={visible}
          clientRef={clientRef}
          socketData={socketData}
          terminalRef={terminalRef}
          onCancel={() => {
            setVisible(false);
            clientRef.current = null;
            terminalRef.current = null;
            socketData.current = null;
            disconnectWebSocket();
          }}
        />
      )}
    </div>
  );
}
