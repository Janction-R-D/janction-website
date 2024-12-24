import storage from '@/utils/storage';
import { Upload, message } from 'antd';
import { useState } from 'react';

const UPLOAD_BASE_URL = '/v0/user/upload/avatar';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function AvatarUpload(props) {
  const { data, children, onChange, ...extra } = props;

  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const isLtMaxSize = file.size / 1024 / 1024 < 50;
    if (!isLtMaxSize) {
      message.error(
        'The size of the uploaded file cannot be larger than 2 MB!',
      );
    }
    return new Promise((resolve, reject) => {
      if (isLtMaxSize) {
        resolve();
      } else {
        reject();
      }
    });
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        onChange && onChange(url);
      });
    }
  };

  const uploadProps = {
    data,
    multiple: false,
    name: 'avatar',
    onChange: handleChange,
    action: UPLOAD_BASE_URL,
    listType: 'picture-card',
    maxCount: 1,
    showUploadList: false,
    headers: { ...(storage.get('AUTH_HEADERS') || {}) },
    beforeUpload,
    ...(extra || {}),
  };

  return <Upload {...uploadProps}>{children}</Upload>;
}
