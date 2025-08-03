import gift2 from '@/assets/images/genesis/gift-invitation.png';
import gift from '@/assets/images/genesis/img-invite.png';
import InvitedUser from '@/pages/Root/components/InvitedUser';
import { copy } from '@/utils/lang';
import { Badge, Button, message, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useModel, useIntl, FormattedMessage } from 'umi';
import { useAccount } from 'wagmi';
import styles from './index.less';

const Invitation = (props) => {
  const [visible, setVisible] = useState(false);
  const [invitedUserVisible, setInvitedUserVisible] = useState(false);
  const { code, mineInviteData, getMineCode } = useModel('common');
  const { address } = useAccount();
  const intl = useIntl();

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
      message.warning(intl.formatMessage({ id: 'invitation.getCodeWarning' }));
      return;
    }
    copy(link);
    message.success(intl.formatMessage({ id: 'invitation.copySuccess' }));
  };

  const onInvitersView = () => {
    setInvitedUserVisible(true);
  };
  useEffect(() => {
    getMineCode();
  }, []);

  return (
    <>
      <div className={styles['invite-box']}>
        {code && (
          <div className="df ai_c gap10">
            <Badge
              count={mineInviteData?.invites_number || 0}
              offset={[-115, 0]}
              color="#EE385C"
            >
              <div className={styles['invite-btn']}>
                <Button className={styles['button']} onClick={handleOk}>
                  <FormattedMessage id="invitation.invite" />
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
                <FormattedMessage id="invitation.inviterSetting" />
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
            <h1>
              <FormattedMessage id="invitation.title" />
            </h1>
            <p className={styles['desc']}>
              <p>
                <FormattedMessage id="invitation.desc1" />
              </p>
              <p>
                <FormattedMessage id="invitation.desc2" />
              </p>
            </p>
            <div className={styles['invite-box']}>
              <div className={styles['invite-box-info']}>
                <p>
                  <FormattedMessage id="invitation.inviteLink" /> {link}
                </p>
                <p>
                  <FormattedMessage id="invitation.inviteCode" /> {code}
                </p>
              </div>
              <span className={styles['invite-box-button']} onClick={onCopy}>
                <i className="iconfont icon-copy"></i>
              </span>
            </div>

            <p className={styles['desc']}>
              <FormattedMessage id="copyDescription" /> {code}
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
