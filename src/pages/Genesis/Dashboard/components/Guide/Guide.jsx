import { useState } from 'react';
import Joyride from 'react-joyride';
import { steps, stepsMobile, customStyles, routes } from './constants';
import { history } from 'umi';
import { Button, Modal } from 'antd';
import styles from './guide.less';
import { changeUserConfig } from '@/services/genesis';
import useScale from '@/hooks/useScale';
export default function Guide({
  run,
  setRun,
  setIsModalOpen,
  setIsNotifyModalOpen,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isPC } = useScale();

  const updateConfig = async () => {
    try {
      const data = {
        pass_newbie_guide: true,
      };
      await changeUserConfig(data);
      showModal();
    } catch (err) {
      console.log(err);
    }
  };
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    if (index !== 1 && index !== 2) {
      setIsNotifyModalOpen(false); //  close notify modal
    }
    if (index === 2 || index === 3) {
      if (isPC) {
        setIsNotifyModalOpen(true); //  Open notify modal
      }
    }

    if (index !== 3 && index !== 4) {
      setIsModalOpen(false); //  close profile modal
    }
    if (index === 4 || index === 5 || index === 6) {
      setIsModalOpen(true); //  Open profile modal
    }

    if (action === 'next' || action === 'prev') {
      if (routes[index] && isPC) {
        history.push(routes[index]);
      }
    }
    if (status === 'finished' || status === 'skipped') {
      setRun(false);
      updateConfig();
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setRun(false);
    history.push('/genesis/dashboard'); // redirect to dashboard after finsih the guide
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setRun(false); // Detener el recorrido
  };

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
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles['modal']}
        style={{
          borderRadius: '14px',
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
