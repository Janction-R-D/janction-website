import React, { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import './index.less';
import styles from './index.less';
import StepButton from '../StepButton';
import AgentCardThumb from '../AgentThumb/AgentThumb';

const ShareCard = ({ onClose }) => {
  const mock = {
    id: 1,
    name: 'FinChat AI',
    image: require('@/assets/images/genesis/agent/agent_1.png'),
    score: 9.9,
    popularity: 1200,
    recommended: true,
    tags: ['AI Assistant', 'Intelligent reply'],
  };

  const [monthPrice, setMonthPrice] = useState('');
  const [permanentPrice, setPermanentPrice] = useState('');

  const handleShare = () => {
    console.log('Month Price:', monthPrice);
    console.log('Permanent Price:', permanentPrice);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseCircleOutlined style={{ fontSize: '24px', color: '#fff' }} />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.shareContent}>
            <div className="text_large text_wrapper_large">
              Share your AI agent with the Knowledge base Repo
            </div>
            <div>
              <div className="text_medium padding_small">Price</div>
            </div>
            <div>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.shareInput}
                  placeholder={'Enter'}
                  value={monthPrice}
                  onChange={(e) => setMonthPrice(e.target.value)}
                />
                <span className={styles.charCount}>ustd</span>
                <span className={styles.inputTitle}>1 Month</span>
              </div>

              <div className={styles.inputWrapper}>
                <input
                  className={styles.shareInput}
                  placeholder="Enter"
                  value={permanentPrice}
                  onChange={(e) => setPermanentPrice(e.target.value)}
                />
                <span className={styles.charCount}>ustd</span>
                <span className={styles.inputTitle}>Permanent</span>
              </div>
            </div>
            <div>
              <StepButton
                text="Share"
                padding={[12, 48]}
                onClick={handleShare}
              />
            </div>
          </div>
          <div className={styles.shareGoodsThumb}>
            <AgentCardThumb key={mock.id} {...mock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
