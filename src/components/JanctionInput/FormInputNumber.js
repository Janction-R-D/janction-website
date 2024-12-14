import { InputNumber } from 'antd';
import styles from './index.less';

const FormInputNumber = (props) => {
  return (
    <InputNumber
      className={[
        styles['janction-input'],
        styles['form-input'],
        styles['form-input-number'],
      ].join(' ')}
      {...props}
    />
  );
};

export default FormInputNumber;
