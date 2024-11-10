import { Popover } from 'antd';
import styles from './index.less';

const JanctionPopover = (props) => {
  const { children, ...extraProps } = props;
  return (
    <Popover {...extraProps} overlayClassName={styles['janction-popover']}>
      {children}
    </Popover>
  );
};

export default JanctionPopover;
