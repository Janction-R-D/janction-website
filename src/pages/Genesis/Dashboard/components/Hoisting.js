import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import styles from './index.less';
import JanctionTable from '@/components/JanctionTable';
import Unescrow from './Unescrow';
import trustImg from '@/assets/images/genesis/coin-img.png';
import contract from '@/utils/contract';

const inTrustValue = 'trusted';
export default function Hoisting({ nft, showModal, handleOk, setShowModal }) {
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
            <p>{`Janction Landlord #${rowData.token_id}`}</p>
            {rowData.status === inTrustValue && (
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
    { title: 'Hosting Time', dataIndex: 'hostingTime', key: 'hostingTime' },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
      key: 'earnings',
      render: (text) => <p className="earnings">{text}</p>,
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Operation
            text={record.status === inTrustValue ? 'Unescrow' : 'Hoisting'}
            record={record}
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
        dataSource={nft?.detail}
        pagination={false}
        scroll={{ x: 'auto' }}
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

function Operation({ text, record }) {
  const [showUnscrow, setShowUnscrow] = useState(false);

  const onEscrow = async () => {
    try {
      await contract.escrow(record.token_id);
      message.success('Successfully!');
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const onUnEscrow = async () => {
    try {
      await contract.unescrow(record.token_id);
      message.success('Successfully!');
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const handleClick = () => {
    if (record.status === inTrustValue) {
      setShowUnscrow(true);
      return;
    }
    onEscrow(record);
  };
  return (
    <>
      <Button
        className={`${
          record.status == inTrustValue ? styles['pre'] : styles['create-btn']
        }`}
        onClick={handleClick}
      >
        {text}
      </Button>
      <Unescrow
        record={record}
        setIslModalOpen={setShowUnscrow}
        islModalOpen={showUnscrow}
        handleOk={onUnEscrow}
      />
    </>
  );
}
