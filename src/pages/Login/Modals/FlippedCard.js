import { useState } from 'react';
import { Modal } from 'antd';
import styles from './index.less';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Recover from './Recover';

const FlippedModal = ({
  open,
  onCancel,
  setLoading,
  setIsSuccess,
  isFlipped,
  setIsFlipped,
  mode,
  setMode,
}) => {
  const [email, setEmail] = useState('');
  const [sended, setSended] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      className={styles.loginModal}
      width={800}
      centered
    >
      <div className={`${styles.modalContent} ${isFlipped ? styles.flip : ''}`}>
        <div
          className={`${styles.cardFront} ${
            !isFlipped ? styles.visible : styles.hidden
          }`}
        >
          <LogIn
            setIsFlipped={setIsFlipped}
            onCancel={onCancel}
            setLoading={setLoading}
            mode={mode}
            setMode={setMode}
          />
        </div>

        <div
          className={`${styles.cardBack} ${
            isFlipped && mode === 'signup' ? styles.visible : styles.hidden
          }`}
        >
          <SignUp
            email={email}
            setEmail={setEmail}
            sended={sended}
            setSended={setSended}
            confirmed={confirmed}
            setConfirmed={setConfirmed}
            setIsFlipped={setIsFlipped}
            onCancel={onCancel}
            setSuccessModalVisible={setIsSuccess}
            mode={mode}
            setMode={setMode}
          />
        </div>
        <div
          className={`${styles.cardBack} ${
            isFlipped && mode === 'recover' ? styles.visible : styles.hidden
          }`}
        >
          <Recover
            email={email}
            setEmail={setEmail}
            sended={sended}
            setSended={setSended}
            confirmed={confirmed}
            setConfirmed={setConfirmed}
            setIsFlipped={setIsFlipped}
            onCancel={onCancel}
            setSuccessModalVisible={setIsSuccess}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FlippedModal;
