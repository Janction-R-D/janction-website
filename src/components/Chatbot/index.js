import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './index.less';
import aiImage from '@/assets/images/genesis/ai.png';
import { history, useIntl, useModel } from 'umi';
import { fetchChatSee } from '@/services/genesis/agents';
import { extractDataLines, saveMessagesToStorage } from '@/utils/lang';

const defaultResponses = [
  {
    keywords: ['Hello', 'Hey', 'Good Morning'],
    response: 'Hello , welcome to Janction ChatBot!! How can i help you?',
  },
  {
    keywords: ['deploy'],
    response: 'You can follow the quick start guide in our documentation.',
    link: '/genesis/deployNode',
  },
  {
    keywords: ['my nodes', 'check', 'info'],
    response: 'You can click on "My Nodes" to view them.',
    link: '/genesis/nodes',
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
  {
    keywords: ['Bill', 'Billing'],
    response: 'You can redirect to your Billings info by clicking here.',
    link: '/genesis/billDetails',
  },
];

const ChatBot = ({ fold }) => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const typingInterval = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { isLessee } = initialState;
  const intl = useIntl();
  const initianMessages = [
    {
      from: 'bot',
      text: intl.formatMessage({ id: 'text1' }),
      onNavigate: () => {
        console.log('object');
        if (isLessee) {
          setInitialState({
            ...initialState,
            isLessee: !isLessee,
          });
        }
        setVisible(false);
        history.push('/genesis/deployNode');
      },
    },
    {
      from: 'bot',
      text: intl.formatMessage({ id: 'text2' }),
      onNavigate: () => {
        if (isLessee) {
          setInitialState({
            ...initialState,
            isLessee: !isLessee,
          });
        }
        setVisible(false);
        history.push('/genesis/nodes');
      },
    },
    {
      from: 'bot',
      text: intl.formatMessage({ id: 'text3' }),
      onNavigate: () => {
        setInitialState({
          ...initialState,
          isLessee: true,
        });

        setTimeout(() => {
          setVisible(false);
          history.push('/genesis/purchase');
        }, 500);
      },
    },
  ];

  const handleSend = async () => {
    const trimmed = input.trim();
    if (isTyping || loading) return;
    if (!trimmed) return;
    setInput('');
    const allMessages = [...messages];
    try {
      setLoading(true);
      const userMessage = { text: trimmed, from: 'user' };
      setMessages((prev) => [
        ...prev,
        userMessage,
        { from: 'bot', waiting: true },
      ]);

      const payload = { message: trimmed };
      const sendSms = await fetchChatSee(payload);
      const newMessage = extractDataLines(sendSms);
      console.log(newMessage);
      const botMessage = { text: newMessage, from: 'bot' };
      setMessages((prev) => prev.filter((m) => !m.waiting));
      allMessages.push(userMessage);
      if (!newMessage) return;
      allMessages.push(botMessage);
      saveMessagesToStorage('janction-dashboard', allMessages);
      simulateTyping(newMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const simulateTyping = (message) => {
    setIsTyping(true);
    const response =
      typeof message === 'string' ? message : message.text || message.answer;
    const link = message.link || null;

    let currentText = '';
    let index = 0;

    // Limpiar intervalo anterior si existía
    if (typingInterval.current) clearInterval(typingInterval.current);

    typingInterval.current = setInterval(() => {
      if (index < response.length) {
        currentText += response[index];
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.from === 'bot' && last.typing) {
            // Actualiza el texto del mensaje "typing"
            return [
              ...prev.slice(0, -1),
              { ...last, text: currentText, typing: true, link },
            ];
          } else {
            // Añade un nuevo mensaje con typing=true
            return [
              ...prev,
              { from: 'bot', text: currentText, typing: true, link },
            ];
          }
        });
        index++;
      } else {
        clearInterval(typingInterval.current);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { from: 'bot', text: response, link };
          return updated;
        });
        setIsTyping(false);
      }
    }, 20);
  };

  const handleOk = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        className={`${styles['item-Ai']} ${
          fold ? styles['item-Ai-folded-box'] : ''
        } `}
        onClick={handleOk}
      >
        <span className={`  ${fold ? styles['item-Ai-folded'] : ''}`}>
          Janction
        </span>
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
              {intl.formatMessage({ id: 'janction.ai.ask' })}:
            </p>
            {initianMessages.map((msg, i) => {
              return (
                <div
                  key={i}
                  className={styles.botMsg}
                  onClick={() => {
                    msg.onNavigate();
                  }}
                >
                  <div className={styles.messageText}>
                    {msg.text}
                    {/* {msg.link && !msg.typing && (
                      <span
                        className={styles.link}
                        style={{
                          color: 'skyblue',
                          textDecoration: 'underline',
                        }}
                      >
                        Here
                      </span>
                    )} */}
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
                    {/* {msg.link && !msg.typing && (
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
                    )} */}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <Input
              placeholder={intl.formatMessage({ id: 'chat.placeholder' })}
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
