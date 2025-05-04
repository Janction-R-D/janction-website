import { useEffect, useState } from 'react';
import Joyride from 'react-joyride';
import {
  stepsLesse,
  setpsLessor,
  stepsMobile,
  customStyles,
  routesLessee,
  routesLesssor,
} from './constants';
import { history, useModel } from 'umi';
import { Button, Modal } from 'antd';
import styles from './guide.less';
import { changeUserConfig } from '@/services/genesis';
import useScale from '@/hooks/useScale';
import storage from '@/utils/storage';
import { set } from 'lodash';
export default function Guide({
  run,
  setRun,
  setIsModalOpen,
  setUserConf,
  setIsNotifyModalOpen,
  userConf,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [steps, setSteps] = useState(stepsLesse);
  const { isPC } = useScale();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  useEffect(() => {
    setTimeout(() => {
      if (!run && !isLessee) {
        setSteps(setpsLessor); // change the steps : if current mode isn't islessee
      }
    }, 1000);
  }, [isLessee]);
  const onIdentityChange = () => {
    if (!isPC) return;
    storage.set({ name: 'isLessee', value: !isLessee });
    setInitialState({
      ...initialState,
      isLessee: !isLessee,
    });
  };
  const updateConfig = async () => {
    try {
      const data = {
        ...userConf,
        pass_newbie_guide: true,
      };
      setUserConf(data);
      await changeUserConfig(data);
      showModal();
    } catch (err) {
      console.log(err);
    }
  };
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    //  Conditions to close or open the  modal notifications
    if (![1, 2].includes(index)) {
      setIsNotifyModalOpen(false); // close the notifications modal
    }
    if (isPC && isLessee && (index === 2 || index === 3)) {
      setIsNotifyModalOpen(true); // Open the notifications modal
    }

    // Conditions to close or open the profile modal
    if (![8, 9].includes(index)) {
      setIsModalOpen(false); // close the profile modal
    } else if ([8, 9, 10].includes(index)) {
      setIsModalOpen(true); // open the profile modal
    }

    // Logic to handle navigation between routes
    if (['next', 'prev', 'close'].includes(action)) {
      const routes = isLessee ? routesLessee : routesLesssor;
      const targetRoute = routes[index];
      if (targetRoute && isPC) {
        history.push(targetRoute);
      }
    }

    // Tour completion
    if (status == 'finished') {
      if (isLessee && isPC) {
        setRun(false);
        onIdentityChange();
      } else {
        updateConfig();
      }
    }
    if (status == 'skipped') {
      updateConfig();
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);

    history.push('/genesis/dashboard'); // redirect to dashboard after finsih the guide
    onIdentityChange();
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
        showProgress={false}
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
