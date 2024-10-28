import { useEffect, useRef, useState } from 'react';
import WebSocketClient from '@/utils/websocket';
import { Button } from 'antd';
import XtermComponent from './XtermDemo';

const websocketTest = (props) => {
  const clientRef = useRef();
  const terminalRef = useRef(null); // 终端容器的引用
  const [visible, setVisible] = useState(false);
  const [socketData, setSocketData] = useState();

  useEffect(() => {
    getSocketData();
    return () => {
      disconnectWebSocket();
    };
  }, []);

  // Connect and close websocket
  const getSocketData = () => {
    if (clientRef.current) return;
    connectWebSocket();
  };

  // Connect to WebSocket
  const connectWebSocket = () => {
    clientRef.current = new WebSocketClient(
      'ws://18.181.196.49:8080/v0/resource/shell?resource_id=2178f72b-9d53-4f9a-99bd-07f29a795cef',
      '',
      (data) => receiveMessage(data),
      (c) => {
        c.onsend({
          'x-user-id': '6d5b03ae-6205-417d-8749-5ac1f40fac07',
        });
      },
    );
  };

  // Processing socket data
  const receiveMessage = (socketData) => {
    setSocketData(socketData);
  };

  // Close WebSocket
  const disconnectWebSocket = () => {
    if (!client.current) return;
    client.current.disconnect();
    client.current = null;
  };

  const onTerminal = () => {
    // 创建一个 xterm 实例
    setVisible(true);
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <Button onClick={onTerminal}>terminal</Button>
      {visible && (
        <XtermComponent
          visible={visible}
          socketData={socketData}
          onCancel={() => {
            setVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default websocketTest;
