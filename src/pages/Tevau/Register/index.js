/**
 * 卡片信息注册页面
 * 独立页面，不在 Layout 中
 */

import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Upload,
  Button,
  message,
  Grid,
  Image,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { history } from 'umi';
import ArrowIcon from '@/components/Tevau/ArrowIcon';
import styles from './index.less';
import '@/styles/common/button.less';

const { Option } = Select;

const CardRegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [idType, setIdType] = useState('IDcard');
  const [idFrontFileList, setIdFrontFileList] = useState([]);
  const [idBackFileList, setIdBackFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const screens = Grid.useBreakpoint();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // TODO: 实现提交逻辑
      console.log('Form values:', values);
      message.success('Registration submitted successfully!');
      // 提交成功后可以跳转
      // history.push('/genesis/_Tevau/cards');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleIdTypeChange = (e) => {
    setIdType(e.target.value);
  };

  const createUploadProps = (fileList, setFileList) => ({
    beforeUpload: (file) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPG) {
        message.error('You can only upload JPG/PNG file!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
      }
      // 创建预览 URL 并添加到文件对象
      const fileWithPreview = {
        ...file,
        uid: file.uid || `-${Date.now()}`,
        name: file.name,
        status: 'done',
        thumbUrl: URL.createObjectURL(file),
        url: URL.createObjectURL(file),
        originFileObj: file,
      };
      setFileList([fileWithPreview]);
      return false; // 阻止自动上传
    },
    fileList: fileList,
    onRemove: () => {
      // 清理预览 URL，避免内存泄漏
      if (fileList[0]?.thumbUrl) {
        URL.revokeObjectURL(fileList[0].thumbUrl);
      }
      if (fileList[0]?.url) {
        URL.revokeObjectURL(fileList[0].url);
      }
      setFileList([]);
    },
    onPreview: (file) => {
      // 使用 Modal 预览，而不是打开新页面
      const url =
        file.thumbUrl ||
        file.url ||
        (file.originFileObj ? URL.createObjectURL(file.originFileObj) : '');
      if (url) {
        setPreviewImage(url);
        setPreviewVisible(true);
      }
    },
    showUploadList: {
      showPreviewIcon: true, // 显示预览图标
      showRemoveIcon: true, // 显示删除图标
    },
  });

  return (
    <div className={styles['register-page']}>
      <div className={styles['left-section']}>
        <img
          src={
            screens.md
              ? require('@/assets/images/tevau/fingerBig.png')
              : require('@/assets/images/tevau/fingerSmall.png')
          }
          alt="background"
          className={styles['background-image']}
        />
        {!screens.md && (
          <h1 className={styles['page-title']}>
            Card information
            <br />
            registration
          </h1>
        )}
      </div>
      <div className={styles['right-section']}>
        <div className={styles['form-container']}>
          {screens.md && (
            <h1 className={styles['page-title']}>
              Card information registration
            </h1>
          )}

          <Form
            form={form}
            layout={!screens.md ? 'vertical' : 'horizontal'}
            labelCol={!screens.md ? undefined : { span: 8 }}
            wrapperCol={!screens.md ? undefined : { span: 16 }}
            labelWrap
            onFinish={handleSubmit}
            className={styles['register-form']}
          >
            <Form.Item
              label="Country/Region"
              name="country"
              rules={[
                { required: true, message: 'Please select country/region' },
              ]}
            >
              <Select placeholder="Please select" size="large">
                <Option value="US">United States</Option>
                <Option value="CN">China</Option>
                <Option value="UK">United Kingdom</Option>
                <Option value="CA">Canada</Option>
                <Option value="AU">Australia</Option>
                {/* 可以添加更多国家 */}
              </Select>
            </Form.Item>

            <Form.Item label="Name" required>
              <div className={styles['name-row']}>
                <Form.Item
                  name="firstName"
                  rules={[
                    { required: true, message: 'Please enter first name' },
                  ]}
                  style={{ marginBottom: 0, flex: 1 }}
                  className={styles['name-item']}
                >
                  <Input placeholder="First Name" size="large" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: 'Please enter last name' },
                  ]}
                  style={{ marginBottom: 0, flex: 1 }}
                  className={styles['name-item']}
                >
                  <Input placeholder="Last Name" size="large" />
                </Form.Item>
              </div>
            </Form.Item>

            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[{ required: true, message: 'Please select birthday' }]}
            >
              <DatePicker
                placeholder="Select birthday"
                size="large"
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              label="ID"
              name="idType"
              rules={[{ required: true, message: 'Please select ID type' }]}
            >
              <Radio.Group onChange={handleIdTypeChange} value={idType}>
                <Radio value="IDcard">ID card</Radio>
                <Radio value="Passport">Passport</Radio>
                <Radio value="PassportVisa">
                  Passport + Non-visitor Visa / China Residence Permit
                </Radio>
                <Radio value="DrivingLicense">Driving license</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Photo Side of ID Card"
              name="idFront"
              rules={[
                {
                  required: true,
                  message: 'Please upload photo side of ID card',
                },
              ]}
            >
              <Upload
                {...createUploadProps(idFrontFileList, setIdFrontFileList)}
                listType="picture-card"
                maxCount={1}
              >
                {idFrontFileList.length === 0 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Information Side of ID Card"
              name="idBack"
              rules={[
                {
                  required: true,
                  message: 'Please upload information side of ID card',
                },
              ]}
            >
              <Upload
                {...createUploadProps(idBackFileList, setIdBackFileList)}
                listType="picture-card"
                maxCount={1}
              >
                {idBackFileList.length === 0 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              wrapperCol={!screens.md ? undefined : { offset: 8, span: 16 }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="tevau-btn"
                style={{ width: '100%', height: '60px' }}
              >
                <span>Submit</span>
                <ArrowIcon size={14} />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Image
        width={0}
        style={{ display: 'none' }}
        preview={{
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: (value) => {
            setPreviewVisible(value);
          },
        }}
      />
    </div>
  );
};

export default CardRegisterPage;
