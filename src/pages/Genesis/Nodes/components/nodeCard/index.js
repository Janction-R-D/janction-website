import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import {
  getNodeStatusMatch,
  NodeStatusStr,
  OperatingStatusStr,
} from '../extra';
import dayjs from 'dayjs';
import ModalDelist from '../ModalDelist';
import {
  fetchMarketOrder,
  fetchNodesDelete,
  fetchNodesRefresh,
} from '@/services/genesis';
import contract from '@/utils/contracts';
import { calculateDuration } from '@/utils/datetime';
import { history, useIntl } from 'umi';
import ModalTagInput from '../ModalTagInput';
import DeleteNodeButton from '../DeleteButton';

// 仅用于兼容现有 CSS：status_str 与 class 的对应（ongoing→starting, online→running）
const STATUS_CLASS_MAP = {
  [NodeStatusStr.ONGOING]: 'starting',
  [NodeStatusStr.ONLINE]: 'running',
};

const NodeCard = ({ item, getList }) => {
  const intl = useIntl();
  const { id, yesterdayReward, status_str, operating_status_str } = item;
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const { isOffLine, isRunning, isListed, isDelisted } =
    getNodeStatusMatch(item);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  const statusClass = STATUS_CLASS_MAP[status_str] || status_str;

  const renderGpu = () => {
    if (!item.attr?.gpu_chip && !item.attr?.cpu_chip) return '--';
    const cpu = item.attr?.cpu_chip;
    const gpu = item.attr?.gpu_chip;
    return (
      <span className={styles.gpu_core}>
        <span>
          CHIP/GPUS: {!!cpu?.length ? `${cpu[0]} * ${cpu.length}` : '--'}
        </span>
        <p>{!!gpu?.length ? `${gpu[0]} * ${gpu.length}` : '--'}</p>
      </span>
    );
  };

  const runningTime = () => {
    const text = item?.last_start_at;
    const { isRunning, isActive, isListed, isOngoing } =
      getNodeStatusMatch(item);
    if (!text) return '--';
    if (!isActive && !isListed && !isRunning) return '--';
    return calculateDuration(text, { showSeconds: false });
  };

  const lisTime = () => {
    const text = item?.last_config_at;
    if (!text) return '--';
    const time = dayjs(text).format('YYYY-MM-DD HH:mm:ss').split(' ');
    return (
      <>
        <span style={{ whiteSpace: 'nowrap' }}>
          {time[0]} {time[1]}
        </span>
      </>
    );
  };

  const getOrderInfo = async () => {
    const data = {
      resource_id: item.id,
    };
    try {
      const res = (await fetchMarketOrder(data)) || {};
      const code = res?.order?.payment_id;
      setPaymentId(code);
    } catch (err) {
      console.log(err);
    }
  };

  const showModalStake = () => {
    if (!isListed) return;
    setIsModalOpenStake(true);
  };

  const handleNavigate = () => {
    if (!isRunning || isDelisted) return;
    history.push('/genesis/mount', {
      node: item,
    });
  };

  const handleOkStake = () => {
    setIsModalOpenStake(false);
  };

  const handleCancelStake = () => {
    setIsModalOpenStake(false);
  };

  const onRefresh = async () => {
    try {
      setLoading(true);
      await fetchNodesRefresh({ node_id: item.id });
      message.success(intl.formatMessage({ id: 'nodeCard.refreshSuccess' }));
      getList();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };

  const onDelete = async () => {
    try {
      await fetchNodesDelete({ node_id: item.id });
      message.success(intl.formatMessage({ id: 'nodeCard.deleteSuccess' }));
      getList();
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const handleReceive = async () => {
    try {
      await getOrderInfo();
      if (!paymentId) return;
      await contract.releaseHourlyPayment(paymentId);
    } catch (error) {
      message.warning(intl.formatMessage({ id: 'nodeCard.operationFailed' }));
      console.log('『error』', error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <i className="iconfont icon-nvidia" />
          <div>
            <div className={styles.id}>ID: {id}</div>
            <div className={styles.gpu}>{renderGpu()}</div>
          </div>
        </div>
        <div className={styles.status}>
          <div className={`${styles['status-box']}`}>
            <span className={styles[statusClass]}>{status_str}</span>
            <Tooltip title={operating_status_str || '--'}>
              <InfoCircleOutlined className={styles.infoIcon} />
            </Tooltip>
          </div>
          <span className={styles['tags']}>{item?.name || ''}</span>
        </div>
      </div>

      <section className={styles.container}>
        <div className={styles.rewards}>
          <div className={styles.rewardBlock}>
            <div className={styles.label}>
              {intl.formatMessage({ id: 'nodeCard.yesterdayReward' })}
            </div>
            <div className={styles.value}>
              {yesterdayReward?.toFixed(2)}{' '}
              <span className={styles.unit}>veJCT</span>
            </div>
          </div>
          <div className={styles.rewardBlock}>
            <div className={styles.label}>
              {intl.formatMessage({ id: 'nodeCard.rewarded' })}
            </div>
            <div className={styles.value}>
              {item?.rewarned?.toFixed(2)}{' '}
              <span className={styles.unit}>veJCT</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.meta}>
            <span>
              {intl.formatMessage({ id: 'nodeCard.nodeRunningTime' })}:{' '}
              <b>{runningTime()}</b>
            </span>
            <span>
              {intl.formatMessage({ id: 'nodeCard.listTime' })}:{' '}
              <b>{lisTime()}</b>
            </span>
          </div>
          <Operation item={item} getList={getList} />
        </div>
      </section>
    </div>
  );
};

const Operation = ({ item, getList }) => {
  const intl = useIntl();
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const { isOffLine, isRunning, isListed, isDelisted } =
    getNodeStatusMatch(item);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const isLeased = item?.operating_status_str === OperatingStatusStr.LEASED;
  const isOngoing = item?.status_str === NodeStatusStr.ONGOING;
  const isOnline = item?.status_str === NodeStatusStr.ONLINE;

  const getOrderInfo = async () => {
    const data = {
      resource_id: item.id,
    };
    try {
      const res = (await fetchMarketOrder(data)) || {};
      const code = res?.order?.payment_id;
      setPaymentId(code);
    } catch (err) {
      console.log(err);
    }
  };

  const showModalStake = () => {
    if (!isListed) return;
    setIsModalOpenStake(true);
  };

  const handleNavigate = () => {
    // 进入租赁配置页：提交交易依赖节点在线；被租中/启动中不允许修改配置
    if (!isOnline || isLeased || isOngoing) return;
    history.push('/genesis/mount', {
      node: item,
    });
  };

  const handleOkStake = () => {
    setIsModalOpenStake(false);
  };

  const handleCancelStake = () => {
    setIsModalOpenStake(false);
  };

  const onRefresh = async () => {
    try {
      setLoading(true);
      await fetchNodesRefresh({ node_id: item.id });
      message.success(intl.formatMessage({ id: 'nodeCard.refreshSuccess' }));
      getList();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };

  const onDelete = async () => {
    try {
      await fetchNodesDelete({ node_id: item.id });
      message.success(intl.formatMessage({ id: 'nodeCard.deleteSuccess' }));
      getList();
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const handleReceive = async () => {
    try {
      await getOrderInfo();
      if (!paymentId) return;
      await contract.releaseHourlyPayment(paymentId);
    } catch (error) {
      message.warning(intl.formatMessage({ id: 'nodeCard.operationFailed' }));
      console.log('『error』', error);
    }
  };

  return (
    <div className={styles.actions}>
      <a
        className={`${styles['operation-action']}  ${
          isOffLine ? styles['disabled'] : ''
        }`}
        onClick={() => {
          if (isOffLine) return;
          setIsTagModalOpen(true);
        }}
      >
        {intl.formatMessage({ id: 'nodeCard.addName' })}
      </a>
      <ModalTagInput
        open={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        item={item}
        onRefresh={getList}
      />
      <a
        className={`${styles['operation-action']}  ${
          !isOnline || isLeased || isOngoing ? styles['disabled'] : ''
        }`}
        onClick={handleNavigate}
      >
        {intl.formatMessage({ id: 'nodeCard.list' })}
      </a>

      <a
        className={`${styles['operation-action']}  ${
          !isListed ? styles['disabled'] : ''
        }`}
      >
        <p onClick={showModalStake}>
          {intl.formatMessage({ id: 'nodeCard.delist' })}
        </p>
        <ModalDelist
          record={item}
          isModalOpen={isModalOpenStake}
          handleOk={handleOkStake}
          handleSuccess={getList}
          handleCancel={handleCancelStake}
        />
      </a>

      <a onClick={() => onRefresh()}>
        <ReloadOutlined
          rotate={90}
          spin={loading}
          loading={loading}
          className={styles.iconBtn}
        />
      </a>
      <DeleteNodeButton onDelete={onDelete} nodeId={item.id} />
    </div>
  );
};

export default NodeCard;
