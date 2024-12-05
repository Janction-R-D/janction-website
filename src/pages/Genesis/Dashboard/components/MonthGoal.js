import React, { useEffect, useState } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './index.less';
import { MonthlyGoal } from '@/services/genesis';
export default function MonthGoal({
  handleCancel,
  getLessors,
  handleOk,
  isModalOpen,
}) {
  const [input, setInput] = useState(null);
  const handleClick = (e) => {
    const data = { monthly_goal: Number(input) };
    console.log(data);
    MonthlyGoal(data)
      .then((res) => {
        getLessors();
        setInput(null);
        handleOk();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal
      className={styles['card-modal']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      header={false}
      height={300}
      width={400}
      closable={false}
    >
      <p>Month Goal :</p>
      <Input
        placeholder="Enter the Month Goal"
        type="number"
        className={styles['search-input']}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={handleClick}
      />

      <Button className={styles['create-btn']} onClick={handleClick}>
        {' '}
        Confirm
      </Button>
    </Modal>
  );
}
