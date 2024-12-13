import { Input } from 'antd';
import styles from './index.less';

const FormInput = (props) => {
  return (
    <Input
      className={[styles['janction-input'], styles['form-input']].join(' ')}
      {...props}
    />
  );
};

export default FormInput;
