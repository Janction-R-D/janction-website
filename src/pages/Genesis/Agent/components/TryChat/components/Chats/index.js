import { useState } from 'react';
import styles from './index.less';
import { Button, Divider, Input } from 'antd';
import imgAi from '@/assets/images/genesis/agent/agent_1.png';
import PurchaseCard from './PurchaseCard';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      text: `Hello, I am your exclusive web3 knowledge base\n1. Can you ask me what web3 is?\n2. What can web3 do?\n3. How to quickly understand web3?`,
      sender: 'bot',
    },
  ]);

  const [input, setInput] = useState('');
  const [limit, setLimit] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const sendMessage = () => {
    const trimmed = input.trim();
    if (limit >= 2) return;
    if (!trimmed) return;

    const userMessage = { text: trimmed, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = {
        text: `You said: "${trimmed}"`,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
    setLimit(limit + 1);
  };

  return (
    <main className={styles['web3-chat-container']}>
      <div className={styles['chat-history']}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageWrapper} ${
              msg.sender === 'user' ? styles.end : styles.start
            }`}
          >
            {msg.sender === 'bot' && (
              <img className={styles.avatar} src={imgAi} alt="ai" />
            )}
            <div
              className={`${styles.message} ${
                msg.sender === 'user' ? styles.end : styles.start
              }`}
            >
              {msg.text.split('\n').map((line, i) => (
                <div key={i} className={styles.sms}>
                  <div>{line}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles['input-bar']}>
        <Input
          className={styles['input-box']}
          type="text"
          placeholder={'Send a message to FinChjat AI'}
          value={input}
          onPressEnter={sendMessage}
          onChange={(e) => setInput(e.target.value)}
          suffix={
            <Button className={styles['send-button']} onClick={onOpen}>
              {limit < 2 && (
                <>
                  Free ({limit}/2){' '}
                  <Divider type="vertical" className={styles.divider} />{' '}
                </>
              )}
              Buy
              <i className="iconfont icon-purchase" />
            </Button>
          }
        />
      </div>
      <PurchaseCard onOpen={onOpen} isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
};

export default Chat;
