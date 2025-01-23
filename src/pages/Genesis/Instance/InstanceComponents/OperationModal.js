import React, { useState } from 'react';
import { Card, message, Popconfirm } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contract';
import { fetchStopRentParams } from '@/services/genesis';

export default function OperationModal({ record, getAllNodes }) {
  const [visible, setVisible] = useState(false);

  const handleConnect = () => {
    setVisible(true);
  };

  const getRentParams = async () => {
    try {
      const res = await fetchStopRentParams({
        resource_id: record.id,
      });
      console.log('『res』', res);
      return res;
    } catch (error) {
      throw Error(error);
    }
  };

  const handleStop = async () => {
    try {
      const { paymentId, signatures } = await getRentParams();
      if (!paymentId) return;
      await contract.stopRent(paymentId, signatures);
      getAllNodes();
    } catch (error) {
      message.warning('Operation failed, please try again later!');
      console.log('『error』', error);
    }
  };

  return (
    <div className="ellipsis operation-modal">
      <JanctionPopover
        content={
          <ul className={styles['more-function']} style={{ padding: '0px' }}>
            <li onClick={handleConnect}>Remote connection</li>
            <Popconfirm
              title="Please confirm whether to stop renting this node!"
              onConfirm={handleStop}
              okText="Yes"
            >
              <li>Stop Renting</li>
            </Popconfirm>
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
