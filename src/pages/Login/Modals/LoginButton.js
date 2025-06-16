import { Button } from 'antd';
import styles from './index.less';
export default function LoginButton({ ldng }) {
  return (
    <Button
      type="primary"
      htmlType="submit"
      block
      className={styles.button}
      loading={ldng}
    >
      Login{' '}
      <div className={styles['icon']}>
        <i className="iconfont icon-next" style={{ fontSize: '10px' }} />
      </div>
    </Button>
  );
}
