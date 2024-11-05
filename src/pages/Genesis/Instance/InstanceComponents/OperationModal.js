import React, { useState } from 'react';
import { Card } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';

export default function OperationModal({ record }) {
  const [showModal, setShowModal] = useState(true);
  const [visible, setVisible] = useState(false);
  const classname = showModal
    ? styles['card-modal-show']
    : styles['card-modal'];
  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleConnect = () => {
    // 创建一个 xterm 实例
    setVisible(true);
  };

  return (
    <div className="ellipsis operation-modal">
      <a onClick={handleClick}>More Functions</a>
      <Card className={classname} style={{ padding: '0px' }}>
        <div className={styles['panel']}>
          <span onClick={handleConnect}>Remote connection</span>
          <span>Renewal</span>
        </div>
      </Card>
      {visible && (
        <TerminalModal
          visible={visible}
          onCancel={() => setVisible(false)}
          resource_id={record.activity?.resource_id}
        />
      )}
    </div>
  );
}
