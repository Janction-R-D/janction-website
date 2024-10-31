import { useEffect, useRef, useState } from 'react';
import WebSocketClient from '@/utils/websocket';
import XtermComponent from './Terminal';

function WindowTerm({ visible, setVisible, resource_id }) {
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
      `ws://18.181.196.49:8080/v0/resource/shell?resource_id=${resource_id}`,
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
  return (
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
  );
}
export default WindowTerm;
