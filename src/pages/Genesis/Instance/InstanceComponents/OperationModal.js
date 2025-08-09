import React, { useEffect, useState } from 'react';
import { message, Popconfirm, Popover, Select } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contracts';
import {
  fetchMarketOrder,
  fetchResource,
  fetchResourceTunnel,
  fetchStopRentParams,
  PostAddTunnel,
  PostResourceTunnel,
  updateUserConfig,
} from '@/services/genesis';
import SshKeyModal from './SshModal';
import { useChainId } from 'wagmi';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import CustomWarningModal from './WarningModal';
import { useIntl } from 'umi';
import storage from '@/utils/storage';

export default function OperationModal({ record, getAllNodes }) {
  const [visible, setVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
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
  const intl = useIntl();
  // const handleConnect = async () => {
  //   if (!isRunning) return;
  //   if (selectLoading) return;
  //   setSelectVisible(true);
  //   setSelectLoading(true);

  //   try {
  //     message.info({
  //       content: 'Attempting to create the remote tunnel...',
  //       key: 'loading',
  //       duration: 0,
  //     });
  //     // first .. check if the resource tunnel is on local

  //     // First attempt to fetch the tunnel
  //     const res = await fetchResourceTunnel({ resource_id: record?.id });
  //     console.log(res?.routes);
  //     storage.set({
  //       name: 'tunnels',
  //       value: { id: record?.id, tuunels: res?.routes || [] },
  //     });
  //     setOptions(res.routes || []);
  //   } catch (error) {
  //     console.log('Failed to fetch tunnel routes:', error);
  //     try {
  //       // Try to create the tunnel
  //       console.log('Attempting to create the remote tunnel...');
  //       // await PostResourceTunnel({ resource_id: record?.id });
  //       const tunnel = await PostAddTunnel({
  //         resource_id: record?.id,
  //         service_name: 'my-new-service',
  //         port: 8080,
  //       });

  //       // Try fetching again after creating the tunnel
  //       console.log('Retrying to fetch tunnel routes...');
  //       const res = await fetchResourceTunnel({ resource_id: record?.id });
  //       // save the resource on local to avoid recall again..

  //       setOptions(res.routes || []);
  //       message.destroy('loading');
  //       message.success('Success!');
  //     } catch (postError) {
  //       console.log(
  //         'Failed to create tunnel or fetch routes after creation:',
  //         postError,
  //       );
  //       message.destroy('loading');
  //       message.error('Failed to create or retrieve remote tunnel routes');
  //     }
  //   } finally {
  //     setSelectLoading(false);
  //     message.destroy('loading');
  //   }
  // };

  const handleConnect = async () => {
    if (!isRunning || selectLoading) return;

    const resourceId = record?.id;
    if (!resourceId) return;

    const cached = storage.get('tunnels') || [];

    const cachedTunnel = cached?.find((t) => t?.id === resourceId);

    if (cachedTunnel) {
      console.log(cachedTunnel?.tunnels);
      console.log('Found tunnel in cache, skipping API calls.');
      setOptions(cachedTunnel?.tunnels || []);
      setSelectVisible(true);
      return;
    }

    setSelectVisible(true);
    setSelectLoading(true);
    message.info({
      content: 'Attempting to create the remote tunnel...',
      key: 'loading',
      duration: 0,
    });

    try {
      let res = await fetchResourceTunnel({ resource_id: resourceId });

      if (!res?.routes?.length) {
        console.log('No routes found, creating new tunnel...');
        await PostAddTunnel({
          resource_id: resourceId,
          service_name: 'my-new-service',
          port: 8080,
        });

        res = await fetchResourceTunnel({ resource_id: resourceId });
      }

      const routes = res.routes || [];

      storage.set({
        name: 'tunnels',
        value: [...cached, { id: resourceId, tunnels: routes }],
      });

      setOptions(routes);
      message.success({
        content: 'Tunnel connected successfully!',
        key: 'loading',
      });
    } catch (error) {
      console.error('Tunnel connection failed:', error);
      message.error({
        content: 'Failed to create or retrieve remote tunnel routes',
        key: 'loading',
      });
    } finally {
      setSelectLoading(false);
      message.destroy('loading');
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

      // await getOrderInfo();
      if (!payment_id) return;
      await contract.stopRent(signer, payment_id, signature);
      message.success('Success');
      getAllNodes();
    } catch (error) {
      console.log('『error』', error);
      // message.warning('Operation failed, please try again later!');
      console.log('『error』', error);
      setWarningVisible(true);
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
        //call  user config
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
                      <p>
                        {intl
                          .formatMessage({ id: 'error.notFound' })
                          .split('\n')
                          .map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </p>
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
                {intl.formatMessage({ id: 'remote.connection' })}
              </li>
            </Popover>

            <li
              className={`${'operation-action'}  
                ${
                  record?.status?.toLowerCase() == 'stopped' || !isRunning
                    ? styles['forbiden']
                    : ''
                }
                `}
              onClick={() => {
                if (!isRunning) return;
                setSshOpen(true);
              }}
            >
              {intl.formatMessage({ id: 'ssh.settings' })}
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
                {intl.formatMessage({ id: 'terminate' })}
              </li>
            </Popconfirm>
            <CustomWarningModal
              open={warningVisible}
              onClose={() => setWarningVisible(false)}
            />
            {/* <li>Renewal</li> */}
          </ul>
        }
      >
        <a>
          {intl.formatMessage({ id: 'more.functions' })}{' '}
          <i className="iconfont icon-down" />
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
