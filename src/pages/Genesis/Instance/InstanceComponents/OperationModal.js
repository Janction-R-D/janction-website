import React, { useState } from 'react';
import { Card, message, Popconfirm, Popover, Select } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contracts';
import {
  fetchMarketOrder,
  fetchResource,
  fetchStopRentParams,
} from '@/services/genesis';
import SshKeyModal from './SshModal';

export default function OperationModal({ record, getAllNodes }) {
  const [visible, setVisible] = useState(false);
  const [sshOpen, setSshOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);

  const isRunning = record.status.toLowerCase() === 'running';
  const handleConnect = async () => {
    if (!isRunning) return;
    setSelectVisible(true); // abrir el popover
    setSelectLoading(true);
    try {
      const res = (await fetchResource({ resource_id: record?.id })) || [];
      setOptions(res.routes || []);
    } catch (error) {
      console.log(error);
      message.error('Failed to load remote connections');
    } finally {
      // if (record.status) setVisible(true); // --> old terminal version
      setSelectLoading(false);
    }
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
      // const signatures = [`0x${signature}`];
      const adminSignature = signature;
      // await getOrderInfo();
      if (!payment_id) return;
      await contract.stopRent(payment_id, adminSignature);
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
            <Popover
              trigger="click"
              open={isRunning && selectVisible}
              onOpenChange={(v) => setSelectVisible(v)}
              placement="right"
              content={
                <Select
                  style={{ width: 200 }}
                  placeholder="Select connection"
                  loading={selectLoading}
                  onChange={(value) => {
                    const selected = options.find((opt) => opt.url === value);
                    if (selected) {
                      window.open(selected.url, '_blank');
                      setSelectVisible(false);
                    }
                  }}
                >
                  {options.map((opt, idx) => (
                    <Select.Option key={idx} value={opt.url}>
                      {opt.name || opt.url}
                    </Select.Option>
                  ))}
                </Select>
              }
            >
              <li
                onClick={handleConnect}
                className={!isRunning ? styles['forbiden'] : ''}
              >
                Remote connection
              </li>
            </Popover>

            <li
              className={`${'operation-action'}  
                ${!isRunning ? styles['forbiden'] : ''}
                `}
              onClick={() => {
                if (!isRunning) return;
                setSshOpen(true);
              }}
            >
              SSH Settings
            </li>
            <Popconfirm
              title="Please confirm whether to stop renting this node!"
              onConfirm={handleStop}
              okText="Yes"
              disabled={
                record.status?.toLowerCase() === 'stopped' ||
                record.status?.toLowerCase() === 'expired'
              }
            >
              <li
                className={`${'operation-action'}  ${
                  record.status?.toLowerCase() === 'stopped' ||
                  record.status?.toLowerCase() === 'expired'
                    ? styles['forbiden']
                    : ''
                }`}
              >
                Terminate
              </li>
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
      <SshKeyModal
        visible={sshOpen}
        setVisible={setSshOpen}
        onCancel={() => setSshOpen(false)}
        record={record}
      />
    </div>
  );
}
