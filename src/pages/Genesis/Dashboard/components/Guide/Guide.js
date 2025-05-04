import React, { useState } from 'react';
import { Button, Modal, Steps } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styles from './index.less'; // Importamos los estilos con clases únicas
import StepOne from '../StepOne/StepOne';
import { SYSTEM_LIST } from '@/constant';

const DEFAULT = {
  system: SYSTEM_LIST[0].value,
};
const Guide = ({ onOpen, isOpen, setIsOpen }) => {
  const [selectedValues, setSelectedValues] = useState(DEFAULT);

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      className={styles['install-node-container']}
      onCancel={handleCancel}
      open={isOpen}
      onOk={onOpen}
      footer={false}
      closable={false}
    >
      <main className={styles['install-wizard-steps']} />
      <StepOne
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
      <div className={styles['install-wizard-footer']}>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          className={styles['btn']}
        >
          Download
        </Button>
      </div>
    </Modal>
  );
};

export default Guide;
