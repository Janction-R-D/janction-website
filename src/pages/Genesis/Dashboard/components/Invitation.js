import gift from '@/assets/images/genesis/img-invite.png';
import gift2 from '@/assets/images/genesis/gift-invitation.png';
import { Button, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import reg from '@/utils/reg';
import { fetchMineInviteCode } from '@/services/genesis/distribution';
import { copy } from '@/utils/lang';

const Invitation = (props) => {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState();

  useEffect(() => {
    if (!visible) return;
    getMineCode();
  }, [visible]);
  const getMineCode = async () => {
    try {
      const res = await fetchMineInviteCode();
      console.log('『res』', res);
      setCode(res?.code);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const link = useMemo(() => {
    const origin = location.origin;
    return `${origin}/home?inviterCode=${code}`;
  }, [code]);

  const handleOk = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const onCopy = () => {
    copy(link);
  };

  return (
    <>
      <div className={styles['invite-box']}>
        <Button className={styles['buy-btn']} onClick={handleOk}>
          Invite
        </Button>
        <picture>
          <img src={gift2} />
        </picture>
      </div>
      <div className={styles['invite-wrapper']}>
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
                <p>Invite Link：{link}</p>
                <p>Invite Code：{code}</p>
              </div>
              <span className={styles['invite-box-button']} onClick={onCopy}>
                <i className="iconfont icon-copy"></i>
              </span>
            </div>

            <p className={styles['desc']}>
              Copy the Invitation link and link with one click to get your
              rewards to your account quickly.
            </p>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Invitation;
