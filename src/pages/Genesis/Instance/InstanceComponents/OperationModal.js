import React, { useState } from 'react';
import { Card, message, Popconfirm } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contracts';
import { fetchMarketOrder, fetchStopRentParams } from '@/services/genesis';

export default function OperationModal({ record, getAllNodes }) {
  const [visible, setVisible] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const handleConnect = () => {
    setVisible(true);
  };
  const getOrderInfo = async () => {
    const data = {
      node_id: record.node_id,
      resource_id: record.id,
    };
    try {
      const [res] = (await fetchMarketOrder(data)) || [];
      const code = res?.order?.patment_id;
      console.log(code);
      setPaymentId(code);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStop = async () => {
    try {
      const { signatures } = await fetchStopRentParams({
        resource_id: record.id,
      });
      await getOrderInfo();
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
