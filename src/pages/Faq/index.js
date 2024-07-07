import styles from './index.less';
import { useState } from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const Faq = (props) => {
  const [questionList, setQuestionList] = useState([
    {
      title:
        'How Janction Efficiently Stores AI/ML Models for Different Users？',
      answer:
        'This is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answer',
    },
    {
      title:
        "Compared to traditional cloud GPU platforms, how does Janction's distributed idle GPU computing power solution ensure price advantages and provide stable and reliable computing power services?",
      answer:
        'This is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answer',
    },
    {
      title:
        'How does Janction ensure the efficiency and quality of data annotation for various data types with different formats and standards?',
      answer:
        'This is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answer',
    },
    {
      title:
        "How does Janction's execution layer handle the various AI subdomain functionalities?",
      answer:
        'This is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answer',
    },
    {
      title: 'How does Janction select and use different DAs?',
      answer:
        'This is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answer',
    },
    {
      title:
        'Is Janction considering adopting the security guarantees provided by Restaking?',
      answer:
        'This is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answer',
    },
    {
      title: 'How will Janction consider airdropping to the community?',
      answer:
        'This is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answerThis is the answer',
    },
  ]);

  return (
    <div className={styles['faq-container']}>
      <div className={styles['about-us']}>
        <h1>About Us</h1>
        <div className={styles['info']}>
          <img
            src={require('@/assets/images/faq/renderings.png')}
            alt=""
            width={253}
          />
          <section>
            <p>
              Our Telegram @Janction ,  email need_help@janction.io. Our
              Telegram @Janction ,  email need_help@janction.io. Our Telegram
              @Janction ,  email need_help@janction.io. Our Our Telegram
              @Janction ,  email need_help@janction.io. Our
            </p>
          </section>
        </div>
      </div>
      <div className={styles['bottom']}>
        <div className={styles['faq']}>
          <div className={styles['left-divider']}>
            <img src={require('@/assets/svgs/divider.svg')} alt="" />
          </div>
          <div>
            <h1>FAQ</h1>
            <img src={require('@/assets/images/icons/logo.png')} alt="" />
          </div>
          <div className={styles['right-divider']}>
            <img src={require('@/assets/svgs/divider.svg')} alt="" />
          </div>
        </div>
        <div className={styles['list']}>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
              <div
                className={`${styles['expand-icon']} ${
                  isActive && styles['active-expand-icon']
                }`}
              >
                <img src={require('@/assets/svgs/expand.svg')} alt="" />
              </div>
            )}
            expandIconPosition="end"
            className="site-collapse-custom-collapse"
          >
            {questionList.map((item) => (
              <Panel header={item.title} key={item.title}>
                <p>{item.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Faq;
