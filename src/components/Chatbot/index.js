import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './index.less';
import aiImage from '@/assets/images/genesis/ai.png';
import { history } from 'umi';

const defaultResponses = [
  {
    keywords: ['deploy', 'node'],
    response: 'You can follow the quick start guide in our documentation.',
    link: '/genesis/deployNode',
  },
  {
    keywords: ['my nodes', 'check', 'info'],
    response: 'You can click on "My Nodes" to view them.',
    link: '/genesis/my-nodes',
  },
  {
    keywords: ['purchase', 'buy', 'instance'],
    response: 'You can redirect to Purchase by clicking here.',
    link: '/genesis/purchase',
  },
  {
    keywords: ['resource', 'machine', 'instance'],
    response: 'You can redirect to your Instances by clicking here.',
    link: '/genesis/instance',
  },
];

const initianMessages = [
  { from: 'bot', text: 'how to quickly deploy nodes' },
  { from: 'bot', text: 'i want to check my nodes info' },
  { from: 'bot', text: 'How can i purchase an instance' },
];

const ChatBot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { from: 'user', text: trimmed };
    const lowerInput = trimmed.toLowerCase();
    const matched = defaultResponses.find(({ keywords }) =>
      keywords.some((kw) => lowerInput.includes(kw)),
    );

    const fullResponse = matched
      ? { from: 'bot', text: matched.response, link: matched.link }
      : { from: 'bot', text: "Sorry, I didn't understand that. Try again!" };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    simulateTyping(fullResponse); // 👈 Llamamos a la animación de escritura
  };
  const simulateTyping = (botMessage) => {
    setTyping(true);
    const { text, link } = botMessage;
    let currentText = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          // Reemplazamos el mensaje actual que se está escribiendo
          if (last?.from === 'bot' && last.typing) {
            return [...prev.slice(0, -1), { ...last, text: currentText }];
          } else {
            return [...prev, { from: 'bot', text: currentText, typing: true }];
          }
        });
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => {
          const updated = [...prev];
          // Remplazamos el temporal por el final completo
          updated[updated.length - 1] = { from: 'bot', text, link };
          return updated;
        });
        setTyping(false);
      }
    }, 30); // Velocidad de escritura (ms por letra)
  };

  const handleOk = () => {
    setVisible(true);
  };

  useEffect(() => {
    // Desplazar hacia arriba para ver los nuevos mensajes
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={styles['item-Ai']} onClick={handleOk}>
        <span>Janction</span>
        <div className={styles['icon']}>
          <img src={aiImage} />
        </div>
      </div>

      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        closable={false}
        className={styles.chatModal}
        width={380}
      >
        <div className={styles.chatWrapper}>
          <div className={styles.header}>
            <span>
              JANCTION <span className={styles.tag}>AI</span>
            </span>
            <span onClick={() => setVisible(false)}>
              <i className="iconfont icon-close" />
            </span>
          </div>

          <div ref={messagesContainerRef} className={styles.messages}>
            <p>
              {' '}
              <img src={aiImage} alt="Bot" className={styles.botAvatar} />
              You can ask me:
            </p>
            {initianMessages.map((msg, i) => {
              return (
                <div key={i} className={styles.botMsg}>
                  <div className={styles.messageText}>
                    {msg.text}
                    {msg.link && !msg.typing && (
                      <span
                        className={styles.link}
                        onClick={() => {
                          setVisible(false);
                          history.push(msg.link);
                        }}
                        style={{
                          color: 'skyblue',
                          textDecoration: 'underline',
                        }}
                      >
                        Here
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {messages.map((msg, i) => {
              const showBotAvatar =
                msg.from === 'bot' &&
                (i === 0 || messages[i - 1].from !== 'bot');

              return (
                <div
                  key={i}
                  className={
                    msg.from === 'user' ? styles.userMsg : styles.botMsg
                  }
                >
                  {msg.from === 'bot' && showBotAvatar && (
                    <img src={aiImage} alt="Bot" className={styles.botAvatar} />
                  )}
                  <div className={styles.messageText}>
                    {msg.text}
                    {msg.link && !msg.typing && (
                      <span
                        className={styles.link}
                        onClick={() => {
                          setVisible(false);
                          history.push(msg.link);
                        }}
                        style={{
                          color: 'skyblue',
                          textDecoration: 'underline',
                        }}
                      >
                        Here
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <Input
              placeholder="Send a message to FinChjat AI"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              className={styles.input}
              suffix={
                <SendOutlined
                  onClick={handleSend}
                  className={styles.sendIcon}
                />
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatBot;
