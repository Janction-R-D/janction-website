import React, { useEffect, useState } from 'react';
import { Card, message, Popconfirm, Popover, Select } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contracts';
import {
  fetchMarketOrder,
  fetchResource,
  fetchResourceTunnel,
  fetchStopRentParams,
  PostResourceTunnel,
  updateUserConfig,
} from '@/services/genesis';
import SshKeyModal from './SshModal';
import { useChainId } from 'wagmi';
import { useEthersSigner } from '@/hooks/useEthersSigner';

export default function OperationModal({ record, getAllNodes }) {
  const [visible, setVisible] = useState(false);
  const [sshOpen, setSshOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectValue, setSelectValue] = useState(undefined);
  const chainId = useChainId();
  const signer = useEthersSigner(chainId);

  const allowedStatuses = ['running', 'starting', 'stopped'];
  const allowedRunning = ['running', 'starting'];
  const isRunning = allowedRunning.includes(record?.status?.toLowerCase());
  const isAllowed = allowedStatuses.includes(record?.status?.toLowerCase());

  const handleConnect = async () => {
    if (!isRunning) return;
    if (selectLoading) return;
    setSelectVisible(true);
    setSelectLoading(true);

    try {
      // First attempt to fetch the tunnel
      const res = await fetchResourceTunnel({ resource_id: record?.id });
      setOptions(res.routes || []);
    } catch (error) {
      console.log('Failed to fetch tunnel routes:', error);
      try {
        // Try to create the tunnel
        console.log('Attempting to create the remote tunnel...');
        await PostResourceTunnel({ resource_id: record?.id });

        // Try fetching again after creating the tunnel
        console.log('Retrying to fetch tunnel routes...');
        const res = await fetchResourceTunnel({ resource_id: record?.id });
        setOptions(res.routes || []);
      } catch (postError) {
        console.log(
          'Failed to create tunnel or fetch routes after creation:',
          postError,
        );
        message.error('Failed to create or retrieve remote tunnel routes');
      }
    } finally {
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
        resource_id: record?.id,
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
    console.log(value);
    const selected = options.find((opt) => opt.url === value);
    try {
      if (selected) {
        message.info({
          content: 'Waiting...',
          key: 'code-server',
          duration: 0,
        });
        //llamar a user config
        await updateUserConfig({ last_resource_visited: record?.id });
        window.open(selected.url, '_blank');
        window.location.reload();
      }
      setSelectValue(value);
    } catch (error) {
      console.log(error);
    } finally {
      message.destroy('code-server');
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
                ${
                  record?.status?.toLowerCase() !== 'stopped' || !isRunning
                    ? styles['forbiden']
                    : ''
                }
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
              disabled={!isAllowed}
            >
              <li
                className={`${'operation-action'}  ${
                  !isAllowed ? styles['forbiden'] : ''
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
