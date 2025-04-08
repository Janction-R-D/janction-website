import avatar1 from '@/assets/images/genesis/avatars/avatar-1.png';
import avatar2 from '@/assets/images/genesis/avatars/avatar-2.png';
import avatar3 from '@/assets/images/genesis/avatars/avatar-3.png';
import avatar4 from '@/assets/images/genesis/avatars/avatar-4.png';
import avatar5 from '@/assets/images/genesis/avatars/avatar-5.png';
import avatar6 from '@/assets/images/genesis/avatars/avatar-6.png';
import avatar7 from '@/assets/images/genesis/avatars/avatar-7.png';
import avatar8 from '@/assets/images/genesis/avatars/avatar-8.png';
import { Avatar, Button, message, Modal } from 'antd';
import styles from './index.less';
import AvatarUpload from '../AvatarUpload';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import { fetchUserAvatars, fetchUserConfig } from '@/services/genesis';
import storage from '@/utils/storage';

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
export default function UploadModal(props) {
  const { avModalOpen, handleOk, setAvModaOpen, avatar, address } = props;
  const [avaters, setAvaters] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { avatarSnapUrl, setAvatarSnapUrl } = useModel('common');
  const handleCancel = () => {
    setAvModaOpen(false);
  };
  const handleAvatarClick = (id) => {
    setSelectedAvatarId(id.name);
    setSelectedAvatar(id);
  };
  useEffect(() => {
    getAvaters();
  }, []);
  const getAvaters = async () => {
    try {
      const res = fetchUserAvatars();
      setAvaters(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async () => {
    if (selectedAvatarId === null) {
      setAvModaOpen(false);
      return;
    }

    try {
      setLoading(true);
      await uploadAvatarToServer(selectedAvatar.path, selectedAvatar.name);
      message.success('Avatar updated successfully!');
      setAvatarSnapUrl(selectedAvatar.path);
      await fetchUserConfig();
      setAvModaOpen(false);
    } catch (error) {
      message.error('Failed to update avatar.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onCancel={handleCancel}
      open={avModalOpen}
      onOk={handleOk}
      footer={false}
      className={styles['modal__avatar']}
    >
      <section className={styles['modal__avatar__header']}>
        <p>Default Avatars</p>
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
      <section className={styles['modal__avatar__uploaded']}>
        <span>Or upload a custom avatar</span>
        <div className={styles['avatars']}>
          <div className={styles['avatar']}>
            <img src={avatarSnapUrl || avatar(address)} />
          </div>
          <AvatarUpload
            onChange={setAvatarSnapUrl}
            className={styles['button-box']}
          >
            <Avatar
              size={64}
              icon={
                <i className="iconfont icon-add" style={{ fontSize: '48px' }} />
              }
            />
          </AvatarUpload>
        </div>
      </section>
      <footer className={styles['modal__avatar__footer']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          className={styles['create-btn']}
          onClick={handleConfirm}
          loading={loading}
        >
          Confirm
        </Button>
      </footer>
    </Modal>
  );
}
