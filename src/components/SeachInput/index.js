import Icons from '@/components/Icons';
import { Input } from 'antd';
import styles from './index.less';

const SearchInput = (props) => {
  const { className = '', ...extra } = props;
  return (
    <Input
      prefix={<Icons name="search" />}
      placeholder="Search for something"
      className={`${styles['search-input']} ${className}`}
      {...extra}
    />
  );
};

export default SearchInput;
