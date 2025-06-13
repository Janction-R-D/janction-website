import { useState } from 'react';
import styles from './index.less';
import { Button, Divider, Input } from 'antd';
import imgAi from '@/assets/images/genesis/agent/agent_1.png';
import PurchaseCard from './PurchaseCard';
import { fetchChat } from '@/services/genesis/agents';

const Chat = ({ id }) => {
  const [messages, setMessages] = useState([
    {
      text: `Hello, I am your exclusive web3 knowledge base\n1. Can you ask me what web3 is?\n2. What can web3 do?\n3. How to quickly understand web3?`,
      sender: 'bot',
    },
  ]);

  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const sendMessage = async () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    const userMessage = { text: trimmed, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const payload = { message: trimmed };
    const sendSms = await fetchChat(id, payload);
    console.log(sendSms);
    setInput('');

    // setTimeout(() => {
    //   const botResponse = {
    //     text: `You said: "${trimmed}"`,
    //     sender: 'bot',
    //   };
    //   setMessages((prev) => [...prev, botResponse]);
    // }, 800);
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
            <Button className={styles['send-button']} onClick={sendMessage}>
              Send <i className="iconfont icon-telegram" />
            </Button>
          }
        />
      </div>
      {/* <PurchaseCard onOpen={onOpen} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </main>
  );
};

export default Chat;
