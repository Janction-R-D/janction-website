import gift2 from '@/assets/images/genesis/gift-invitation.png';
import gift from '@/assets/images/genesis/img-invite.png';
import InvitedUser from '@/pages/Root/components/InvitedUser';
import { copy } from '@/utils/lang';
import { Badge, Button, message, Modal } from 'antd';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';
import { useAccount } from 'wagmi';
import styles from './index.less';

const Invitation = (props) => {
  const [visible, setVisible] = useState(false);
  const [invitedUserVisible, setInvitedUserVisible] = useState(false);
  const { code, mineInviteData } = useModel('common');

  const { address } = useAccount();

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
    if (!code) {
      message.warning('Please get your invitation code first!');
      return;
    }
    copy(link);
  };

  const onInvitersView = () => {
    setInvitedUserVisible(true);
  };

  return (
    <>
      <div className={styles['invite-box']}>
        <h1>Dashboard</h1>
        {code && (
          <div className="df ai_c gap10">
            <Badge
              count={mineInviteData?.invites_number || 0}
              offset={[-115, 0]}
              color="#EE385C"
            >
              <div className={styles['invite-btn']}>
                <Button className={styles['buy-btn']} onClick={handleOk}>
                  Invite
                </Button>
                <picture>
                  <img src={gift2} />
                </picture>
              </div>
            </Badge>
            {mineInviteData?.level == 1 && (
              <Button
                className={styles['setting-btn']}
                onClick={onInvitersView}
              >
                Inviter Setting
              </Button>
            )}
          </div>
        )}
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
                Currently holding Janction Lessor NFT to participate in the
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
      {invitedUserVisible && (
        <InvitedUser
          visible={invitedUserVisible}
          root={false}
          record={{ inviter_address: address }}
          onCancel={() => {
            setInvitedUserVisible(false);
          }}
        />
      )}
    </>
  );
};

export default Invitation;
