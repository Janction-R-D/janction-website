import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import styles from './index.less';
import aiImage from '@/assets/images/genesis/ai.png';
import userImage from '@/assets/images/icons/logo.png';
import { ALL_QA, typeMessage } from '@/utils/lang';
import {
  chineseChar,
  extractDataLines,
  loadMessagesFromStorage,
  saveMessagesToStorage,
} from '@/utils/lang';
import { fetchChatSee } from '@/services/genesis/agents';
const STORAGE_KEY = 'janction_chat_messages';
const ChatModal = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const typingInterval = useRef(null);

  useEffect(() => {
    const savedMessages = loadMessagesFromStorage('janction');

    if (savedMessages?.length === 0) {
      setMessages([
        {
          text: '👋 Hi! I’m here to help you with any questions you have. Feel free to ask me anything.',
          from: 'bot',
        },
      ]);
    } else {
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
      const botMessage = { text: newMessage, from: 'bot' };
      setMessages((prev) => prev.filter((m) => !m.waiting));
      allMessages.push(userMessage);
      if (!newMessage) return;
      allMessages.push(botMessage);
      saveMessagesToStorage('janction', allMessages);
      simulateTyping(newMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const findBestMatch = (inputText) => {
    const lowerInput = inputText.toLowerCase();

    for (const item of ALL_QA) {
      const q = item.question.toLowerCase();
      if (
        q === lowerInput ||
        q.includes(lowerInput) ||
        lowerInput.includes(q)
      ) {
        return item;
      }
    }

    const inputWords = lowerInput.split(/\s+/).filter(Boolean);
    if (inputWords.length < 2) return null;

    for (const item of ALL_QA) {
      const qWords = item.question.toLowerCase().split(/\s+/).filter(Boolean);
      const matches = qWords.filter((word) => inputWords.includes(word));
      if (matches.length >= 2) {
        return item;
      }
    }

    return null;
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
    }, 30);
  };

  return (
    <Modal
      open={open}
      title="Chat with Janction AI"
      footer={null}
      onCancel={onClose}
      width={600}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
      className={styles.modal}
    >
      <div className={styles.chatWrapper}>
        <div className={styles.chatBox}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.messageRow} ${
                msg.from === 'user' ? styles.userRow : styles.botRow
              }`}
            >
              {msg.from === 'bot' && !msg.waiting && (
                <img src={aiImage} className={styles.avatar} alt="bot" />
              )}
              {msg.from === 'user' && (
                <img src={userImage} className={styles.avatar} alt="user" />
              )}

              {msg.waiting ? (
                <div className={styles.bubble}>
                  <div className={styles.pulseDot}></div>
                </div>
              ) : (
                <div className={styles.bubble}>
                  {msg.text?.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping &&
            (messages.length === 0 ||
              messages[messages.length - 1]?.from !== 'bot' ||
              messages[messages.length - 1]?.text === '') && (
              <div className={`${styles.messageRow} ${styles.botRow} `}>
                <img src={aiImage} className={styles.avatar} alt="bot" />
                <div className={styles.bubble}>
                  <Spin size="small" /> Typing...
                </div>
              </div>
            )}

          <div ref={bottomRef} />
        </div>
        <div className={styles.inputBox}>
          <Input
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            autoFocus
          />
          <Button type="primary" onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
