import { Tooltip } from 'antd';
import styles from './index.less';

const JanctionTip = (props) => {
  const { title, placement } = props;
  return (
    <Tooltip
      title={title}
      placement={placement}
      overlayClassName={styles['janction-tooltip']}
    >
      <i className={`iconfont icon-info ${styles['janction-tip-icon']}`}></i>
    </Tooltip>
  );
};

export default JanctionTip;
