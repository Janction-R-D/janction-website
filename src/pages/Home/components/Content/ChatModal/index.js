import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import styles from './index.less';
import aiImage from '@/assets/images/genesis/ai.png';
import userImage from '@/assets/images/icons/logo.png';

const ALL_QA = [
  {
    question: 'hello hi hey',
    answer: 'Hello, welcome to Janction AI! How can I help you today?',
  },
  {
    question: 'what is your name who are you',
    answer:
      "I'm Janction AI, your assistant here to help you with node deployment, instance rental, and understanding how the platform works.",
  },
  {
    question: 'nice to meet you',
    answer: 'Nice to meet you too! How can I assist you today?',
  },
  {
    question: 'how are you',
    answer: "I'm just a program, but I'm here and ready to help you!",
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'After creating an account, you can start using GPU resources in as little as 10 minutes. No complicated setup is required.',
  },
  {
    question: 'What is Janction AI?',
    answer:
      'Janction is the first Layer2 to provide verifiable, synergic and scalable AI services by using smart contracts to automate machine learning and AI tasks.',
  },
  {
    question: 'How does Janction integrate AI components?',
    answer:
      'Janction integrates AI models, GPU computing power, data feeding, and data labeling into a collaborative platform for coprocessing.',
  },
  {
    question: 'What challenges does Janction address in distributed AI?',
    answer:
      'Janction focuses on resource scheduling, data acquisition, proof of workload, gaming mechanisms, privacy, and parallelization to build a trustworthy distributed AI system.',
  },
  {
    question: 'How does Janction manage resource scheduling?',
    answer:
      'Janction ensures reasonable, safe, and equitable allocation of computational, data, storage, and bandwidth resources to meet user and participant needs.',
  },
  {
    question: 'How is data acquired in Janction?',
    answer:
      'Data is acquired from multiple on-chain and off-chain sources with reasonable compensation for data providers to encourage participation.',
  },
  {
    question: 'What is Proof of Workload in Janction?',
    answer:
      'Proof of Workload is a mechanism to verify that AI computational tasks are actually performed as promised, ensuring network trust.',
  },
  {
    question: 'What roles participate in Janction’s gaming mechanism?',
    answer:
      'Data providers, data annotators, arithmetic providers, and model providers participate in a fair gaming mechanism that incentivizes completing tasks efficiently.',
  },
  {
    question: 'How does Janction protect data privacy?',
    answer:
      'Janction addresses data segregation, privacy protection, and security, while avoiding data silos during model training and inference, complying with global privacy regulations.',
  },
  {
    question: 'What parallel computing techniques does Janction use?',
    answer:
      'Janction employs data parallelism, tensor parallelism, and pipeline parallelism to optimize multi-GPU training and distributed AI computations.',
  },
  {
    question: 'What is the main focus of Janction’s AI architecture currently?',
    answer:
      'Currently, Janction mainly focuses on model inference, data acquisition, preprocessing, and building a GPU arithmetic market for collaborative AI Layer2 systems.',
  },
  {
    question: 'How does Janction simplify AI model deployment?',
    answer:
      'Janction uses microservice architecture, containerization, and standardized APIs to package algorithms and optimize deployment and runtime environments.',
  },
  {
    question: 'What is Janction’s GPU arithmetic market?',
    answer:
      'It is a marketplace that schedules idle GPU computing resources efficiently, with role models, gaming mechanisms, and pricing based on workload correlation.',
  },
  {
    question: 'How is pricing calculated?',
    answer:
      'Pay-as-you-go based on GPU usage time. Accurate second-by-second billing means no unnecessary costs.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'We operate in a nationally certified ISO27001 data center, and your data is encrypted and protected.',
  },
  {
    question: 'Do I receive technical support?',
    answer:
      'We provide 24/7 technical support in Japanese, 365 days a year. Engineers are available directly.',
  },
  {
    question: 'Are there any contract restrictions?',
    answer:
      'There is no minimum usage period. This is a pay-as-you-go service that you can use only when needed.',
  },

  // Respuestas por palabra clave
  {
    question: 'hello hi hey',
    answer: 'Hello, welcome to Janction AI! How can I help you today?',
  },
  {
    question: 'deploy',
    answer:
      'To deploy a node, you first need to log in to your account. Once logged in, you can access the deployment section from the main menu and follow the step-by-step instructions to set up your node.',
  },
  {
    question: 'my nodes check info',
    answer:
      'To view information about your nodes, please make sure you are logged in first. Then go to the "My Nodes" section from the main dashboard where you can check the details and status of your nodes.',
  },
  {
    question: 'purchase buy instance',
    answer:
      'Before purchasing or renting an instance, you need to log in to your account. After logging in, navigate to the purchase or rental section to select the type of instance you need and complete the process.',
  },
  {
    question: 'resource machine instance',
    answer:
      'To manage your instances or resources, first log in to your account. Once inside, you can go to the instances section to view, modify, or manage your available resources.',
  },
  {
    question: 'bill billing',
    answer:
      'To check your billing information, make sure you are logged in first. Then access the billing section where you can review your payments, history, and usage details.',
  },
];

const ChatModal = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const typingInterval = useRef(null);

  useEffect(() => {
    if (open) {
      setMessages([]);
      setInput('');
      setIsTyping(false);

      // Mensaje de bienvenida automático con simulación de tipeo
      setTimeout(() => {
        simulateTyping({
          from: 'bot',
          text: "Hello! I'm Janction AI. How can I help you today?",
        });
      }, 300);
    }

    // Cleanup por si cerramos antes de terminar de tipear
    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { from: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const matched = findBestMatch(trimmed);

    const fullResponse = matched
      ? { from: 'bot', text: matched.answer, link: matched.link }
      : { from: 'bot', text: "Sorry, I didn't understand that. Try again!" };

    simulateTyping(fullResponse);
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
              <img
                src={msg.from === 'user' ? userImage : aiImage}
                className={styles.avatar}
                alt={msg.from}
              />
              <div className={styles.bubble}>
                {msg.text}
                {msg.link && !msg.typing && (
                  <span
                    className={styles.link}
                    onClick={() => {
                      onClose();
                      window.location.href = msg.link;
                    }}
                  >
                    {' '}
                    Here
                  </span>
                )}
              </div>
            </div>
          ))}

          {isTyping &&
            (messages.length === 0 ||
              messages[messages.length - 1]?.from !== 'bot' ||
              messages[messages.length - 1]?.text === '') && (
              <div className={`${styles.messageRow} ${styles.botRow}`}>
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
