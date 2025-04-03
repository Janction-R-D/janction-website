import avatar1 from '@/assets/images/genesis/avatars/avatar-1.png';
import avatar2 from '@/assets/images/genesis/avatars/avatar-2.png';
import avatar3 from '@/assets/images/genesis/avatars/avatar-3.png';
import avatar4 from '@/assets/images/genesis/avatars/avatar-4.png';
import avatar5 from '@/assets/images/genesis/avatars/avatar-5.png';
import avatar6 from '@/assets/images/genesis/avatars/avatar-6.png';
import avatar7 from '@/assets/images/genesis/avatars/avatar-7.png';
import avatar8 from '@/assets/images/genesis/avatars/avatar-8.png';
import { Button, Modal } from 'antd';
import styles from './index.less';
import { userConfig } from '@/services/genesis';

const images = [
  { path: avatar1, name: 'Symphony star', alt: 'default one icon' },
  { path: avatar2, name: 'Symphony violet', alt: 'default two icon' },
  { path: avatar3, name: 'Symphony green', alt: 'default three icon' },
  { path: avatar4, name: 'Symphony cyan', alt: 'default four icon' },
  { path: avatar5, name: 'Symphony blue', alt: 'default five icon' },
  { path: avatar6, name: 'Symphony sun', alt: 'default six icon' },
  { path: avatar7, name: 'Symphony beidge', alt: 'default seven icon' },
  { path: avatar8, name: 'Symphony meta', alt: 'default eight icon' },
];
export default function ModalUpload(props) {
  const { avModalOpen, handleOk, setAvModaOpen } = props;
  const handleCancel = async () => {
    try {
      const payload = {
        default_avatar_status: true,
      };
      const res = userConfig(payload);

      // setAvModaOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const onCancel = () => {
    setAvModaOpen(false);
  };
  return (
    <Modal
      onCancel={onCancel}
      open={avModalOpen}
      onOk={handleOk}
      footer={false}
      className={styles['modal__avatar']}
    >
      <section className={styles['modal__avatar__header']}>
        <p>Fresh Default Avatars Available! Time to Pick Yours!</p>
        <span>“Click” to select your preferred default avatar.</span>
      </section>
      <section className={styles['modal__avatar__images']}>
        {images.map((item, index) => (
          <img
            src={item.path}
            alt={item.alt}
            key={index}
            className={styles['modal__avatar__img']}
            aria-label={item.name}
          />
        ))}
      </section>
      <footer className={styles['modal__avatar__footer']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Skip
        </Button>
        <Button type="primary" className={styles['create-btn']}>
          Confirm
        </Button>
      </footer>
    </Modal>
  );
}
