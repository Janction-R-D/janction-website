// XtermComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import styles from './index.less';

const baseUrl = process.env.JANCTION_SOCKET_API;

const TerminalModal = (props) => {
  const { visible, onCancel, resource_id } = props;

  const xterm = useRef(null); // 终端实例的引用
  const clientRef = useRef(null);
  const terminalRef = useRef(null); // 终端容器的引用
  const fitAddon = useRef(new FitAddon());

  let conn;

  useEffect(() => {
    initXterm();
    connectWebSocket();
    return () => {
      conn.close();
      xterm.current.dispose();
    };
  }, []);
  const initXterm = () => {
    xterm.current = new Terminal({
      cursorBlink: true,
      fontSize: '14px',
      letterSpacing: '0.5px',
      lineHeight: '20px',
    });
    xterm.current.loadAddon(fitAddon.current);
    xterm.current.open(terminalRef.current);
    fitAddon.current.fit();
    xterm.current.write(`Connecting to pod resource_id：${resource_id}...`);

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
    };

    conn.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.operation === 'stdout') {
        xterm.current.write(msg.data);
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

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={800}
      maskClosable={false}
      footer={null}
      forceRender
      className={styles['terminal-modal']}
    >
      <div ref={terminalRef} style={{ width: '100%', height: '520px' }} />
    </Modal>
  );
};

export default TerminalModal;
