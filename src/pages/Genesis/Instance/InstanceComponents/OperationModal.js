import React, { useEffect, useState } from 'react';
import { Card, message, Popconfirm, Popover, Select } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contracts';
import {
  fetchMarketOrder,
  fetchResource,
  fetchStopRentParams,
  updateUserConfig,
} from '@/services/genesis';
import SshKeyModal from './SshModal';

export default function OperationModal({ record, getAllNodes }) {
  const [visible, setVisible] = useState(false);
  const [sshOpen, setSshOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectValue, setSelectValue] = useState(undefined);
  const isRunning = record?.status?.toLowerCase() === 'running';

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
  useEffect(() => {
    if (!selectVisible) {
      setOptions([]);
      setSelectValue(undefined);
    }
    if (selectVisible) {
      handleConnect();
    }
  }, [selectVisible]);
  const handleStop = async () => {
    try {
      const { signature, payment_id } = await fetchStopRentParams({
        resource_id: record?.resource_id,
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
  const handleChange = async (value) => {
    const selected = options.find((opt) => opt.url === value);
    try {
      if (selected) {
        //llamar a user config
        await updateUserConfig({ last_resource_visited: record });
        window.open(selected.url, '_blank');
      }
      setSelectValue(value);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ellipsis operation-modal">
      <JanctionPopover
        content={
          <ul className={styles['more-function']} style={{ padding: '0px' }}>
            <Popover
              trigger="hover"
              open={isRunning && selectVisible}
              onOpenChange={(v) => {
                setSelectVisible(v);
                if (!v) {
                  setSelectValue(undefined);
                }
              }}
              placement="right"
              content={
                <Select
                  value={selectValue}
                  onChange={handleChange}
                  style={{ width: 200 }}
                  placeholder="Select connection"
                  loading={selectLoading}
                  notFoundContent={
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      {' '}
                      <p>Ups, sorry!</p>
                      <p>Not resource url founded</p>
                    </span>
                  }
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
                record?.status?.toLowerCase() === 'stopped' ||
                record?.status?.toLowerCase() === 'expired'
              }
            >
              <li
                className={`${'operation-action'}  ${
                  record?.status?.toLowerCase() === 'stopped' ||
                  record?.status?.toLowerCase() === 'expired'
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
        <a>
          More functions <i className="iconfont icon-down" />
        </a>
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
