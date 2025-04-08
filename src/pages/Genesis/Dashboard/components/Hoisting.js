import React, { useEffect, useState } from 'react';
import { Button, message, Modal } from 'antd';
import styles from './index.less';
import JanctionTable from '@/components/JanctionTable';
import Unescrow from './Unescrow';
import trustImg from '@/assets/images/genesis/coin-img.png';
import contract from '@/utils/contracts';
import { fetchNftStatus } from '@/services/genesis';
import { renderTableColumns } from '@/components/JanctionTable/column';
import { DATE_FORMAT_TYPE } from '@/utils/datetime';

const inTrustValue = 'hosted';
export default function Hoisting({ nft, showModal, handleOk, setShowModal }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    getNFTStatus();
  }, [showModal]);
  const getNFTStatus = async () => {
    try {
      const res = await fetchNftStatus();
      setList(res.Data || []);
    } catch (error) {
      console.log('『error』', error)
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (text, rowData) => (
        <div className="name">
          <div>
            <p>{`Janction Lessor #${rowData.token_id}`}</p>
            {rowData.host_status === inTrustValue && (
              <span className="trusted">
                <img src={trustImg} />
                In trust
              </span>
            )}
          </div>
          <img
            src={`${process.env.ASSETS_URL}/image/${rowData.token_id}.jpg`}
            alt="node"
          />
        </div>
      ),
    },
    renderTableColumns('Hosting Time', 'time', {
      type: 'date',
      format: DATE_FORMAT_TYPE.YMDHMS,
    }),
    {
      title: 'Earnings',
      dataIndex: 'rental_income',
      key: 'earnings',
      render: (text) => <p className="earnings">{text}</p>,
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Operation
            text={record.host_status === inTrustValue ? 'Unescrow' : 'Hoisting'}
            record={record}
            onSuccess={getNFTStatus}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      ),
    },
  ];
  return (
    <Modal
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      className={styles['hoisting-modal']}
      closable={false}
      footer={false}
    >
      <header>
        <h3>Hoisting</h3>
        <i className="iconfont icon-close" onClick={handleCancel}></i>
      </header>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={list}
        pagination={false}
        scroll={{ x: 'auto', y: '60vh' }}
        emptyDescription={<p>No data</p>}
      />
      <footer>
        <p>
          Hosting will charge a Mining Machine Management Fee of{' '}
          <span className="earnings">10%</span>
        </p>
      </footer>
    </Modal>
  );
}

function Operation({ text, record, loading, setLoading, onSuccess }) {
  const [showUnscrow, setShowUnscrow] = useState(false);
  const [opLoading, setOpLoading] = useState(false);

  const onEscrow = async () => {
    try {
      setLoading(true);
      setOpLoading(true);
      await contract.escrow(record.token_id);
      message.success('Escrow successfully!');
      setLoading(false);
      setOpLoading(false);
      onSuccess();
    } catch (error) {
      setLoading(false);
      setOpLoading(false);
      message.success('Escrow failed!');
      console.log('『error』', error);
    }
  };

  const onUnEscrow = async () => {
    try {
      setLoading(true);
      await contract.unescrow(record.token_id);
      message.success('Unescrow successfully!');
      setLoading(false);
      setShowUnscrow(false);
      onSuccess();
    } catch (error) {
      setLoading(false);
      message.success('Unescrow failed!');
      console.log('『error』', error);
    }
  };

  const handleClick = () => {
    if (record.host_status === inTrustValue) {
      setShowUnscrow(true);
      return;
    }
    onEscrow(record);
  };
  return (
    <>
      <Button
        loading={opLoading}
        disabled={loading}
        className={`${
          record.host_status == inTrustValue
            ? styles['pre']
            : styles['create-btn']
        }`}
        onClick={handleClick}
      >
        {text}
      </Button>
      <Unescrow
        loading={loading}
        record={record}
        setIslModalOpen={setShowUnscrow}
        islModalOpen={showUnscrow}
        handleOk={onUnEscrow}
      />
    </>
  );
}
