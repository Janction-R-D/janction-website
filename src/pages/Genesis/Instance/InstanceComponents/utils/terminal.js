// 引入 xterm
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

// 创建终端实例
const terminal = new Terminal();
terminal.open(document.getElementById('terminal-container'));

// 初始化用于存储用户输入的变量
let currentInput = '';

// 定义一个命令处理函数
function handleCommand(command) {
  switch (command) {
    case 'help':
      terminal.write('\r\nAvailable commands: help, clear, echo [text]\r\n');
      break;
    case 'clear':
      terminal.clear();
      break;
    default:
      if (command.startsWith('echo ')) {
        terminal.write(`\r\n${command.slice(5)}\r\n`);
      } else {
        terminal.write(`\r\nCommand not found: ${command}\r\n`);
      }
      break;
  }
  // 提示符
  terminal.write('\r\n$ ');
}

// 监听用户输入
terminal.onData((data) => {
  const code = data.charCodeAt(0);

  // 处理回车 (Enter) 键
  if (code === 13) {
    handleCommand(currentInput.trim());
    currentInput = '';
  }
  // 处理退格 (Backspace) 键
  else if (code === 127) {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      terminal.write('\b \b');
    }
  }
  // 处理普通字符输入
  else {
    currentInput += data;
    terminal.write(data);
  }
});

// 初始提示符
terminal.write('$ ');
