import { fetchUserCenter, sendImageToServer } from '@/services/genesis';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import EditName from './components/EditName';
import EmailVerify from './components/EmailVerify';
import PorifilePicture from './components/PorifilePicture';
import SocialLink from './components/SocialLink';
import UserAssets from './components/UserAssets';
import styles from './index.less';
import UploadModal from './components/UploadImage/UploadModal';
import storage from '@/utils/storage';
import WalletLink from './components/WalletLink/WalletLink';
import BindWarning from './components/BindWarning/BindWarning';

function UserAccount() {
  const { userName, setUserName, userInfo } = useModel('common');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [bindOpen, setBindOpen] = useState(false);

  const onBinOpen = () => {
    setBindOpen(true);
  };
  const onBinClose = () => {
    setBindOpen(false);
  };
  const onEditName = () => {
    setIsNameModalOpen(true);
  };

  const handleVerify = () => {
    setIsEmailModalOpen(true);
  };

  const onNameChange = async (name) => {
    try {
      await sendImageToServer({ name });
      message.success('Update success!');
      setUserName(name);
      setIsNameModalOpen(false);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  useEffect(() => {
    const type = storage.get('SESSION_TYPE');

    if (type === 'wallet' && userInfo && !userInfo.email) {
      onBinOpen();
    }
  }, [userInfo]);

  return (
    <form encType="multipart/form-data" className={styles['form']}>
      <BindWarning onClose={onBinClose} onOk={onBinClose} open={bindOpen} />
      <p className={styles['title']}>Personal information</p>
      <section className={styles['banner']}>
        <div className={styles['banner-img']}>
          <img src="/account.png" className={styles['img']} />
        </div>

        <PorifilePicture />
      </section>
      <article className={styles['user-info']}>
        <div className={styles['edit-name']}>
          <h2 className={styles['user-name']}>{userName}</h2>
          <span onClick={onEditName}>Edit</span>
          {isNameModalOpen && (
            <EditName
              open={isNameModalOpen}
              name={userName}
              onOk={onNameChange}
              onCancel={() => {
                setIsNameModalOpen(false);
              }}
            />
          )}
        </div>
        <div className={styles['info-box']}>
          <p className={styles['address-id']}>
            Address:{' '}
            {userInfo?.id ? (
              <span
                className={styles['address-id-text']}
                data-id-prefix={userInfo?.id?.toString().slice(0, 4)}
                data-id-suffix={userInfo?.id?.toString().slice(-4)}
              >
                {userInfo?.id}
              </span>
            ) : (
              '~~'
            )}
          </p>
          <p>Registration date: {userInfo?.registered_at?.split('T')[0]}</p>

          <div className={styles['edit-info']}>
            <p className={styles['info-text']}>
              E-mail: {userInfo?.email || '-'}{' '}
            </p>
            <span onClick={handleVerify} className={styles['info-text']}>
              {userInfo?.email ? 'Update' : 'Bind'}
            </span>
            {isEmailModalOpen && (
              <EmailVerify
                open={isEmailModalOpen}
                data={userInfo}
                onCancel={() => setIsEmailModalOpen(false)}
              />
            )}
          </div>
        </div>
      </article>
      <WalletLink />
      <SocialLink />
      <UserAssets data={userInfo} />
    </form>
  );
}

UserAccount.wrappers = ['@/wrappers/auth'];
export default UserAccount;
