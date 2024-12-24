import { avatar } from '@/utils/lang';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import AvatarUpload from './AvatarUpload';
import styles from './modal.less';

export default function PorifilePicture() {
  const [imgUrl, setImgUrl] = useState();

  const { address } = useAccount();

  return (
    <div className={styles['avatar-upload']}>
      <AvatarUpload onChange={setImgUrl}>
        <div className={styles['user-profile']}>
          <Tooltip title="You can click if you want to change your profile picture">
            <i
              className={['iconfont icon-edit', styles['edit-float']].join(' ')}
            ></i>
            <img
              src={imgUrl || avatar(address)}
              className={styles['user-profile-img']}
            />
          </Tooltip>
          <span className={styles['check-float']}>
            <i className="iconfont icon-certified"></i>
          </span>
        </div>
      </AvatarUpload>
    </div>
  );
}
