import React from 'react';
import { Form, Input, Upload, Avatar, Button, message, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  UploadOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import TagsInputGroup from './components/Tags';
import { LoadingButton, LoadingFinish } from '../Buttons';
import UploadFiles from '../UploadFile';
import {
  fetchBaseRoutes,
  fetchCreateAgent,
  fetchUploadFiles,
  fetchUploadImg,
} from '@/services/genesis/agents';
import { history } from 'umi';
import { useIntl } from 'umi';

export default function AIForm() {
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [hovered, setHovered] = React.useState(false);
  const [loading, setLoading] = React.useState(0);
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const handleAvatarUpload = (info) => {
    if (info.file.status === 'done') {
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(url);
      // Puedes almacenar en form si deseas enviar luego
      form.setFieldsValue({ cover: info.file.originFileObj });
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarUrl(null);
    form.setFieldsValue({ cover: null });
  };

  const handleSubmit = async (values) => {
    console.log('hola');
    const params = {
      name: values.filename,
      description: values.file_description,
    };

    // console.log(params);
    // console.log('values : ', values);
    setLoading(1);
    try {
      //first create a base file route
      const req = await fetchBaseRoutes(params);
      const { id: knowleageId } = req || {};
      console.log('knowleageId', knowleageId);
      if (!knowleageId) {
        throw new Error(formatMessage({ id: 'aiForm.error.knowleageId' }));
      }
      //then upload image
      const realFile = values.cover?.originFileObj || values.cover;
      const uploadImg = (await fetchUploadImg(realFile)) || {};
      // console.log('uploadImg', uploadImg);
      if (!uploadImg) {
        throw new Error(formatMessage({ id: 'aiForm.error.uploadImage' }));
      }
      //then upload base file knowloage
      const knowleageFiles = values.files;

      const reqBaseUld = await fetchUploadFiles(knowleageId, knowleageFiles);
      // console.log('reqBaseUld', reqBaseUld);
      //finaly create the agent
      const createParams = {
        name: values.name,
        description: values.description,
        cover: uploadImg,
        tags: values.tags,
        knowledge_base_id: knowleageId,
        is_public: values.is_public,
      };

      const createAgent = await fetchCreateAgent(createParams);
      // console.log('createAgent', createAgent);
      message.success(formatMessage({ id: 'aiForm.message.success' }));
      setLoading(2);
      setTimeout(() => {
        history.replace('/genesis/agent');
      }, 2000);
    } catch (err) {
      console.error('Error:', err);
      message.error(formatMessage({ id: 'aiForm.message.error' }));
      setLoading(0);
    }
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className={styles.wrapper}
    >
      <Form.Item
        name="cover"
        label={formatMessage({ id: 'aiForm.cover.label' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'aiForm.cover.required' }),
          },
        ]}
      >
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error(formatMessage({ id: 'aiForm.cover.invalidType' }));
              return Upload.LIST_IGNORE;
            }
            const previewUrl = URL.createObjectURL(file);
            setAvatarUrl(previewUrl);
            form.setFieldsValue({ cover: file });

            return Upload.LIST_IGNORE;
          }}
        >
          <span
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
              <div className={styles.deleteButton} onClick={handleDeleteAvatar}>
                <DeleteOutlined />
              </div>
            )}
          </span>
        </Upload>
      </Form.Item>

      <Form.Item
        name="name"
        label={formatMessage({ id: 'aiForm.name.label' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'aiForm.name.required' }),
          },
        ]}
      >
        <Input
          placeholder={formatMessage({ id: 'aiForm.name.placeholder' })}
          className={styles.input}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="is_public"
        label={formatMessage({ id: 'aiForm.isPublic.label' })}
      >
        <Switch onChange={onChange} />
      </Form.Item>

      <Form.Item name="tags" label={formatMessage({ id: 'aiForm.tags.label' })}>
        <TagsInputGroup />
      </Form.Item>

      <span style={{ paddingBottom: '12px', color: '#ffffffd9' }}>
        {formatMessage({ id: 'aiForm.upload.label' })}
      </span>
      <UploadFiles />

      <Form.Item
        name="filename"
        label={formatMessage({ id: 'aiForm.filename.label' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'aiForm.filename.required' }),
          },
        ]}
      >
        <Input
          placeholder={formatMessage({ id: 'aiForm.filename.placeholder' })}
          className={styles.input}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="file_description"
        label={formatMessage({ id: 'aiForm.fileDescription.label' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'aiForm.fileDescription.required' }),
          },
        ]}
      >
        <TextArea
          autoSize={{ minRows: 5 }}
          placeholder={formatMessage({
            id: 'aiForm.fileDescription.placeholder',
          })}
          className={styles.textArea}
        />
      </Form.Item>

      <Form.Item
        name="description"
        label={formatMessage({ id: 'aiForm.description.label' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'aiForm.description.required' }),
          },
        ]}
      >
        <TextArea
          autoSize={{ minRows: 5 }}
          placeholder={formatMessage({ id: 'aiForm.description.placeholder' })}
          className={styles.textArea}
        />
      </Form.Item>

      <Form.Item>
        {loading === 0 && (
          <Button htmlType="submit" className={styles.submitButton}>
            {formatMessage({ id: 'aiForm.submit.label' })}
            <span className={styles.icon_rotate}>
              <ArrowUpOutlined />
            </span>
          </Button>
        )}
        {loading === 1 && (
          <LoadingButton
            text={formatMessage({ id: 'aiForm.submit.creating' })}
          />
        )}
        {loading === 2 && (
          <LoadingFinish
            text={formatMessage({ id: 'aiForm.submit.success' })}
          />
        )}
      </Form.Item>
    </Form>
  );
}
