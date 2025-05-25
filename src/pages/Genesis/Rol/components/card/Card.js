import { Card, Button, Divider } from 'antd';
import styles from './index.less';
import { history, useModel } from 'umi';
import storage from '@/utils/storage';
import { updateUserConfig } from '@/services/genesis';

const IdentityCard = ({ card }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};

  const onIdentityChange = () => {
    storage.set({ name: 'isLessee', value: card.isLessee });
    setInitialState({
      ...initialState,
      isLessee: !isLessee,
    });
  };
  const changeSetting = async () => {
    const payload = {
      is_old_user: true,
    };
    try {
      const res = await updateUserConfig(payload);
    } catch (error) {
      console.log(error);
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
