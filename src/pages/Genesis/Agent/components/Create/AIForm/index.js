import React from 'react';
import { Form, Input, Upload, Avatar, Button, message } from 'antd';
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

export default function AIForm() {
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [hovered, setHovered] = React.useState(false);
  const [loading, setLoading] = React.useState(0);
  const [form] = Form.useForm();

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
    const params = {
      name: values.filename,
      description: values.file_description,
    };

    console.log(params);
    console.log('values : ', values);
    // setLoading(1);
    try {
      //first create a base file route
      const req = await fetchBaseRoutes(params);
      const { id: knowleageId } = req || {};
      console.log('knowleageId', knowleageId);
      if (!knowleageId) {
        throw new Error(
          'Something went wrong creating knowleage info, maybe id already exist',
        );
      }
      //then upload image
      const realFile = values.cover?.originFileObj || values.cover;
      const uploadImg = (await fetchUploadImg(realFile)) || {};
      console.log('uploadImg', uploadImg);
      if (!uploadImg) {
        throw new Error('Something went wrong uploading Agent Image');
      }
      //then upload base file knowloage
      const knowleageFiles = values.files[0].originFileObj;

      const reqBaseUld = await fetchUploadFiles(knowleageId, knowleageFiles);
      console.log('reqBaseUld', reqBaseUld);
      //finaly create the agent
      const createParams = {
        name: values.name,
        description: values.description,
        cover: uploadImg,
        tags: values.tags,
        knowledge_base_id: knowleageId,
      };

      const createAgent = await fetchCreateAgent(createParams);
      console.log('createAgent', createAgent);
      message.success('Agent Created Successfully');
      setLoading(2);
      setTimeout(() => {
        history.push('/genesis/agent');
      }, 2000);
    } catch (err) {
      console.error('Error:', err);
      message.error('Error submitting form!');
      setLoading(0);
    }
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
        label="Cover"
        rules={[{ required: true, message: 'Please upload the Agent Picture' }]}
      >
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error('Only image files are allowed');
              return Upload.LIST_IGNORE;
            }

            // Guardar en el form y mostrar preview
            const previewUrl = URL.createObjectURL(file);
            setAvatarUrl(previewUrl);
            form.setFieldsValue({ cover: file });

            // Evitar que Ant Upload haga la subida automática
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
        label="Name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <Input
          placeholder="Enter a name"
          className={styles.input}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item name="tags" label="Tags">
        <TagsInputGroup />
      </Form.Item>
      <span style={{ paddingBottom: '12px', color: '#ffffffd9' }}>Upload</span>
      <UploadFiles />
      <Form.Item
        name="filename"
        label="Knowleage Filename"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <Input
          placeholder="Enter a filename"
          className={styles.input}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="file_description"
        label="Knowleage description"
        rules={[
          { required: true, message: 'Please enter the knowleage description' },
        ]}
      >
        <TextArea
          autoSize={{ minRows: 5 }}
          placeholder="Describe the content of the files"
          className={styles.textArea}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: 'Please enter the Agent description' },
        ]}
      >
        <TextArea
          autoSize={{ minRows: 5 }}
          placeholder="Describe the functions and purposes of the agent"
          className={styles.textArea}
        />
      </Form.Item>
      <Form.Item>
        {loading === 0 && (
          <Button htmlType="submit" className={styles.submitButton}>
            Start creating
            <span className={styles.icon_rotate}>
              <ArrowUpOutlined />
            </span>
          </Button>
        )}
        {loading === 1 && <LoadingButton text="Creating" />}
        {loading === 2 && <LoadingFinish text="Success" />}
      </Form.Item>
    </Form>
  );
}
