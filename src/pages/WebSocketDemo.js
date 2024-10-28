import { useEffect, useRef } from 'react';
import WebSocketClient from '@/utils/websocket';

const isDev = process.env.REACT_APP_ENV == 'dev';
const getProtocal = window.location.protocol;
const wsProtocol = getProtocal.indexOf('s') === -1 ? 'ws://' : 'wss://';
const socketUrl = () =>
  isDev
    ? `${wsProtocol}18.181.196.49:8080/resource/shell`
    : `${wsProtocol}${window.location.host}/resource/shell`;

const websocketTest = (props) => {
  const clientRef = useRef();

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
      socketUrl(),
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
    console.log('『socketData』', socketData);
  };

  // Close WebSocket
  const disconnectWebSocket = () => {
    if (!client.current) return;
    client.current.disconnect();
    client.current = null;
  };

  return <div>WebSocket Demo</div>;
};

export default websocketTest;
