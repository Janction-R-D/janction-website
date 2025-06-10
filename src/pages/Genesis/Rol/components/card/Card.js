import { Card, Button, Divider, message } from 'antd';
import styles from './index.less';
import { history, useModel } from 'umi';
import storage from '@/utils/storage';
import { updateUserConfig } from '@/services/genesis';
import { useState } from 'react';

const IdentityCard = ({ card }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onIdentityChange = () => {
    storage.set({ name: 'isLessee', value: card.isLessee });
    setInitialState({
      ...initialState,
      isLessee: card.isLessee,
    });
  };
  const changeSetting = async () => {
    const payload = {
      is_old_user: true,
    };
    try {
      message.info({
        content: 'The operation is in progress, please wait...',
        key: 'loading',
        duration: 0,
      });

      const res = await updateUserConfig(payload);
    } catch (error) {
      console.log(error);
    } finally {
      message.destroy('loading');
    }
  };
  const handleClick = async () => {
    await changeSetting();
    onIdentityChange();
    history.push(card.path);
  };
  return (
    <Card className={styles['rent-node-card']} bordered={false}>
      <p className={styles['type']}>{card.title}</p>
      <div className={styles['header-text']}>{card.name}</div>
      <div className={styles['label']}>
        <Divider className={styles['divider']} />
        <p className={styles['label-desc']}>{card.description}</p>
      </div>
      <div className={styles['illustration-container']}>
        <img
          src={card.img}
          alt={`${card.type} icon`}
          className={styles['illustration']}
        />
      </div>
      <div className={styles['arrow-container']}>
        <Button
          shape="circle"
          icon={
            <div className={styles['arrow-icon']}>
              <i className="iconfont icon-next"></i>
            </div>
          }
          className={styles['arrow-btn']}
          onClick={handleClick}
        />
      </div>
    </Card>
  );
};

export default IdentityCard;
