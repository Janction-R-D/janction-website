import { useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './modal.less';

export default function PorifilePicture({
  handleCancel,
  isModalOpen,
  handleOk,
  setImgUrl,
  imgUrl,
}) {
  const [inputUrl, setinputUrl] = useState(imgUrl);
  const [imageBlob, setImageBlob] = useState(null);

  const handleChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setinputUrl(e.target.result);
      };
      reader.readAsDataURL(newFile);
      setImageBlob(newFile);
    }
  };

  // const sendImageToServer = async (blob) => {
  //   const formData = new FormData();
  //   formData.append('file', blob);

  //   try {
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload image');
  //     }

  //     const result = await response.json();
  //     console.log('Image uploaded successfully:', result);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  const handleClick = () => {
    setImgUrl(inputUrl);
    // Send the image blob to the back end
    // if (imageBlob) {
    //   sendImageToServer(imageBlob);
    // }
    handleCancel();
  };

  return (
    <Modal
      className={styles['card-modal']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      header={false}
      height={300}
      width={400}
      closable={false}
    >
      <div>
        <h3 className={styles['card-title']}>Change your profile picture</h3>
      </div>
      <img src={inputUrl} className={styles['card-modal-img']} />
      <label className={styles['label']}>
        <input
          type="file"
          onChange={handleChange}
          className={styles['card-input']}
        />
        <div className={styles['input-btn']}>Change Picture</div>
      </label>
      <div className={styles['buttons']}>
        <Button className={styles['create-btn']} onClick={handleClick}>
          Confirm
        </Button>
        <Button
          className={styles['pre']}
          onClick={() => {
            setinputUrl(imgUrl);
            handleCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
