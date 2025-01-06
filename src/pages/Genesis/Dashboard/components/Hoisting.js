import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './index.less';
import JanctionTable from '@/components/JanctionTable';
import Unescrow from './Unescrow';
import trustImg from '@/assets/images/genesis/coin-img.png';

export default function Hoisting({ showModal, handleOk, setShowModal }) {
  const handleCancel = () => {
    setShowModal(false);
  };
  const data = [
    {
      name: 'Janction Lanlord #001',
      image: 'https://pub-da89859eb37b4af0ab4fbec6b5247ec5.r2.dev/image/35.jpg',
      hostingTime: '3Days 3h 30min',
      earnings: 1250,
      status: 'trusted',
    },
    {
      name: 'Janction Lanlord #002',
      image: 'https://pub-da89859eb37b4af0ab4fbec6b5247ec5.r2.dev/image/37.jpg',
      hostingTime: '3Days 3h 30min',
      earnings: 1250,
      status: 'untrusted',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (text, record) => (
        <div className="name">
          <div>
            <p>{text}</p>
            {record.status === 'trusted' && (
              <span className="trusted">
                <img src={trustImg} />
                In trust
              </span>
            )}
          </div>
          <img src={record.image} alt="node" />
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
            text={record.status === 'trusted' ? 'Hoisting' : 'Unescrow'}
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
        dataSource={data}
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
  const onShow = () => {
    setShowUnscrow(true);
  };
  const handleClick = () => {
    if (record.status === 'untrusted') {
      onShow();
      return;
    }
    console.log('trust');
  };
  return (
    <>
      <Button
        className={`${
          record.status == 'trusted' ? styles['create-btn'] : styles['pre']
        }`}
        onClick={handleClick}
      >
        {text}
      </Button>
      <Unescrow
        setIslModalOpen={setShowUnscrow}
        islModalOpen={showUnscrow}
        handleOk={onShow}
      />
    </>
  );
}
