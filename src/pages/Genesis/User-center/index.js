import React, { useContext, useEffect, useState } from 'react';
import { Button, Tooltip, Card, Input, Select } from 'antd';
import styles from './index.less';
import BindEmail from './components/BindEmail';

import {
  fetchBindEmail,
  deleteKeysUserCenter,
  fetchUserCenter,
  fetchUserKeys,
  postKeyUserData,
  sendImageToServer,
} from '@/services/genesis';
import JanctionTip from '@/components/JanctionTip';
import PorifilePicture from './components/PorifilePicture';
import RefreshToken from './components/RefreshToken';
import TokenModal from './components/RefreshToken';
import AuthName from './components/AuthName';
import EditName from './components/EditName';
import EmailVerify from './components/EmailVerify';
import GenesisContext from '@/layouts/Context/GenesisContext';
import EmailConfig from './components/EmailConfig';

export default function UserAccount() {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [key, setKey] = useState({});

  // const [imgUrl, setImgUrl] = useState('/profile.png');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isEmailConfigOpen, setIsEmailConfigOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [name, setName] = useState('');
  const { imgUrl, setImgUrl } = useContext(GenesisContext);
  const showTokenModal = () => {
    setIsTokenModalOpen(true);
  };
  const onEditName = () => {
    setIsNameModalOpen(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const getUserCenterData = () => {
    return fetchUserCenter()
      .then((res) => {
        setData(res || {});
        if (res.icon !== '') {
          setImgUrl(res.icon || './profile.png');
        }
        if (res.name !== '') {
          setName(res.name || 'Unknow');
        }
      })
      .catch((err) => setError(true))
      .finally(() => {
        setTimeout(() => {
          setError(false);
        }, 1500);
      });
  };
  // const getUserKeysData = () => {
  //   return fetchUserKeys()
  //     .then((res) => {
  //       console.log(res);

  //     })
  //     .catch((err) => setError(true));
  // };
  useEffect(() => {
    getUserCenterData();

    // getUserKeysData();
  }, [isEmailModalOpen, isNameModalOpen, isEmailConfigOpen]);

  // const getUserInfo = async () => {
  //   try {
  //     const res = await fetchUserInfo();
  //     setUserInfo(res);
  //   } catch (error) {
  //     console.log('『error』', error);
  //   }
  // };

  const onEditEmail = () => {
    setVisible(true);
  };

  const handleDelete = (key) => {
    const data = {
      id: key,
    };
    deleteKeysUserCenter(data)
      .then((res) => {
        getUserKeysData();
        // const filtered = keys.filter((item) => item.name !== data.name);
        // setKeys(filtered);
        console.log('Succeded :  Key Deleted successfully');
      })
      .catch((err) => console.log(err));
  };
  const onGenerate = () => {
    setKey({ key: 1234567891234566 });
  };
  const onDelete = () => {
    setKey({});
  };
  const handleVerify = () => {
    setIsEmailConfigOpen(true);
  };
  function convertToFormData(info) {
    const formData = new FormData();

    Object.entries(info).forEach(([key, value]) => {
      if (
        key === 'icon' &&
        typeof value === 'string' &&
        value.startsWith('data:image')
      ) {
        const base64 = value.split(',')[1];
        const blob = new Blob([atob(base64)], { type: 'image/png' });
        formData.append(key, blob, 'icon.png');
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    console.log(formData);
    return formData;
  }

  const handleSave = () => {
    const info = {
      icon: imgUrl,
      name: name,
      asstes: {
        ...data.assets,
      },
    };
    const formData = convertToFormData(info);
    console.log(formData.get('icon'));
    sendImageToServer(JSON.stringify(info))
      .then((res) => {
        console.log(res);
        getUserCenterData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form encType="multipart/form-data">
      <h1 className={styles['title']}>Personal information</h1>
      <section className={styles['banner']}>
        <div className={styles['banner-img']}>
          <img src="/account.png" className={styles['img']} />
        </div>
        <div className={styles['user-profile']}>
          <Tooltip title="You can click if you want to change your profile picture">
            <span className={styles['edit-float']} onClick={showModal}>
              <i className="iconfont icon-edit"></i>
            </span>
            <img src={imgUrl} className={styles['user-profile-img']} />
          </Tooltip>
          <span className={styles['check-float']}>
            <i className="iconfont icon-certified"></i>
          </span>
        </div>

        <PorifilePicture
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          setImgUrl={setImgUrl}
          imgUrl={imgUrl}
        />
      </section>
      <article className={styles['user-info']}>
        <div className={styles['edit-name']}>
          <h2>{name}</h2>
          <span onClick={onEditName}>Edit</span>
          <EditName
            isNameModalOpen={isNameModalOpen}
            setIsNameModalOpen={setIsNameModalOpen}
            name={name}
            setName={setName}
          />
          <EmailConfig
            isEmailConfigOpen={isEmailConfigOpen}
            setIsEmailConfigOpen={setIsEmailConfigOpen}
          />
        </div>
        <div>
          <p>ID: {data?.id}</p>
          <p>Registration date: {data?.registered_at?.split('T')[0]}</p>

          <div className={styles['edit-info']}>
            <p>E-mail: {data?.email || '-'} </p>
            <span onClick={handleVerify}>
              {data?.email !== '' ? 'Bind' : 'Bind'}
            </span>
          </div>
        </div>
        <Button className={styles['create-btn']} type="primary">
          <span>
            <i className="iconfont icon-secured"></i>
          </span>{' '}
          Real name authentication
        </Button>
        <EmailVerify
          isEmailModalOpen={isEmailModalOpen}
          setIsEmailModalOpen={setIsEmailModalOpen}
          data={data}
        />
      </article>
      {/* <AuthName data={data} /> */}
      {/* <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Access Token</h3>
        </section>
        <section className={styles['card-security']}>
          <article>
            <p>
              Access Token You can use the Access Token feature to manage the
              credentials you curate. This includes amending/replacing/removing
              items. In the future, Galxe will support the use of Access Tokens
              to manage campaigns, NFT metadata, and so much more.
            </p>
            <span className={styles['text-blue']}>
              Learn More detail about access token and how to update credentials
              with GraphQL API.
            </span>
          </article>
          <section className={styles['token-container']}>
            {key?.key ? (
              <div className={styles['token-box']}>
                <p>123456789123456</p>
                <div>
                  <i
                    className="iconfont icon-refresh"
                    onClick={showTokenModal}
                  ></i>
                  <i className="iconfont icon-delete" onClick={onDelete}></i>
                </div>
              </div>
            ) : (
              <Button
                className={styles['btn-transparent']}
                onClick={onGenerate}
              >
                Generate
              </Button>
            )}

            <TokenModal
              isTokenModalOpen={isTokenModalOpen}
              setIsTokenModalOpen={setIsTokenModalOpen}
            />
          </section>
          {key.key && (
            <p className={styles['text-red']}>
              The current access token is only displayed once, please keep it
              well, if it is lost, it cannot be retrieved
            </p>
          )}
        </section>
      </Card> */}
      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Pledge your assets</h3>
          <JanctionTip title="Bet your empty currency to earn rewards and help maintain network security." />
        </section>
        <section className={styles['card-assets-items']}>
          <div>
            <p>Quantity pledged (ETH)</p>
            <section className={styles['card-assets-input']}>
              <p> {data?.assets?.amount}</p>
              <span>ETH</span>
            </section>
          </div>
          <div>
            <p>Quantity pledged (ETH)</p>
            <section className={styles['card-assets-input']}>
              {data.assets?.duration_months}{' '}
              {data.assets?.duration_months > 1 ? 'Months' : 'Month'}
            </section>
          </div>
          <div>
            <p>Anticipated income</p>
            <section className={styles['card-assets-input']}>
              <p>{data?.assets?.anticipated_income}</p>
              <span>ETH</span>
            </section>
          </div>
        </section>
      </Card>
      <Button
        className={styles['create-btn']}
        style={{ paddingInline: '28px' }}
        onClick={handleSave}
        type="submit"
      >
        Save
      </Button>
    </form>
  );
}
