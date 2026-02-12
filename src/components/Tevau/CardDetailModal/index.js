import React from 'react';
import { Drawer, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.less';
import cardDetailBg from '@/assets/images/tevau/cardDetailBg.png';

const CardDetailModal = ({ visible, onBack }) => {
  return (
    <Drawer
      open={visible}
      placement="bottom"
      closable={false}
      onClose={onBack}
      className={styles['detail-drawer']}
      destroyOnClose
    >
      <div
        className={styles['detail-drawer-content']}
        style={{ backgroundImage: `url(${cardDetailBg})` }}
      >
        <div className={styles['detail-drawer-header']}>
          <Button
            type="link"
            className={styles['detail-back-btn']}
            onClick={onBack}
          >
            <LeftOutlined />
            <span>Back</span>
          </Button>
          <span className={styles['detail-header-divider']} />
          <span className={styles['detail-drawer-title']}>Card Details</span>
        </div>

        <div className={styles['detail-drawer-body']}>
          <div className={styles['detail-card-left']}>
            <div className={styles['detail-card-image-wrap']}>
              <img
                src={require('@/assets/images/tevau/jctCardNormal.png')}
                alt="Card"
                className={styles['detail-card-image']}
              />
              <span className={styles['detail-card-number']}>
                5834 3456 8996 9666
              </span>
            </div>
          </div>

          <div className={styles['detail-info-panel']}>
            <div className={styles['detail-limit-label']}>Limit :</div>
            <div className={styles['detail-limit-value']}>
              <span className={styles['detail-amount']}>2000.00</span>
              <span className={styles['detail-currency']}>JYP</span>
            </div>

            <div className={styles['detail-divider']} />
            <div className={styles['detail-row']}>
              <span className={styles['detail-key']}>Card holder :</span>
              <span className={styles['detail-value']}>Ethan</span>
            </div>
            <div className={styles['detail-divider']} />
            <div className={styles['detail-row']}>
              <span className={styles['detail-key']}>Card Number :</span>
              <span className={styles['detail-value']}>
                1234 2235 2343 2345
              </span>
            </div>
            <div className={styles['detail-divider']} />
            <div className={styles['detail-row']}>
              <span className={styles['detail-key']}>Phone Number :</span>
              <span className={styles['detail-value']}>+86 22345657735</span>
            </div>
            <div className={styles['detail-divider']} />
            <div className={styles['detail-row']}>
              <span className={styles['detail-key']}>Email :</span>
              <span className={styles['detail-value']}>liyiaff@Gmail.com</span>
            </div>
            <div className={styles['detail-divider']} />
            <div className={styles['detail-row']}>
              <span className={styles['detail-key']}>Country/Region :</span>
              <span className={styles['detail-value']}>china</span>
            </div>
            <div className={styles['detail-divider']} />
            <div className={styles['detail-row']}>
              <span className={styles['detail-key']}>Date of Birth :</span>
              <span className={styles['detail-value']}>December 1, 1998</span>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CardDetailModal;
