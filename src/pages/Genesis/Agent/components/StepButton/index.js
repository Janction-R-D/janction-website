import {
  DotChartOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { Button } from 'antd';
const StepButton = ({
  onClick,
  text,
  padding = [12, 32],
  height = 48,
  disabled = false,
  label,
}) => {
  const style = {
    height: `${height}px`,
    padding: `${padding[0]}px ${padding[1]}px`,
  };

  return (
    <Button
      className={styles['step-button']}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <span>{text}</span>
      <div className={styles['icon_rotate']}>
        {label === 'chat' ? <MessageOutlined /> : <ShareAltOutlined />}
      </div>
    </Button>
  );
};

export default StepButton;
