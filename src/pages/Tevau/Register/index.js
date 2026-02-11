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
  Image,
  Grid,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { history } from 'umi';
import dayjs from 'dayjs';
import TevauLayout from '@/layouts/TevauLayout';
import ArrowIcon from '@/components/Tevau/ArrowIcon';
import { submitKycData } from '@/services/tevau/kyc';
import { handleTevauError } from '@/utils/tevau';
import storage from '@/utils/storage';
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
      // 获取用户编码（模拟，实际应该从用户系统获取）
      const userCode = storage.get('TEVAU_USER_CODE') || `USER_${Date.now()}`;
      if (!storage.get('TEVAU_USER_CODE')) {
        storage.set({ name: 'TEVAU_USER_CODE', value: userCode });
      }

      // 转换证件类型
      const identityCardTypeMap = {
        IDcard: '0', // 身份证
        Passport: '1', // 护照
        PassportVisa: '1', // 护照+签证
        DrivingLicense: '2', // 驾照
      };

      // 转换国家代码（简化处理，实际需要映射）
      const countryCodeMap = {
        US: 'US',
        CN: 'CN',
        UK: 'GB',
        CA: 'CA',
        AU: 'AU',
      };

      // 准备KYC数据
      const kycData = {
        userCode,
        countryArea: countryCodeMap[values.country] || values.country,
        firstNameEn: values.firstName,
        lastNameEn: values.lastName,
        birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
        identityCardType: identityCardTypeMap[idType] || '0',
        identityCard: values.idNumber || '', // 需要添加ID号码字段
        identityCardValidityTime: dayjs().add(10, 'year').format('YYYY-MM-DD'), // 模拟有效期
      };

      // 处理证件照片URL（模拟上传，实际需要先上传到服务器）
      if (idFrontFileList.length > 0) {
        // 模拟上传后的URL
        kycData.identityFrontPicUrl = `https://example.com/uploads/${idFrontFileList[0].name}`;
      }
      if (idBackFileList.length > 0) {
        kycData.identityBackPicUrl = `https://example.com/uploads/${idBackFileList[0].name}`;
      }

      // 提交KYC数据（模拟API调用）
      try {
        // 实际API调用（当前模拟）
        // const response = await submitKycData(kycData);
        // if (response.code !== 0 || !response.ok) {
        //   throw new Error(response.msg || 'Failed to submit KYC data');
        // }

        // 模拟成功响应
        console.log('KYC data submitted:', kycData);
        message.success('Registration submitted successfully!');

        // 标记需要查询KYC状态
        storage.set({ name: 'TEVAU_CHECK_KYC', value: true });

        // 提交成功后跳转
        setTimeout(() => {
          history.push({
            pathname: '/genesis/dashboard',
            state: { fromKycRegister: true, userCode },
          });
        }, 1000);
      } catch (err) {
        const errorMsg = handleTevauError(err);
        message.error(errorMsg || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
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
      <TevauLayout
        title="Card information registration"
        mobileTitle={
          <>
            Card information
            <br />
            registration
          </>
        }
      >
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
            <Select
              placeholder="Please select"
              size="large"
              className={styles['custom-select']}
            >
              <Option value="US">United States</Option>
              <Option value="CN">China</Option>
              <Option value="UK">United Kingdom</Option>
              <Option value="CA">Canada</Option>
              <Option value="AU">Australia</Option>
              {/* 可以添加更多国家 */}
            </Select>
          </Form.Item>

          <Form.Item label="Name" required>
            <div
              className={styles['name-row']}
              style={{ display: 'flex', gap: '16px' }}
            >
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please enter first name' }]}
                style={{ marginBottom: screens.md ? 0 : 24, flex: 1 }}
                className={styles['name-item']}
              >
                <Input placeholder="First Name" size="large" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please enter last name' }]}
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
            <Radio.Group
              onChange={handleIdTypeChange}
              value={idType}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <Radio value="IDcard">ID card</Radio>
              <Radio value="Passport">Passport</Radio>
              <Radio value="PassportVisa">
                Passport + Non-visitor Visa / China Residence Permit
              </Radio>
              <Radio value="DrivingLicense">Driving license</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="ID Number"
            name="idNumber"
            rules={[{ required: true, message: 'Please enter ID number' }]}
          >
            <Input placeholder="Enter ID number" size="large" />
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
      </TevauLayout>
    </div>
  );
};

export default CardRegisterPage;
