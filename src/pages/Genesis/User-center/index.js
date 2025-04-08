import { fetchUserCenter, sendImageToServer } from '@/services/genesis';
import { Button, message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import EditName from './components/EditName';
import EmailVerify from './components/EmailVerify';
import PorifilePicture from './components/PorifilePicture';
import SocialLink from './components/SocialLink';
import UserAssets from './components/UserAssets';
import styles from './index.less';
import UploadModal from './components/UploadImage/UploadModal';

export default function UserAccount() {
  const { userName, setUserName, userInfo } = useModel('common');

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

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
      console.log('『error』', error)
    }
  };

  return (
    <form encType="multipart/form-data">
      <h1 className={styles['title']}>Personal information</h1>
      <section className={styles['banner']}>
        <div className={styles['banner-img']}>
          <img src="/account.png" className={styles['img']} />
        </div>

        <PorifilePicture />
      </section>
      <article className={styles['user-info']}>
        <div className={styles['edit-name']}>
          <h2>{userName}</h2>
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
        <div>
          <p className={styles['address-id']}>
            ID:{' '}
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
            <p>E-mail: {userInfo?.email || '-'} </p>
            <span onClick={handleVerify}>
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
        <Button className={styles['create-btn']} type="primary">
          <span>
            <i className="iconfont icon-secured"></i>
          </span>
          Authentication
        </Button>
      </article>
      <SocialLink />
      <UserAssets data={userInfo} />
    </form>
  );
}
