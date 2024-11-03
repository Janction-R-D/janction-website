import gift from '@/assets/images/genesis/gift.png';
import { fetchInviteLink, fetchInviteSend } from '@/services/genesis';
import { copy } from '@/utils/lang';
import { GiftOutlined } from '@ant-design/icons';
import { Input, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import reg from '@/utils/reg';

const Invite = (props) => {
  const [inviteLink, setInviteLink] = useState();
  const [email, setEmail] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getLink();
  }, []);

  const getLink = async () => {
    try {
      const res = await fetchInviteLink();
      setInviteLink(res);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const onInvite = async () => {
    try {
      const flag = reg.email.test(email);
      if (!flag) {
        message.warning('Please enter the correct email address!');
        return;
      }
      await fetchInviteSend({ email });
      message.success('Email sent successfully!');
      setVisible(false);
      setEmail();
    } catch (error) {
      console.log('『error』', error);
    }
  };

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
                value={email}
                prefix={<i className="iconfont icon-email" />}
                placeholder="Enter email addresses"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className={styles['tip']}>
              *Only certain users can accept your invitation.
            </p>
            <a href="">View Terms and Conditions.</a>
            <div className={styles['invite']} onClick={onInvite}>
              <span>invite</span>
            </div>
            <div className={styles['footer']}>
              <div
                className={[styles['item'], styles['copy']].join(' ')}
                onClick={() => {
                  copy(inviteLink);
                }}
              >
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
