import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Popover, Select } from 'antd';
import styles from './operation.less';
import TerminalModal from './TerminalModal';
import JanctionPopover from '@/components/JanctionPopover';
import contract from '@/utils/contracts';
import {
  fetchDeleteTunnel,
  fetchEnableTunnel,
  fetchMarketOrder,
  fetchResource,
  fetchCreateTunnel,
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
import AddModal from './AddModal';
import { DeleteFilled } from '@ant-design/icons';

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
  console.log(signer, 'signer');
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const allowedStatuses = ['running', 'starting', 'stopped'];
  const allowedRunning = ['running', 'starting'];
  const isRunning = allowedRunning.includes(record?.status?.toLowerCase());
  const isAllowed = allowedStatuses.includes(record?.status?.toLowerCase());
  const intl = useIntl();

  const handleConnect = async (service_name = 'code-server') => {
    if (!isRunning || selectLoading) return;

    const resourceId = record?.id;
    if (!resourceId) return;

    const cached = storage.get('tunnels') || [];
    const cachedTunnel = cached.find((t) => t?.id === resourceId);

    if (cachedTunnel) {
      console.log('Found tunnel in cache:', cachedTunnel.tunnels);
      setOptions(cachedTunnel.tunnels || []);
      setSelectVisible(true);
      return;
    }

    const updateTunnelCache = (routes) => {
      storage.set({
        name: 'tunnels',
        value: [...cached, { id: resourceId, tunnels: routes }],
      });
      setOptions(routes);
    };

    setSelectVisible(true);
    setSelectLoading(true);
    message.info({
      content: 'Attempting to create the remote tunnel...',
      key: 'loading',
      duration: 0,
    });

    try {
      // 1. Try to get initial tunnel status
      let statusResponse = await fetchResourceTunnel({
        resource_id: resourceId,
      });
      console.log('Tunnel status:', statusResponse);

      let routes = statusResponse.tunnel_routes || [];
      const createRes = await fetchCreateTunnel({ resource_id: resourceId });
      if (!routes.length) {
        // 2. If no routes, enable the tunnel service
        const enableResult = await fetchEnableTunnel({
          resource_id: resourceId,
          service_name,
        });
        console.log('Tunnel enable result:', enableResult);

        // 3. Fetch updated routes after enabling tunnel
        statusResponse = await fetchResourceTunnel({ resource_id: resourceId });
        routes = statusResponse.tunnel_routes || [];

        if (!routes.length) {
          throw new Error('No tunnel routes after enabling tunnel');
        }
      }

      // 4. Update cache and UI with routes
      updateTunnelCache(routes);
      // message.success('Tunnel connected successfully!');
      if (statusResponse.message) {
        message.info(statusResponse.message);
      }
    } catch (error) {
      console.warn('Primary tunnel fetch failed, creating tunnel...', error);

      try {
        // 5. Try creating the tunnel as fallback
        await fetchCreateTunnel({ resource_id: resourceId });

        // 6. Fetch routes after tunnel creation
        const statusResponse = await fetchResourceTunnel({
          resource_id: resourceId,
        });
        const routes = statusResponse.tunnel_routes || [];

        if (!routes.length) {
          throw new Error('No tunnel routes after creating tunnel');
        }

        // 7. Update cache and UI after successful creation
        updateTunnelCache(routes);
        message.success('Tunnel connected successfully after creation!');
      } catch (err) {
        message.error('Failed to connect tunnel after creation.');
        console.error(err);
      }
    } finally {
      setSelectLoading(false);
      message.destroy('loading');
    }
  };

  const AddRoute = async () => {
    try {
      console.log('No routes found, creating new tunnel...');
      await PostAddTunnel({
        resource_id: record?.id,
        service_name: 'my-new-service',
        port: 8080,
      });

      const routes = res.routes || [];

      storage.set({
        name: 'tunnels',
        value: [...cached, { id: record?.id, tunnels: routes }],
      });

      setOptions(routes);
      message.success('Tunnel connected successfully!');
    } catch (error) {
      console.error('Tunnel connection failed:', error);
      message.error('Failed to create or retrieve remote tunnel routes');
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
  const onAddRoute = async (values) => {
    await AddRoute();
    closeModal();
  };
  const deleteRoute = async (opt) => {
    console.log(opt);
    try {
      const resDelete = await fetchDeleteTunnel({
        resource_id: record.id,
        service_name: opt.name,
      });
      getAllNodes();
    } catch (error) {}
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
                      {opt.name + '-' + (idx + 1) || opt.url + '-' + (idx + 1)}{' '}
                      {/* <span
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteRoute(opt);
                        }}
                        style={{ marginLeft: 18, cursor: 'pointer' }}
                      >
                        <DeleteFilled />
                      </span> */}
                    </Select.Option>
                  ))}
                  {/* <Select.Option
                    key="add-new-route"
                    disabled
                    style={{ textAlign: 'center', cursor: 'default' }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // evitar que el select cierre o cambie valor
                        openModal();
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#1890ff',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      {intl.formatMessage({ id: 'addNewRoute' })}{' '}
                      <i className="iconfont icon-add" />
                    </button>
                  </Select.Option> */}
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
      {modalVisible && (
        <AddModal
          modalVisible={modalVisible}
          onAddRoute={onAddRoute}
          closeModal={closeModal}
          record={record}
        />
      )}
    </div>
  );
}
