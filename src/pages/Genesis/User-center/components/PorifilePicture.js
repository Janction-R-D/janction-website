import { avatar } from '@/utils/lang';
import { Button, Modal, Tooltip } from 'antd';
import { useModel } from 'umi';
import { useAccount } from 'wagmi';
import AvatarUpload from './AvatarUpload';
import styles from './modal.less';
import { useState } from 'react';
import { AvatarModal } from './AvatarModal';
import UploadModal from './UploadImage/UploadModal';

export default function PorifilePicture() {
  const { avatarSnapUrl, setAvatarSnapUrl } = useModel('common');
  const [showModal, setShowModal] = useState(false);
  const { address } = useAccount();
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <div className={styles['avatar-upload']}>
      {/* <AvatarUpload onChange={setAvatarSnapUrl}> */}
      <div className={styles['user-profile']}>
        <Tooltip
          onClick={handleClick}
          popupVisible={showModal == true ? false : 'auto'}
          title="You can click if you want to change your profile picture"
        >
          <i
            className={['iconfont icon-edit', styles['edit-float']].join(' ')}
          ></i>
          <img
            src={avatarSnapUrl || avatar(address)}
            className={styles['user-profile-img']}
          />
        </Tooltip>
        {/* <AvatarModal
          setShowModal={setShowModal}
          showModal={showModal}
          avatar={avatar}
          handleClick={handleClick}
          address={address}
        /> */}
        <UploadModal
          avModalOpen={showModal}
          handleOk={handleClick}
          setAvModaOpen={setShowModal}
          address={address}
          avatar={avatar}
        />
        <span className={styles['check-float']}>
          <i className="iconfont icon-certified"></i>
        </span>
      </div>
      {/* </AvatarUpload> */}
    </div>
  );
}
