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
import styled from '@emotion/styled';
import { useIntl } from '@@/plugin-locale/localeExports';

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

const UploadDoc = () => {
  const [files, setFiles] = React.useState([]);
  const uploadRef = React.useRef(); // 创建ref
  const { formatMessage } = useIntl();

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.uid !== file.uid));
  };

  const triggerUpload = () => {
    uploadRef.current?.click(); // 手动触发 input 点击
  };

  return (
    <div>
      <HiddenUpload
        ref={uploadRef}
        multiple
        type="file"
        onChange={(e) => {
          const newFiles = Array.from(e.target.files).map((file, index) => {
            const fileName = file.name;
            const extensionMatch = fileName.match(/(\.[^.]+)$/); // 后缀
            const extension = extensionMatch ? extensionMatch[1] : '';
            const nameWithoutExtension = fileName.replace(extension, '');

            let formattedName = fileName;

            if (nameWithoutExtension.length >= 20) {
              const first4 = nameWithoutExtension.slice(0, 15);
              const last4 = nameWithoutExtension.slice(-5);
              formattedName = `${first4}...${last4}${extension}`;
            }

            return {
              uid: `${Date.now()}-${index}`,
              name: formattedName,
              status: 'done',
              originFileObj: file,
            };
          });

          setFiles((prev) => [...prev, ...newFiles]);
          e.target.value = '';
        }}
      />

      <FileListContainer>
        {files.map((file) => (
          <FileItem key={file.uid}>
            <div className={'file_type_icon'}>{getFileIcon(file.name)}</div>
            <FileName>{file.name}</FileName>
            <DeleteIcon onClick={() => handleRemove(file)} />
          </FileItem>
        ))}
      </FileListContainer>

      <TextDesc
        // icon={<UploadOutlined />}
        onClick={triggerUpload}
      >
        <div className={'desc_title'}>
          <UploadOutlined style={{ color: 'white' }} />
          <div style={{ marginLeft: 12 }}>
            {formatMessage({ id: 'create.upload_text' })}
          </div>
        </div>
        <div className={'desc_content'}>
          <div>{formatMessage({ id: 'create.upload_textdesc' })}</div>
        </div>
      </TextDesc>
    </div>
  );
};

export default UploadDoc;
// 使用styled components定义样式
const HiddenUpload = styled.input`
  display: none;
`;

const FileListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 8px;
  border: 1px solid #434343;
  border-radius: 4px;
  margin-bottom: 8px;

  .file_type_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #43434320;
    border-radius: 4px;
    font-size: 18px;
    color: #fff;
  }
`;

const FileName = styled.div`
  flex: 1;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteIcon = styled(DeleteOutlined)`
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #ff4d4f;
  }
`;

const TextDesc = styled.div`
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: bold;

  .desc_title {
    display: flex;
    align-items: center;
    border: 1px solid #434343;
    padding: 8px 12px;
    border-radius: 26px;
    background-color: #434343;
  }

  .desc_content {
    margin-top: 8px;
    font-size: 14px;
    color: #888;
  }
`;
