import React from 'react';
import { Collapse } from 'antd';
import styles from './faq.less';
import { useIntl } from 'umi';

const { Panel } = Collapse;

const questions = [
  {
    questionId: 'faq.q1.question',
    answerId: 'faq.q1.answer',
  },
  {
    questionId: 'faq.q2.question',
    answerId: 'faq.q2.answer',
  },
  {
    questionId: 'faq.q3.question',
    answerId: 'faq.q3.answer',
  },
  {
    questionId: 'faq.q4.question',
    answerId: 'faq.q4.answer',
  },
  {
    questionId: 'faq.q5.question',
    answerId: 'faq.q5.answer',
  },
];

const Faq = () => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.left}>
        <div>
          <div className={styles.title}>
            {intl.formatMessage({ id: 'faq.title' })}
          </div>
          <div className={styles.subtitle}>
            {intl.formatMessage({ id: 'faq.subtitle' })}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Collapse defaultActiveKey={['0']} ghost>
          {questions.map((item, index) => (
            <Panel
              header={intl.formatMessage({ id: item.questionId })}
              key={index.toString()}
            >
              {intl.formatMessage({ id: item.answerId })}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default Faq;
