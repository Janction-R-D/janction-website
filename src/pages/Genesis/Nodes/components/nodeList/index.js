import styles from './index.less';
import NodeCard from '../nodeCard';

const NodeList = ({ data, getList }) => {
  return (
    <div className={styles.grid}>
      {data?.map((item) => (
        <NodeCard key={item.id} item={item} getList={getList} />
      ))}
    </div>
  );
};

export default NodeList;
