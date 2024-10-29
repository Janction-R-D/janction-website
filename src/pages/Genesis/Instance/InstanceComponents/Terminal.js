// XtermComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import WebSocketClient from '@/utils/websocket';
import { Terminal } from '@xterm/xterm';

const XtermComponent = (props) => {
  const { visible, onCancel, socketData, clientRef, terminalRef } = props;

  const xterm = useRef(null); // 终端实例的引用
  const currentInput = useRef(''); // 用于存储当前输入的命令

  useEffect(() => {
    // 创建一个 xterm 实例
    xterm.current = new Terminal();
    xterm.current.open(terminalRef.current); // 在终端容器中挂载
    xterm.current.focus();
    // 初始提示符
    xterm.current.write('$ ');

    // 监听用户输入
    xterm.current.onData((data) => {
      const code = data.charCodeAt(0);
      console.log(data);
      // 回车键（Enter）
      if (code === 13) {
        handleCommand(currentInput.current);
        currentInput.current = '';
      }
      // 退格键（Backspace）
      else if (code === 127) {
        if (currentInput.current.length > 0) {
          currentInput.current = currentInput.current.slice(0, -1);
          xterm.current.write('\b \b'); // 删除字符
        }
      }
      // 其他字符
      else {
        currentInput.current += data;
        xterm.current.write(data);
      }
    });

    // 清理终端实例
    return () => {
      xterm.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (!socketData) return;
    if (!xterm.current) return;
    console.log('『socketData』', socketData);
    xterm.current.write(`\r\n${socketData.data}\r\n`);
    xterm.current.write('$ ');
  }, [socketData]);

  // 处理输入的命令
  const handleCommand = (command) => {
    let commandStr = command.trim();
    let msg = { operation: 'stdin', data: commandStr };
    console.log('『clientRef.current』', clientRef.current);
    clientRef.current.client.onsend(`${JSON.stringify(msg)}`);
  };

  return (
    <Modal visible={visible} onCancel={onCancel} width={800}>
      <div
        ref={terminalRef}
        style={{ width: '100%', height: '400px', backgroundColor: 'black' }}
      />
    </Modal>
  );
};

function Window({ visible, setVisible }) {
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
export default Window;
