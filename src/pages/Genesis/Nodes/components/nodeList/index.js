import React from 'react';
import styles from './index.less';
import NodeCard from '../nodeCard';

const NodeList = ({ data }) => {
  return (
    <div className={styles.grid}>
      {data?.map((item) => (
        <NodeCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default NodeList;
