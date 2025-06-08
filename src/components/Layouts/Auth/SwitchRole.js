import { Dropdown, Button } from 'antd';
import { DownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './switcher.less';
import { useModel } from 'umi';
import { useState } from 'react';
import { handleIdentityChange } from '@/utils/metamaskLogin';
import { useDisconnect, useSignMessage } from 'wagmi';

const RoleSwitcher = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [visible, setVisible] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const onChangeIdentity = async () => {
    const resConnect = await handleIdentityChange({
      isLessee,
      setInitialState,
      initialState,
      handleCancel: () => {
        setVisible(false);
      },
      setLoading: () => {},
      signMessageAsync,
      disconnect,
    });
    console.log(resConnect);
  };

  const menu = (
    <div className={styles.dropdownBox}>
      <div className={styles.switchTitle}>Switch to</div>
      <div className={styles.optionBox} onClick={onChangeIdentity}>
        <span className={styles.optionText}>
          {isLessee ? 'Lessor' : 'Lessee'}
        </span>
        <i className="iconfont icon-next" />
      </div>
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      open={visible}
      onOpenChange={setVisible}
      trigger={['click']}
      placement="bottomCenter"
    >
      <Button className={styles.roleButton}>
        {isLessee ? 'Lessee' : 'Lessor'}
        <i className="iconfont icon-down" />
      </Button>
    </Dropdown>
  );
};

export default RoleSwitcher;
