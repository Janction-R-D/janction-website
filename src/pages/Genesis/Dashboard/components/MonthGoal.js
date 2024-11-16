import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './index.less';
export default function MonthGoal({
  handleCancel,
  handleOk,
  isModalOpen,
  setMonthGoal,
}) {
  const [input, setInput] = useState();
  const handleClick = (e) => {
    setMonthGoal(input);
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
      />

      <Button className={styles['create-btn']} onClick={handleClick}>
        {' '}
        Confirm
      </Button>
    </Modal>
  );
}
