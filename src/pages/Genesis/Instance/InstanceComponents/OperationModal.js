import React, { useState } from 'react';
import { Card } from 'antd';
import styles from './operation.less';
export default function OperationModal({ record }) {
  const [showModal, setShowModal] = useState(true);
  const classname = showModal
    ? styles['card-modal-show']
    : styles['card-modal'];
  const handleClick = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="ellipsis operation-modal">
      <a onClick={handleClick}>More Functions</a>
      <Card className={classname} style={{ padding: '0px' }}>
        <div className={styles['panel']}>
          <span>Remote connection</span>
          <span>Renewal</span>
        </div>
      </Card>
    </div>
  );
}
