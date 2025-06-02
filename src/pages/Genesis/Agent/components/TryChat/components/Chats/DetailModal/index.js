import { useState } from 'react';
import { Modal, Rate } from 'antd';
import image from '@/assets/images/genesis/agent/agent_1.png';
import styles from './index.less';

export default function DetailModal({ onOpen, isOpen, setIsOpen }) {
  const handleCancel = () => {
    setIsOpen(false);
  };
  const [value, setValue] = useState(2.5);

  // Lógica para cambiar el valor
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const tags = ['AI Assistant', 'Intelligent reply'];
  return (
    <Modal
      open={isOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
      closable={false}
      className={styles['backdrop-modal']}
      footer={false}
      style={{
        top: 140, // Ajusta la distancia superior
        right: -420, // Establece la posición a la derecha
      }}
    >
      <div className={styles.card}>
        <img className={styles.image} src={image} alt="FinChat AI" />
        <div className={styles.overlay}>
          <div className={styles.description}>
            <div className={styles.description_left}>
              <div className={styles.title}> FinChat AI</div>
              <div className={styles.score}>Score: 9.9</div>
            </div>
          </div>
        </div>
      </div>
      <main className={styles.content}>
        <div className={styles.desc}>
          <p className={styles.desc_title}>Description</p>
          <p className={styles.desc_text}>
            Elevate your brand identity with Logo AI's precision-crafted model.
            It's not just about creating logos; it's about bringing your unique
            brand story to life with designs that resonate. 🌟 Unveil the full
            potential of your vision and let your business shine. Dive into the
            world of AI-driven creativity with us!
          </p>
        </div>
        <div className={styles.buttons}>
          {tags.map((btn, i) => (
            <div key={i} className={styles.btn}>
              {btn}
            </div>
          ))}
        </div>
        <div className={styles['rate-container']}>
          <p> Score:</p>
          <div>
            <Rate
              allowHalf
              value={value}
              onChange={handleChange}
              style={{ fontSize: 30 }}
            />
          </div>
        </div>
      </main>
    </Modal>
  );
}
