import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Card, Input, Select } from 'antd';
import styles from './index.less';
import BindEmail from './components/BindEmail';
import {
  deleteKeysUserCenter,
  fetchUserCenter,
  fetchUserKeys,
  postKeyUserData,
} from '../../../services/genesis/instance';
import JanctionTip from '@/components/JanctionTip';
import PorifilePicture from './components/PorifilePicture';

export default function UserAccount() {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(null);
  const [keys, setKeys] = useState([]);
  const [imgUrl, setImgUrl] = useState('/profile.png');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        console.log(res);
      })
      .catch((err) => setError(true))
      .finally(() => {
        setTimeout(() => {
          setError(false);
        }, 1500);
      });
  };
  const getUserKeysData = () => {
    return fetchUserKeys()
      .then((res) => {
        console.log(res);
        setKeys(res || []);
      })
      .catch((err) => setError(true));
  };
  useEffect(() => {
    getUserCenterData();
    getUserKeysData();
  }, []);

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
  const handleAdd = (name) => {
    console.log(name);
    if (!name) return;
    const data = { name };
    postKeyUserData(data)
      .then((res) => {
        getUserKeysData();
        setKey(undefined);
        const newKeys = [...keys, { name }];
        setKeys(newKeys);
        console.log('Succeded :  Key created successfully');
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <h1 className={styles['title']}>Personal information</h1>
      <section className={styles['banner']}>
        <div className={styles['banner-img']}>
          <img src="/account.png" className={styles['img']} />
        </div>
        <div className={styles['user-profile']} onClick={showModal}>
          <Tooltip title="You can click if you want to change your profile picture">
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
        <h2>Naila</h2>
        <div>
          <p>ID: {data?.id}</p>
          <p>Registration date: {data?.registered_at?.split('T')[0]}</p>
          <p>ID: 26378192</p>
          <div className={styles['edit-info']}>
            <p>E-mail: {data?.email} </p>
            <span onClick={onEditEmail}>Edit</span>
          </div>
        </div>
        {/* <Button className={styles['create-btn']} type="primary">
          <span>
            <i className="iconfont icon-secured"></i>
          </span>{' '}
          Real name authentication
        </Button> */}
      </article>
      {/* <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Real name authentication</h3>
        </section>
        <main className={styles['card-content']}>
          <ul>
            <ol>
              <li>
                <p>Account type:</p>{' '}
                <span>{data?.real_name_auth?.account_type}</span>
              </li>
              <li>
                <p>Legal person document type:</p>
                <span>{data?.real_name_auth?.corporate_name}</span>
              </li>
              <li>
                <p>The name of firm :</p>
                <span>{data?.real_name_auth?.the_name_of_firm}</span>
              </li>
            </ol>
            <ol>
              <li>
                <p>Authentication status:</p>
                <span className={styles['text-blue-certified']}>
                  <p>{data?.real_name_auth?.authentication_status}</p>
                  <i className="iconfont icon-certified"></i>
                </span>
              </li>
              <li>
                <p>Legal person document type:</p>
                <span>{data?.real_name_auth?.legal_person_document_type}</span>
              </li>
              <li>
                <p>Enterprise type: </p>
                <span>{data?.real_name_auth?.enterprise_type}</span>
              </li>
            </ol>
            <ol>
              <li>
                <p>Authentication time: </p>{' '}
                <span>
                  {data?.real_name_auth?.authentication_time.split('T')[0]}
                </span>
              </li>
              <li>
                <p>Authentication email:</p>
                <span>{data?.real_name_auth?.authentication_email}</span>
              </li>
              <li>
                <p>Organization code: </p>
                <span>{data?.real_name_auth?.organization_code}</span>
              </li>
            </ol>
          </ul>
        </main>
      </Card> */}
      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Security settings</h3>
        </section>
        <section className={styles['card-security']}>
          <span>My private key</span>
          <div className={styles['card-security-items']}>
            <div className={styles['add-btn']}>
              <Input
                bordered={false}
                placeholder="Please enter name"
                onPressEnter={() => handleAdd(key)}
                prefix={
                  <i
                    className="iconfont icon-add add-key"
                    style={{
                      color: '#73d5f4',
                      fontSize: '1.1rem',
                      marginRight: '8px',
                    }}
                    onClick={() => handleAdd(key)}
                  ></i>
                }
                onChange={(e) => setKey(e.target.value)}
                value={key}
              />
              {/* <i className="iconfont icon-add" onClick={() => handleAdd()}></i>
              <span>Please enter name</span> */}
            </div>
            <ul className={styles['card-security-keys']}>
              {keys?.map((item) => {
                return (
                  <div className={styles['card-security-key']} key={item.id}>
                    <div>
                      <p>{item.name}</p>
                      <span>{item.private_key}</span>
                    </div>
                    <span
                      className={styles['icon-red']}
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="iconfont icon-delete "></i>
                    </span>
                  </div>
                );
              })}
            </ul>
          </div>
        </section>
      </Card>
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
      <BindEmail
        visible={visible}
        onCancel={() => setVisible(false)}
        userInfo={data}
      />
    </main>
  );
}
