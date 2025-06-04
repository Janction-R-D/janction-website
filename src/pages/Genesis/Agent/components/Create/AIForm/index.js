import React from 'react';
import styles from './index.less';
import { Avatar, Button, Input, Switch, Upload } from 'antd';
import TagsInputGroup from './components/Tags';
import TextArea from 'antd/es/input/TextArea';

import {
  ArrowUpOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { LoadingButton, LoadingFinish } from '../Buttons';
import UploadFiles from '../UploadFile';

export default function AIForm() {
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [hovered, setHovered] = React.useState(false);
  const [loading, setLoading] = React.useState(0);

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(url);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setAvatarUrl(null);
  };

  const handleSubmit = () => {
    setLoading(1);
    setTimeout(() => {
      setLoading(2);
    }, 2000);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.section}>
        <span>Cover</span>
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error('error');
            }
            return isImage;
          }}
          onChange={handleUpload}
        >
          <div
            className={styles.avatarContainer}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar
              shape="square"
              size={64}
              className={styles.avatar}
              src={avatarUrl}
              icon={
                !avatarUrl && (
                  <UploadOutlined
                    style={{
                      fontSize: '24px',
                    }}
                  />
                )
              }
            />
            {avatarUrl && hovered && (
              <div className={styles.deleteButton} onClick={handleDelete}>
                <DeleteOutlined />
              </div>
            )}
          </div>
        </Upload>
      </div>

      <div className={styles.section}>
        <span>Name</span>
        <Input placeholder={'Enter a name'} className={styles.input} />
      </div>

      <div className={styles.section}>
        <span>Tags</span>
        <TagsInputGroup />
      </div>

      <div className={styles.section}>
        <span>Upload</span>
        <UploadFiles />
      </div>

      <div className={styles.section}>
        <span>Description</span>
        <TextArea
          autoSize={{ minRows: 5 }}
          placeholder={'Describe the functions and purposes of the agent'}
          className={styles.textArea}
        />
      </div>
      <div className={styles.section}>
        <span>Setting</span>
        <div>
          {[
            {
              label:
                ' Collect user feedback and suggestions on Agent responses',
              title: 'Allow user feedback',
            },
            {
              label: 'Display the source of referenced knowledge in the answer',
              title: 'Enable knowledge citation',
            },
            {
              label: 'Record the conversation history between users and agents',
              title: 'Enable dialogue history',
            },
          ].map((item) => (
            <div className={styles.settingItem} key={item.label}>
              <Switch className={styles.customSwitch} />
              <div className={styles.settingText}>
                <div>{item?.title}</div>
                <div className={styles.settingDescription}>{item?.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span>Prompt</span>
        <div>
          <span>
            Configure system prompt words and contextual queries for Agent
          </span>
          <TextArea
            autoSize={{ minRows: 5 }}
            placeholder={'System prompt words'}
            className={styles.textArea}
          />
          <TextArea
            autoSize={{ minRows: 5 }}
            placeholder={
              'Input context query for retrieving relevant knowledge'
            }
            className={styles.textArea}
          />
        </div>
      </div>

      <div className={styles.section}>
        <span></span>
        <div>
          {loading === 0 && (
            <Button onClick={handleSubmit} className={styles.submitButton}>
              Start creating
              <span className={styles.icon_rotate}>
                <ArrowUpOutlined />
              </span>
            </Button>
          )}
          {loading === 1 && <LoadingButton text="Creating" />}
          {loading === 2 && <LoadingFinish text="Success" />}
        </div>
      </div>
    </main>
  );
}
