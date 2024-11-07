import { Empty } from 'antd';
import styles from './index.less';

const JactionEmpty = (props) => {
  const { showEmptyIcon, description = 'No data' } = props;
  return (
    <Empty
      image={<img src={require('@/assets/images/icons/empty.png')} />}
      className={!showEmptyIcon && styles['no-empty-image']}
      description={description}
    />
  );
};

export default JactionEmpty;
