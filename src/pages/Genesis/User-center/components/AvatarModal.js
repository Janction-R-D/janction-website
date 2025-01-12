import AvatarUpload from './AvatarUpload';
import { Button, Modal } from 'antd';
import { useModel } from 'umi';
import { useAccount } from 'wagmi';
import styles from './avatarModal.less';
export function AvatarModal({ handleClick, avatar, setShowModal, showModal }) {
  const { avatarSnapUrl, setAvatarSnapUrl } = useModel('common');
  const { address } = useAccount();
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <Modal
      onOk={handleClick}
      open={showModal}
      onCancel={handleCancel}
      footer={false}
      className={styles['modal-avatar']}
      closable={false}
    >
      <div>
        <img
          src={avatarSnapUrl || avatar(address)}
          className={styles['user-profile-img']}
        />
      </div>
      <AvatarUpload
        onChange={setAvatarSnapUrl}
        className={styles['button-box']}
      >
        <Button>Edit</Button>
      </AvatarUpload>
      <div className={styles['close-box']} onClick={handleCancel}>
        <i className="iconfont icon-close"></i>
      </div>
    </Modal>
  );
}
