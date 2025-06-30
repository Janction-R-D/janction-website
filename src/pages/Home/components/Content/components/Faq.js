import React from 'react';
import { Collapse } from 'antd';
import styles from './faq.less';

const { Panel } = Collapse;

const questions = [
  {
    question: 'How long does it take to get started?',
    answer:
      'After creating an account, you can start using GPU resources in as little as 10 minutes. No complicated setup is required.',
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
];

const Faq = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.left}>
        <div>
          <div className={styles.title}>FAQ</div>
          <div className={styles.subtitle}>I will answer your question</div>
        </div>
      </div>
      <div className={styles.right}>
        <Collapse defaultActiveKey={['0']} ghost>
          {questions.map((item, index) => (
            <Panel header={item.question} key={index.toString()}>
              {item.answer}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default Faq;
