import { Input } from 'antd';
import styles from './index.less';

const SearchInput = (props) => {
  const { className = '', ...extra } = props;
  return (
    <Input
      prefix={
        <i className="iconfont icon-search" style={{ fontSize: '1.25vw' }} />
      }
      placeholder="Search for something"
      className={`${styles['search-input']} ${className}`}
      {...extra}
    />
  );
};

export default SearchInput;
