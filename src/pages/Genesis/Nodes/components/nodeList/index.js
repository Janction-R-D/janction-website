import styles from './index.less';
import NodeCard from '../nodeCard';
import { Empty } from 'antd';

const NodeList = ({ data, getList }) => {
  return (
    <div className={styles.grid}>
      {data?.map((item) => (
        <NodeCard key={item.id} item={item} getList={getList} />
      ))}
      {!data.length && <Empty />}
    </div>
  );
};

export default NodeList;
