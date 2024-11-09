import { Input } from 'antd';
import styles from './index.less';

const { Password } = Input;

const inputComponents = {
  text: Input,
  password: Password,
};

const JanctionInput = (props) => {
  const { type = 'text' } = props;
  const Com = inputComponents[type];
  return (
    <div className={styles['janction-input']}>
      <Com {...props} />
    </div>
  );
};

export default JanctionInput;
