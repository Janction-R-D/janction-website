// XtermComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import styles from './index.less';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';

const baseUrl = process.env.JANCTION_SOCKET_API;

const TerminalModal = (props) => {
  const { visible, onCancel, resource_id } = props;
  const pingIntervalRef = useRef(null);
  const xterm = useRef(null); // 终端实例的引用
  const clientRef = useRef(null);
  const terminalRef = useRef(null); // 终端容器的引用
  const fitAddon = useRef(new FitAddon());
  const [isFullScreen, setIsFullScreen] = useState(false);

  let conn;

  useEffect(() => {
    initXterm();
    connectWebSocket();
    return () => {
      conn.close();
      clearInterval(pingIntervalRef.current);
      xterm.current.dispose();
    };
  }, []);

  const scrollToBottom = () => {
    const terminalElement = terminalRef.current;
    if (terminalElement) {
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }
  };

  const initXterm = () => {
    xterm.current = new Terminal({
      cursorBlink: true,
      fontSize: '14px',
      letterSpacing: '0.5px',
      lineHeight: '20px',
      rows: 500,
      allowTransparency: true,
      rightClickSelectsWord: true,
    });
    xterm.current.loadAddon(fitAddon.current);
    xterm.current.open(terminalRef.current);
    fitAddon.current.fit();
    xterm.current.write(`Connecting to pod resource_id：${resource_id}...`);

    // 监听终端数据写入事件
    xterm.current.onData(() => {
      setTimeout(scrollToBottom, 300);
    });

    xterm.current.onKey((event) => {
      if (event.key === '\x03' && xterm.current.hasSelection()) {
        const selectedText = xterm.current.getSelection();
        navigator.clipboard
          .writeText(selectedText)
          .then(() => {
            console.log('Text copied to clipboard');
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
          });
      }
    });

    // Terminal events
    xterm.current.onData((data) => {
      const msg = JSON.stringify({ operation: 'stdin', data });
      conn.send(msg);
    });

    xterm.current.onResize((size) => {
      const resizeMsg = JSON.stringify({
        operation: 'resize',
        cols: size.cols,
        rows: size.rows,
      });
      conn.send(resizeMsg);
    });
  };

  // Connect to WebSocket
  const connectWebSocket = () => {
    if (clientRef.current) return;
    let url = `${baseUrl}/v0/resource/shell?resource_id=${resource_id}`;
    conn = new WebSocket(url);

    // Event listeners
    conn.onopen = () => {
      xterm.current.write('\r');
      const initMsg = JSON.stringify({
        operation: 'stdin',
        data: 'export TERM=xterm && clear \r',
      });
      conn.send(initMsg);
      fitAddon.current.fit();
      xterm.current.focus();

      // keep connection for 30s
      pingIntervalRef.current = setInterval(() => {
        if (conn.readyState === WebSocket.OPEN) {
          const pingMsg = JSON.stringify({ operation: 'ping' }); // Formato esperado
          conn.send(pingMsg);
        }
      }, 30000); // each 30 segundos
    };

    conn.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.operation === 'stdout') {
        xterm.current.write(msg.data);
        setTimeout(scrollToBottom, 300);
      } else {
        console.log('Invalid msg operation:', msg);
      }
    };

    conn.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
        );
      } else {
        console.log('[close] Connection died');
        xterm.current.writeln('');
      }
      xterm.current.write('Connection Reset By Peer! Try Reopen.');
    };

    conn.onerror = (error) => {
      try {
        xterm.current.write('Error: ' + error.message);
        xterm.current.destroy();
      } catch (err) {
        console.log('『err』', err);
      }
    };
  };

  const handleTerminalClick = () => {
    if (xterm.current) {
      xterm.current.focus();
    }
  };

  const onFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Modal
      // title={
      //   <div className="full-screen">
      //     {!isFullScreen && <ArrowsAltOutlined onClick={onFullScreen} />}
      //     {isFullScreen && <ShrinkOutlined onClick={onFullScreen} />}
      //   </div>
      // }
      visible={visible}
      onCancel={onCancel}
      width={isFullScreen ? '100vw' : 800}
      maskClosable={false}
      footer={null}
      forceRender
      centered
      className={styles['terminal-modal']}
      bodyStyle={{ height: isFullScreen ? '100vh' : 520 }}
    >
      <div
        ref={terminalRef}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        onClick={handleTerminalClick}
      />
    </Modal>
  );
};

export default TerminalModal;
