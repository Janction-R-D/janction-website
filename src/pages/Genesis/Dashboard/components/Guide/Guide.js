import React, { useState } from 'react';
import { Button, Modal, Steps } from 'antd';
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import styles from './index.less'; // Importamos los estilos con clases únicas
import StepOne from '../StepOne/StepOne';
import { SYSTEM_LIST } from '@/constant';
import { links } from '@/utils/lang';
const DEFAULT = {
  system: SYSTEM_LIST[0].value,
};

const Guide = ({ onOpen, isOpen, setIsOpen }) => {
  const [selectedValues, setSelectedValues] = useState(DEFAULT);
  const [downloadLink, setDownloadLink] = useState();
  const [loading, setLoading] = useState(false);
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
        links={links}
        setDownloadLink={setDownloadLink}
      />
      {downloadLink && (
        <div className={styles['install-wizard-footer']}>
          <a href={downloadLink} download>
            <Button type="primary" className={styles['btn']}>
              Download
              <span className={styles.icon}>
                <DownloadOutlined />
              </span>
            </Button>
          </a>
        </div>
      )}
    </Modal>
  );
};

export default Guide;
