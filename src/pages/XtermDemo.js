// XtermComponent.js
import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { Terminal } from '@xterm/xterm';

const XtermComponent = (props) => {
  const { visible, onCancel, socketData } = props;
  const terminalRef = useRef(null); // 终端容器的引用
  const xterm = useRef(null); // 终端实例的引用
  const currentInput = useRef(''); // 用于存储当前输入的命令

  useEffect(() => {
    // 创建一个 xterm 实例
    xterm.current = new Terminal();
    xterm.current.open(terminalRef.current); // 在终端容器中挂载

    // 初始提示符
    xterm.current.write('$ ');

    // 监听用户输入
    xterm.current.onData((data) => {
      const code = data.charCodeAt(0);

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
    xterm.current.write(JSON.stringify(socketData));
  }, [socketData]);

  // 处理输入的命令
  const handleCommand = (command) => {
    switch (command.trim()) {
      case 'help':
        xterm.current.write(
          '\r\nAvailable commands: help, clear, echo [text]\r\n',
        );
        break;
      case 'clear':
        xterm.current.clear();
        break;
      default:
        if (command.startsWith('echo ')) {
          xterm.current.write(`\r\n${command.slice(5)}\r\n`);
        } else {
          xterm.current.write(`\r\nCommand not found: ${command}\r\n`);
        }
        break;
    }
    xterm.current.write('$ ');
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

export default XtermComponent;
