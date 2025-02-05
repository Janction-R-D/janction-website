import React, { useEffect, useState } from 'react';
import Joyride from 'react-joyride';
import { steps, stepsMobile, customStyles } from './constants';
import { history } from 'umi';
import { Button, Modal } from 'antd';
import styles from './guide.less';
import { changeUserConfig } from '@/services/genesis';
import useScale from '@/hooks/useScale';
export default function Guide({ run, setRun }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isPC } = useScale();
  const routes = {
    2: '/genesis/dashboard',
    3: '/genesis/purchase',
    4: '/genesis/instance',
    5: '/genesis/orders',
    6: '/genesis/dashboard',
  };
  const updateConfig = async () => {
    const data = {
      pass_newbie_guide: true,
    };
    changeUserConfig(data);
  };
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    // if (index === 7 && action == 'next') {
    //   // Si el usuario está en el paso 1 y avanza, abrimos el menú
    //   setIsModalOpen(true);
    //   setRun(true);
    //   console.log(status);
    // }

    if (action === 'next' && routes[index] && isPC) {
      history.push(routes[index]);
    }
    if (status === 'finished' || status === 'skipped') {
      setRun(false);
      setIsModalVisible(true);
      showModal();
      //   updateConfig();
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setRun(false); // Detener el recorrido
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setRun(false); // Detener el recorrido
  };
  useEffect(() => {
    const updateConfig = async () => {
      const data = {
        pass_newbie_guide: false,
      };
      changeUserConfig(data);
    };
    updateConfig();
  }, []);
  return (
    <>
      <Joyride
        steps={isPC ? steps : stepsMobile}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={customStyles}
      />
      <Modal
        title="Welcome"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles['modal']}
        style={{
          borderRadius: '10px',
        }}
      >
        <div className={styles['modal-header']}>
          <h3 className={styles['modal-title']}>
            Thank you for using our service!
          </h3>
        </div>
        <div className={styles['modal-body']}>
          <p>
            We hope you enjoyed your experience. Feel free to explore more
            features!
          </p>
        </div>
        <div className={styles['modal-footer']}>
          <Button
            key="submit"
            className={styles['btn-primary']}
            onClick={handleOk}
          >
            Finish
          </Button>
        </div>
      </Modal>
    </>
  );
}
