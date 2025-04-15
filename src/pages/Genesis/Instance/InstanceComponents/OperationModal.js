import React, { useState } from 'react';
import { Card, message, Popconfirm } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contracts';
import { fetchMarketOrder, fetchStopRentParams } from '@/services/genesis';

// function filtrarNodeAndResource(data, nodeId, resourceId) {
//   return data.find(
//     (item) =>
//       item.order?.node_id?.trim() === nodeId.trim() &&
//       item.order?.resource_id?.trim() === resourceId.trim(),
//   );
// }
export default function OperationModal({ record, getAllNodes }) {
  const [visible, setVisible] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const isRunning = record.status.toLowerCase() === 'running';
  const handleConnect = () => {
    if (!isRunning) return;
    if (record.status) setVisible(true);
  };
  // const getOrderInfo = async () => {
  //   const payload = {
  //     node_id: record.node_id,
  //     resource_id: record.id,
  //   };
  //   const params = {
  //     page_size: 50,
  //     page: 1,
  //   };

  //   try {
  //     // const [res] = (await fetchMarketOrder(payload)) || [];
  //     const { data } = (await fetchMarketOrder(params)) || [];
  //     const filteredNode = filtrarNodeAndResource(
  //       data,
  //       record.node_id,
  //       record.id,
  //     );
  //     console.log(filteredNode);
  //     const code = filteredNode?.order?.payment_id;
  //     console.log(code);
  //     setPaymentId(code);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleStop = async () => {
    try {
      const { signature, payment_id } = await fetchStopRentParams({
        resource_id: record.id,
      });
      const signatures = [`0x${signature}`];
      // await getOrderInfo();
      if (!payment_id) return;
      await contract.stopRent(payment_id, signatures);
      message.success('Success');
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
            <li
              onClick={handleConnect}
              className={!isRunning && styles['forbiden']}
            >
              Remote connection
            </li>
            <Popconfirm
              title="Please confirm whether to stop renting this node!"
              onConfirm={handleStop}
              okText="Yes"
            >
              <li>Terminate</li>
            </Popconfirm>
            {/* <li>Renewal</li> */}
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
