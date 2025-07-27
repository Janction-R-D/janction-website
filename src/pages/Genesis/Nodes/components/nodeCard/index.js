import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  InfoCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import { getNodeStatusMatch } from '../extra';
import dayjs from 'dayjs';
import ModalDelist from '../ModalDelist';
import {
  fetchMarketOrder,
  fetchNodesDelete,
  fetchNodesRefresh,
  fetchNodeTag,
} from '@/services/genesis';
import contract from '@/utils/contracts';
import { calculateDuration } from '@/utils/datetime';
import { history } from 'umi';
import ModalTagInput from '../ModalTagInput';

const NodeCard = ({ item, getList }) => {
  const { id, yesterdayReward } = item;
  const [status, setStatus] = useState('offline');
  useEffect(() => {
    const state = getStatus();
    setStatus(state);
  }, [item]);
  const getStatus = () => {
    const { isRunning, isActive, isListed, isOngoing } =
      getNodeStatusMatch(item);
    if (isRunning) return 'running';
    if (isActive) return 'active';
    if (isListed) return 'listed';
    if (isOngoing) return 'starting';
    return 'offline';
  };
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
        <span style={{ textWrap: 'nowrap' }}>
          {time[0]} {time[1]}
        </span>
      </>
    );
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
          <div className={`${styles[`status-box`]}`}>
            <span className={`${styles[`${status}`]}`}>{status}</span>
            <Tooltip title="Node is active">
              <InfoCircleOutlined className={styles.infoIcon} />
            </Tooltip>
          </div>
          <span className={styles['tags']}>{item?.name || ''}</span>
        </div>
      </div>

      <section className={styles.container}>
        <div className={styles.rewards}>
          <div className={styles.rewardBlock}>
            <div className={styles.label}>Yesterday's reward</div>
            <div className={styles.value}>
              {yesterdayReward?.toFixed(2)}{' '}
              <span className={styles.unit}>veJCT</span>
            </div>
          </div>
          <div className={styles.rewardBlock}>
            <div className={styles.label}>Rewarded</div>
            <div className={styles.value}>
              {item?.rewarned?.toFixed(2)}{' '}
              <span className={styles.unit}>veJCT</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.meta}>
            <span>
              Node running time: <b>{runningTime()}</b>
            </span>
            <span>
              list time: <b>{lisTime()}</b>
            </span>
          </div>
          <Operation item={item} getList={getList} />
        </div>
      </section>
    </div>
  );
};
const Operation = ({ item, getList }) => {
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const { isRunning, isListed } = getNodeStatusMatch(item);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');

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
    if (!isRunning) return;
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
      message.success('refresh success!');
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
      message.success('delete success!');
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
      message.warning('Operation failed, please try again later!');
      console.log('『error』', error);
    }
  };
  return (
    <div className={styles.actions}>
      <a
        className={`${styles['operation-action']}  ${
          !isRunning ? styles['disabled'] : ''
        }`}
        onClick={() => setIsTagModalOpen(true)}
      >
        Add tag
      </a>
      <ModalTagInput
        open={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        item={item}
      />
      <a
        className={`${styles['operation-action']}  ${
          !isRunning ? styles['disabled'] : ''
        }`}
        onClick={handleNavigate}
      >
        List
      </a>

      <a
        className={`${styles['operation-action']}  ${
          !isListed ? styles['disabled'] : ''
        }`}
      >
        <p onClick={showModalStake}>Delist</p>
        <ModalDelist
          record={item}
          isModalOpen={isModalOpenStake}
          handleOk={handleOkStake}
          handleSuccess={getList}
          handleCancel={handleCancelStake}
        />
      </a>

      {/* <span className={styles.receive} onClick={handleReceive}>
        Receive Rewards
      </span> */}

      <a onClick={() => onRefresh()}>
        <RedoOutlined
          rotate={90}
          spin={loading}
          loading={loading}
          className={styles.iconBtn}
        />
      </a>
      <a onClick={() => onDelete()}>
        <DeleteOutlined className={styles.iconBtn} />
      </a>
    </div>
  );
};
export default NodeCard;
