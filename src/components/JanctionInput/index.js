import { Input } from 'antd';
import styles from './index.less';
import FormInput from './FormInput';
import FormInputNumber from './FormInputNumber';

const JanctionInput = (props) => {
  return <Input className={styles['janction-input']} {...props} />;
};

export default JanctionInput;
export { FormInput, FormInputNumber };
