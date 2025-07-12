import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
import { fetchChat } from '@/services/genesis/agents';
import {
  chineseChar,
  extractDataLines,
  loadMessagesFromStorage,
  saveMessagesToStorage,
  typeMessage,
} from '@/utils/lang';

const Chat = ({ agent }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    const savedMessages = loadMessagesFromStorage(agent.id);

    if (savedMessages?.length === 0) {
      setMessages([
        {
          text: `Hello, I am your exclusive web3 knowledge base\n1. How can I help you?`,
          sender: 'bot',
        },
      ]);
    } else {
      setMessages(savedMessages);
    }
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (isTyping || loading) return;
    if (!trimmed) return;
    setInput('');
    const allMessages = [...messages];
    try {
      setLoading(true);
      const userMessage = { text: trimmed, sender: 'user' };
      setMessages((prev) => [
        ...prev,
        userMessage,
        { sender: 'bot', waiting: true },
      ]);

      const payload = { message: trimmed };
      const sendSms = await fetchChat(agent.id, payload);
      const newMessage = extractDataLines(sendSms);
      const botMessage = { text: newMessage, sender: 'bot' };
      setMessages((prev) => prev.filter((m) => !m.waiting));
      allMessages.push(userMessage);
      if (!newMessage) return;
      allMessages.push(botMessage);
      saveMessagesToStorage(agent.id, allMessages);
      typeMessage(newMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            {msg.sender === 'bot' && !msg.waiting && (
              <img className={styles.avatar} src={agent.icon} alt="ai" />
            )}
            {msg.waiting ? (
              <div className={` ${styles.start}`}>
                <div className={styles.pulseDot}></div>
              </div>
            ) : (
              <div
                className={`${styles.message} ${
                  msg.sender === 'user' ? styles.end : styles.start
                } ${msg.typing ? styles.typing : ''} ${
                  msg.text && chineseChar(msg.text) && msg.sender !== 'user'
                    ? styles.chinese
                    : ''
                }`}
              >
                {msg.text?.split('\n').map((line, i) => (
                  <div key={i} className={styles.sms}>
                    <div>{line}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles['input-bar']}>
        <Input
          className={styles['input-box']}
          type="text"
          placeholder={'Send a message to FinChat AI'}
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
    </main>
  );
};

export default Chat;
