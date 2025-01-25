import React, { useEffect, useMemo, useState } from 'react';
import { message, Space } from 'antd';
import ModalDelist from './ModalDelist';
import { history } from 'umi';
import { getNodeStatusMatch } from './extra';
import {
  fetchMarketOrders,
  fetchNodesDelete,
  fetchNodesRefresh,
} from '@/services/genesis';
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';
import contract from '@/utils/contract';

export default function OperationDelis({ record, error, getList }) {
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);
  const { isRunning, isListed } = getNodeStatusMatch(record);
  const [loading, setLoading] = useState(false);
  const [paymentid, setPaymentId] = useState('');

  const getOrderInfo = async () => {
    try {
      const res = await fetchMarketOrders();
      const info =
        res?.find((item) => item.resource.node_id === record.id) || [];
      setPaymentId(info?.order?.patment_id);
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
      node: record,
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
      await fetchNodesRefresh({ node_id: record.id });
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
      await fetchNodesDelete({ node_id: record.id });
      message.success('delete success!');
      getList();
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const handleReceive = async () => {
    try {
      await getOrderInfo();
      if (!paymentid) return;
      await contract.releaseDailyPayment(paymentid);
    } catch (error) {
      message.warning('Operation failed, please try again later!');
      console.log('『error』', error);
    }
  };

  return (
    <Space
      size="middle"
      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      <a
        className={`${'operation-action'}  ${!isRunning ? 'disabled' : ''}`}
        onClick={handleNavigate}
      >
        <p>List</p>
      </a>
      <a className={`${'operation-action'}  ${!isListed ? 'disabled' : ''}`}>
        <p onClick={showModalStake}>Delist</p>
        <ModalDelist
          record={record}
          isModalOpen={isModalOpenStake}
          handleOk={handleOkStake}
          handleSuccess={getList}
          handleCancel={handleCancelStake}
        />
      </a>
      <a className={`${'operation-action'}`} onClick={handleReceive}>
        <p>Receive Rewards</p>
      </a>
      {/* <a onClick={() => onRefresh()}>
        <RedoOutlined
          rotate={90}
          spin={loading}
          loading={loading}
          className="poi"
        />
      </a>
      <a onClick={() => onDelete()}>
        <DeleteOutlined className="poi" />
      </a> */}
    </Space>
  );
}
