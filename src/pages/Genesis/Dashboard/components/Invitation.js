import gift from '@/assets/images/genesis/img-invite.png';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import reg from '@/utils/reg';

const Invitation = (props) => {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <div className={styles['invite-box']} onClick={handleOk}>
        <Button className={styles['create-btn']}>Invite</Button>
      </div>
      <div className={styles['invite-wrapper']}>
        {visible && (
          <Modal
            onOk={handleOk}
            open={visible}
            onCancel={handleCancel}
            width={510}
            footer={null}
            className={styles['invite-modal']}
          >
            <div className={styles['invite-modal-content']}>
              <img src={gift} alt="" />
              <h1>Invite your friends with your referral code !</h1>
              <p className={styles['desc']}>
                <p>
                  Directly purchase deployed Janction mining machine nodes to
                  share more profits！
                </p>{' '}
                <p>
                  Currently holding Janction Landlord NFT to participate in the
                  computing power provider network！
                </p>
              </p>
              <div className={styles['invite-box']}>
                <div className={styles['invite-box-info']}>
                  <p>
                    邀请链接：https://janction.ioStartInterviewAIjanction.io
                  </p>
                  <p>邀请码：212-235-642-244</p>
                </div>
                <span className={styles['invite-box-button']}>
                  <i className="iconfont icon-copy"></i>
                </span>
              </div>

              <p className={styles['desc']}>
                Copy the invitation code and link with one click to get your
                rewards to your account quickly.
              </p>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Invitation;
