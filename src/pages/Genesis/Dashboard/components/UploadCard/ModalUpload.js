import avatar1 from '@/assets/images/genesis/avatars/avatar-1.png';
import avatar2 from '@/assets/images/genesis/avatars/avatar-2.png';
import avatar3 from '@/assets/images/genesis/avatars/avatar-3.png';
import avatar4 from '@/assets/images/genesis/avatars/avatar-4.png';
import avatar5 from '@/assets/images/genesis/avatars/avatar-5.png';
import avatar6 from '@/assets/images/genesis/avatars/avatar-6.png';
import avatar7 from '@/assets/images/genesis/avatars/avatar-7.png';
import avatar8 from '@/assets/images/genesis/avatars/avatar-8.png';
import { Button, Modal, message } from 'antd';
import styles from './index.less';
import { changeUserConfig, fetchUserConfig } from '@/services/genesis';
import { useState } from 'react';
import storage from '@/utils/storage';
import { useModel } from 'umi';

const images = [
  { path: avatar1, name: 'Symphony star', alt: 'default one icon', id: 1 },
  { path: avatar2, name: 'Symphony violet', alt: 'default two icon', id: 2 },
  { path: avatar3, name: 'Symphony green', alt: 'default three icon', id: 3 },
  { path: avatar4, name: 'Symphony cyan', alt: 'default four icon', id: 4 },
  { path: avatar5, name: 'Symphony blue', alt: 'default five icon', id: 5 },
  { path: avatar6, name: 'Symphony sun', alt: 'default six icon', id: 6 },
  { path: avatar7, name: 'Symphony beidge', alt: 'default seven icon', id: 7 },
  { path: avatar8, name: 'Symphony meta', alt: 'default eight icon', id: 8 },
];
async function uploadAvatarToServer(imageUrl, fileName) {
  const UPLOAD_BASE_URL = '/v0/user/upload/avatar';

  try {
    // Intentar obtener el archivo como un Blob
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error('No se pudo obtener la imagen');
    }

    const blob = await res.blob();

    // Verifica si el archivo es realmente una imagen
    const mimeType = blob.type;

    if (!mimeType.startsWith('image/')) {
      throw new Error('El archivo no es una imagen válida');
    }

    // Crea un archivo File con el blob recibido
    const file = new File([blob], `${fileName.split(' ').join('_')}.png`, {
      type: mimeType,
    });
    console.log(file);
    const formData = new FormData();
    formData.append('avatar', file);

    // Subir el archivo
    const uploadRes = await fetch(UPLOAD_BASE_URL, {
      method: 'POST',
      body: formData,
      headers: {
        ...(storage.get('AUTH_HEADERS') || {}),
      },
    });

    if (!uploadRes.ok) {
      throw new Error('Error Uploading new avatar');
    }

    return await uploadRes.json();
  } catch (error) {
    message.error('Error Uploading new avatar');
    console.error(error);
  }
}

export default function ModalUpload(props) {
  const { avModalOpen, handleOk, setAvModaOpen, userConf, setUserConf } = props;
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const { avatarSnapUrl, setAvatarSnapUrl } = useModel('common');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleAvatarClick = (id) => {
    setSelectedAvatarId(id.name);
    setSelectedAvatar(id);
  };

  const handleConfirm = async () => {
    if (selectedAvatarId === null) {
      message.warning('Please select an avatar before confirming.');
      return;
    }

    try {
      await uploadAvatarToServer(selectedAvatar.path, selectedAvatar.name);
      message.success('Avatar updated successfully!');
      setAvatarSnapUrl(selectedAvatar.path);
      await fetchUserConfig();
      await onSkip();
      setAvModaOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onSkip = async () => {
    try {
      const payload = {
        ...userConf,
        default_avatar_status: true,
      };
      await changeUserConfig(payload);

      setAvModaOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    setAvModaOpen(false);
  };
  return (
    <Modal
      onCancel={handleCancel}
      open={avModalOpen}
      onOk={handleConfirm}
      footer={false}
      className={styles['modal__avatar']}
    >
      <section className={styles['modal__avatar__header']}>
        <p>Fresh Default Avatars Available! Time to Pick Yours!</p>
        <span>“Click” to select your preferred default avatar.</span>
      </section>

      <section className={styles['modal__avatar__images']}>
        {images.map((item, index) => (
          <div
            key={index}
            className={`${styles['modal__avatar__img__wrapper']} ${
              selectedAvatar?.name === item.name
                ? styles['modal__avatar__img--selected']
                : ''
            }`}
            onClick={() => handleAvatarClick(item)}
          >
            <img
              src={item.path}
              alt={item.alt}
              className={styles['modal__avatar__img']}
              aria-label={item.name}
            />
            {selectedAvatar?.name === item.name && (
              <span className={styles['modal__avatar__label']}>
                {item.name}
              </span>
            )}
          </div>
        ))}
      </section>

      <footer className={styles['modal__avatar__footer']}>
        <Button className={styles['cancel-btn']} onClick={onSkip}>
          Skip
        </Button>
        <Button
          type="primary"
          className={styles['create-btn']}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </footer>
    </Modal>
  );
}
