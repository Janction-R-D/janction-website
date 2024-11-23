import React, { useState } from 'react';
import { Card } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';

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
      <JanctionPopover
        content={
          <ul className={styles['more-function']} style={{ padding: '0px' }}>
            <li onClick={handleConnect}>Remote connection</li>
            <li>Renewal</li>
          </ul>
        }
      >
        <a>More Functions</a>
      </JanctionPopover>

      {visible && (
        <TerminalModal
          visible={visible}
          onCancel={() => setVisible(false)}
          resource_id={record?.id}
        />
      )}
    </div>
  );
}
