import storage from '@/utils/storage';
import { message } from 'antd';
import { history } from 'umi';
import is from './is';
import dayjs from 'dayjs';
import { DATE_FORMAT_TYPE } from './datetime';
import { isNaN, isNumber } from 'lodash';
import { STORAGE_KEY } from '@/constant';

export const isEmpty = (value) => {
  if (empty(value)) return true;
  if (is.isArray(value)) return value.length == 0;
  if (is.isObject(value)) return Object.keys(value).length == 0;
  return false;
};

export const empty = (value) => {
  return value === undefined || value === null || value === '';
};

/**
 * 退出登录
 */
export const logout = () => {
  storage.clear();
  history.push('/login');
};
export function convertMBtoGB(mb) {
  if (empty(mb)) return '~';
  const gb = mb / 1024; // 1 GB = 1024 MB
  if (gb >= 1) {
    return `${gb.toFixed(2)} GB`; // 保留两位小数
  } else {
    return `${mb} MB`; // 直接返回MB格式
  }
}
export const showValue = (value, fixed) => {
  if (empty(value)) return '~';
  if (empty(fixed)) {
    return value;
  }
  if (isNaN(value)) {
    return value;
  }
  const numStr = Number(value).toFixed(fixed);
  if (Number(numStr) == 0) return 0;
  return numStr;
};

export const showDate = (value, format = DATE_FORMAT_TYPE.YMD) => {
  if (empty(value)) return '~';
  return dayjs(value).format(format);
};

function copyTextFallback(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    message.success('Copied!');
  } catch (err) {
    console.error('Copied failed', err);
  }
  document.body.removeChild(textarea);
}
export const expires = 60 * 60 * 10 * 1000;
// copy text
export const copy = (text) => {
  if (!navigator?.clipboard?.writeText) {
    copyTextFallback(text);
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success('Copied!');
    })
    .catch((err) => {
      console.error('Copied failed', err);
    });
};

export const renderBackgroudImg = (img) => {
  return {
    backgroundImage: `url(${img})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  };
};
export const renderBackgroudImgMobile = (img) => {
  return {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: '70% 40%',
    backgroundRepeat: 'no-repeat',
  };
};
// Determine whether it is a JSON string
export const isJSON = (str) => {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
};

export function generateTempId() {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
}

export function updateArray(
  array,
  action,
  { data, index = array.length, identifierKey = 'id', identifierValue } = {},
) {
  let newArray = [...array];

  switch (action) {
    case 'add':
      newArray.splice(index, 0, data);
      break;

    case 'delete':
      newArray = newArray.filter(
        (item) => item[identifierKey] !== identifierValue,
      );
      break;

    case 'update':
      newArray = newArray.map((item) => {
        if (item[identifierKey] === identifierValue) {
          return { ...item, ...data };
        }
        return item;
      });
      break;

    default:
      console.warn('Unsupported action type');
  }

  return newArray;
}

export const getNodeStatusMatch = ({ status_str, operating_status_str }) => {
  // 已挂载且已出租
  let isActive = status_str === 'online' && operating_status_str == 'leased';
  // 已挂载但未出租
  let isListed = status_str === 'online' && operating_status_str == 'leisure';
  // 未挂载
  let isRunning = status_str === 'online' && !isActive && !isListed;
  // 离线
  let isOffLine = status_str !== 'online';
  return { isActive, isListed, isRunning, isOffLine };
};

export function capitalizeFirstLetter(string) {
  return string.replace(/^\w/, (c) => c.toUpperCase());
}

export function avatar(address) {
  return `${process.env.JANCTION_BASE_API}/v0/user/avatar/${address}`;
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const convertKB = (kb, decimalPlaces = 2) => {
  if (!isNumber(kb) || isNaN(kb) || kb < 0) {
    return '--';
  }
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  let value = kb;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index++;
  }

  return value.toFixed(decimalPlaces) + ' ' + units[index];
};

export const links = [
  {
    operatingSystem: 'windows',
    appLink:
      'https://assets.janction.ai/app-release/win/x64/JanctionApp+2.0.14.exe',
  },

  {
    operatingSystem: 'macos',
    appLink:
      'https://assets.janction.ai/app-release/mac/arm64/JanctionApp-2.0.14-arm64.dmg',
  },
  {
    operatingSystem: 'linux',
    appLink: 'https://assets.janction.ai/bin/JanctionApp-1.0.0.AppImage',
  },
];

export function loadMessagesFromStorage(agentId) {
  try {
    const saved = storage.get(STORAGE_KEY);
    if (!saved) return [];

    const allChats = Array.isArray(saved) ? saved : [];
    const found = allChats.find((chat) => chat.agent_id === agentId);
    return found?.messages || [];
  } catch (error) {
    console.error('Error parsing stored messages:', error);
    return [];
  }
}

export function saveMessagesToStorage(agentId, newMessages) {
  try {
    const saved = storage.get(STORAGE_KEY);
    const allChats = Array.isArray(saved) ? saved : [];

    const updated = allChats.filter((chat) => chat.agent_id !== agentId);
    updated.push({
      agent_id: agentId,
      messages: newMessages,
    });

    storage.set({
      name: STORAGE_KEY,
      value: updated,
    });
  } catch (e) {
    console.error('Error saving messages:', e);
  }
}
export function chineseChar(sms) {
  return /[\u4E00-\u9FFF]/.test(sms);
}
export function extractDataLines(rawText) {
  return rawText
    .split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => {
      const jsonStr = line.replace('data:', '').trim();
      try {
        const parsed = JSON.parse(jsonStr);
        return parsed.content || '';
      } catch (err) {
        return '';
      }
    })
    .join('');
}

export const typeMessage = (text) => {
  setIsTyping(true);
  let i = 0;
  let currentText = '';
  const interval = setInterval(() => {
    currentText += text[i];
    i++;
    if (i === text.length) {
      clearInterval(interval);
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => !m.typing);
        return [...withoutTyping, { text, sender: 'bot' }];
      });
      setIsTyping(false);
    } else {
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => !m.typing);
        return [
          ...withoutTyping,
          { text: currentText, sender: 'bot', typing: true },
        ];
      });
    }
  }, 10);
};
export const ALL_QA = [
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
