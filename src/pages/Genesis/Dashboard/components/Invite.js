import { GiftOutlined, MailOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import gift from '@/assets/images/genesis/gift.png';

const Invite = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles['invite-wrapper']}>
      <div
        className={styles['invite-btn']}
        onClick={() => {
          setVisible(true);
        }}
      >
        <GiftOutlined />
      </div>
      {visible && (
        <Modal
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          width={510}
          footer={null}
          className={styles['invite-modal']}
        >
          <div className={styles['invite-modal-content']}>
            <img src={gift} alt="" />
            <h1>Give a friend the gift of the free ceypto</h1>
            <p className={styles['desc']}>
              Invite a friend to Coinbase and you'll both receive $10 in
              freeBitcoin when they buy or sell their first $100 on crypto
              trade!
            </p>
            <div className={styles['email']}>
              <Input
                prefix={<i className="iconfont icon-email" />}
                placeholder="Enter email addresses"
              />
            </div>
            <p className={styles['tip']}>
              *Only certain users can accept your invitation.
            </p>
            <a href="">View Terms and Conditions.</a>
            <div className={styles['invite']}>
              <span>invite</span>
            </div>
            <div className={styles['footer']}>
              <div className={[styles['item'], styles['copy']].join(' ')}>
                <div className={styles['icon']}>
                  <i className="iconfont icon-copy"></i>
                </div>
                <span>Copy Link</span>
              </div>
              <div className={[styles['item'], styles['share']].join(' ')}>
                <div className={styles['icon']}>
                  <i className="iconfont icon-link"></i>
                </div>
                <span>Share</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Invite;
