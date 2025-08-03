import {
  DeleteOutlined,
  FileAddOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import styles from './index.less';
import { useRef, useState } from 'react';
import { useIntl } from 'umi';

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return <FileImageOutlined />;
    case 'pdf':
      return <FilePdfOutlined />;
    case 'doc':
    case 'docx':
      return <FileWordOutlined />;
    case 'text':
    case 'txt':
      return <FileTextOutlined />;
    case 'xls':
    case 'xlsx':
      return <FileExcelOutlined />;
    default:
      return <FileOutlined />;
  }
};

const UploadDoc = ({ value = [], onChange }) => {
  const { formatMessage } = useIntl();
  const uploadRef = useRef();
  const [files, setFiles] = useState([]);

  const handleRemove = (file) => {
    const newFiles = value.filter((f) => f.uid !== file.uid);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const triggerUpload = () => {
    uploadRef.current?.click();
  };

  const handleChange = (e) => {
    const MAX_SIZE = 1024 * 1024 * 10; // 10MB
    const MAX_FILES = 5;
    const files = Array.from(e.target.files);

    const validFiles = [];
    const oversizedFiles = [];
    const totalAfterAdding = value.length + files.length;

    if (totalAfterAdding > MAX_FILES) {
      message.error(formatMessage({ id: 'uploadDoc.limitExceeded' }));
      e.target.value = '';
      return;
    }

    files.forEach((file) => {
      if (file.size <= MAX_SIZE) {
        validFiles.push(file);
      } else {
        oversizedFiles.push(file.name);
      }
    });

    if (oversizedFiles.length) {
      message.error(
        `${formatMessage({ id: 'uploadDoc.oversized' })}${oversizedFiles.join(
          ', ',
        )}`,
      );
    }

    const newFiles = validFiles.map((file, index) => {
      const fileName = file.name;
      const extMatch = fileName.match(/(\.[^.]+)$/);
      const extension = extMatch ? extMatch[1] : '';
      const nameNoExt = fileName.replace(extension, '');

      let displayName = fileName;
      if (nameNoExt.length >= 20) {
        const first = nameNoExt.slice(0, 15);
        const last = nameNoExt.slice(-5);
        displayName = `${first}...${last}${extension}`;
      }

      return {
        uid: `${Date.now()}-${index}`,
        name: displayName,
        status: 'done',
        originFileObj: file,
      };
    });

    const allFiles = [...value, ...newFiles];
    setFiles(allFiles);
    onChange?.(allFiles);
    e.target.value = '';
  };

  return (
    <div className={styles.uploadDoc}>
      <input
        ref={uploadRef}
        className={styles.hiddenUpload}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleChange}
      />

      <div className={styles.fileListContainer}>
        {value.map((file) => (
          <div key={file.uid} className={styles.fileItem}>
            <div className={styles.fileTypeIcon}>{getFileIcon(file.name)}</div>
            <div className={styles.fileName}>{file.name}</div>
            <DeleteOutlined
              title={formatMessage({ id: 'uploadDoc.deleteTitle' })}
              onClick={() => handleRemove(file)}
              className={styles.deleteIcon}
            />
          </div>
        ))}
      </div>

      {files.length <= 4 && (
        <div className={styles.textDesc} onClick={triggerUpload}>
          <div className={styles.descTitle}>
            <FileAddOutlined style={{ fontSize: '24px' }} />
            <div style={{ marginLeft: 12 }}>
              {formatMessage({ id: 'uploadDoc.dragDrop' })}
            </div>
          </div>
          <div className={styles.descContent}>
            {formatMessage({ id: 'uploadDoc.supportedFormats' })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDoc;
