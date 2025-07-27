import styles from './index.less';
import { history } from 'umi';

export default function ListedMessage() {
  return (
    <>
      <div className={styles['warning-box']}>
        <i className="iconfont icon-info" />
        <span>
          Please bind your email to receive real-time node monitoring updates
          <span
            className={styles['bind']}
            onClick={() => history.push('/genesis/user-center')}
          >
            Go bind email.
          </span>
        </span>
      </div>
    </>
  );
}
