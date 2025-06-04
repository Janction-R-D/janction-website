import React from 'react';
import {
  DeleteOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import styles from './index.less';

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
    case 'xls':
    case 'xlsx':
      return <FileExcelOutlined />;
    default:
      return <FileOutlined />;
  }
};

const UploadDoc = ({ onChange }) => {
  const [files, setFiles] = React.useState([]);
  const uploadRef = React.useRef();

  const handleRemove = (file) => {
    const newFiles = files.filter((f) => f.uid !== file.uid);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const triggerUpload = () => {
    uploadRef.current?.click();
  };

  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => {
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

    const allFiles = [...files, ...newFiles];
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
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif"
        onChange={handleChange}
      />

      <div className={styles.fileListContainer}>
        {files.map((file) => (
          <div key={file.uid} className={styles.fileItem}>
            <div className={styles.fileTypeIcon}>{getFileIcon(file.name)}</div>
            <div className={styles.fileName}>{file.name}</div>
            <DeleteOutlined
              title="Eliminar archivo"
              onClick={() => handleRemove(file)}
              className={styles.deleteIcon}
            />
          </div>
        ))}
      </div>

      <div className={styles.textDesc} onClick={triggerUpload}>
        <div className={styles.descTitle}>
          <UploadOutlined />
          <div style={{ marginLeft: 12 }}>Drg and drop</div>
        </div>
        <div className={styles.descContent}>Support Word/pdf/markdown</div>
      </div>
    </div>
  );
};

export default UploadDoc;
