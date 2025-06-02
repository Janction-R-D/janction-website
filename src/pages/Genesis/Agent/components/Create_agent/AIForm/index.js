import React from 'react';
import UploadFiles from '../UploadFile';
import styles from './index.less';
import { Avatar, Input, Switch, Upload } from 'antd';
import TagsInputGroup from './components/Tags';
import styled from '@emotion/styled';
import TextArea from 'antd/es/input/TextArea';
import StepButton from '@/components/button/step_button';
import { useIntl } from 'umi';
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  LoadingButton,
  LoadingFinish,
} from '@/components/button/loading_button';

/*
 * 这里要改成 表单获取 所有数据
 * */
export default function AIForm() {
  const { formatMessage } = useIntl();

  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [hovered, setHovered] = React.useState(false);
  const [loading, setLoading] = React.useState(0);

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      // 获取上传文件的URL
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
    <main className={styles['wrapper']}>
      <div className={styles['section']}>
        <span> {formatMessage({ id: 'create.cover' })}</span>
        <Upload
          showUploadList={false} // 隐藏文件列表
          beforeUpload={(file) => {
            // 限制文件类型为图片
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error('只能上传图片文件');
            }
            return isImage;
          }}
          onChange={handleUpload} // 添加文件变化处理
        >
          <div
            className={styles['avatar-container']}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar
              shape="square"
              size={64}
              className={styles['avatar']}
              src={avatarUrl} // 显示上传的图片
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
              <div className={styles['delete-button']} onClick={handleDelete}>
                <DeleteOutlined />
              </div>
            )}
          </div>
        </Upload>
      </div>
      <div className={styles['section']}>
        <span>{formatMessage({ id: 'create.name' })}</span>
        <Input
          placeholder={formatMessage({ id: 'create.name_holder' })}
          className={styles['input']}
        />
      </div>
      <div className={styles['section']}>
        <span>{formatMessage({ id: 'create.tags' })}</span>
        <TagsInputGroup />
      </div>
      <div className={styles['section']}>
        <span>{formatMessage({ id: 'create.upload' })}</span>
        <UploadFiles />
      </div>

      <div className={styles['section']}>
        <span>{formatMessage({ id: 'create.setting' })}</span>
        <div>
          <div className={styles['setting-item']}>
            <StyledSwitch />
            <div className={styles['setting-text']}>
              <div>{formatMessage({ id: 'create.setting_1_title' })}</div>
              <div className={styles['setting-description']}>
                {formatMessage({ id: 'create.setting_1_desc' })}
              </div>
            </div>
          </div>
          <div className={styles['setting-item']}>
            <StyledSwitch />
            <div className={styles['setting-text']}>
              <div>{formatMessage({ id: 'create.setting_2_title' })}</div>
              <div className={styles['setting-description']}>
                {formatMessage({ id: 'create.setting_2_desc' })}
              </div>
            </div>
          </div>
          <div className={styles['setting-item']}>
            <StyledSwitch />
            <div className={styles['setting-text']}>
              <div> {formatMessage({ id: 'create.setting_3_title' })}</div>
              <div className={styles['setting-description']}>
                {formatMessage({ id: 'create.setting_3_desc' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles['section']}>
        <span>{formatMessage({ id: 'create.prompt' })}</span>
        <div>
          <span>{formatMessage({ id: 'create.prompt_title' })}</span>
          <TextAreaStyled
            autoSize={{ minRows: 5 }}
            placeholder={formatMessage({ id: 'create.prompt_holder_1' })}
          />
          <TextAreaStyled
            autoSize={{ minRows: 5 }}
            placeholder={formatMessage({ id: 'create.prompt_holder_2' })}
          />
        </div>
      </div>
      <div className={styles['section']}>
        <span></span>
        <div>
          {loading === 0 && (
            <StepButton
              onClick={handleSubmit}
              text={formatMessage({ id: 'create.start_button' })}
            />
          )}
          {loading === 1 && (
            <LoadingButton text={formatMessage({ id: 'create.creating' })} />
          )}
          {loading === 2 && (
            <LoadingFinish
              text={formatMessage({ id: 'create.creating_success' })}
            />
          )}
        </div>
      </div>
    </main>
  );
}

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked,
  &.ant-switch-checked:hover {
    background: linear-gradient(
      90deg,
      #d670ff 0%,
      #66a2f7 40%,
      #6feecb 100%
    ) !important;
  }
`;
const TextAreaStyled = styled(TextArea)`
  width: 100%;
  min-height: 200px;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #434343;
  background-color: transparent;
  color: #fff;

  &::placeholder {
    color: #949494;
  }

  &:hover {
    background-color: transparent;
    border-color: #949494;
  }

  &:focus {
    background-color: transparent;
    outline: none;
    border-color: #949494;
  }
`;
