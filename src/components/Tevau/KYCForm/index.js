/**
 * KYC验证表单组件
 * 职责：KYC信息收集和文档上传
 *
 * 艹，KYC表单比较复杂，包含个人信息和文档上传两部分
 */

import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  message,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, SafetyOutlined } from '@ant-design/icons';
import {
  ID_TYPES,
  ID_TYPE_TEXT,
  KYC_DOCUMENT_TYPES,
  COUNTRIES,
  FILE_UPLOAD_CONFIG,
} from '@/utils/tevau';
import {
  emailRule,
  phoneRule,
  ageRule,
  postalCodeRule,
} from '@/utils/tevau/validator';
import { validateFile } from '@/utils/tevau/validator';
import styles from './index.less';

const { Option } = Select;

const KYCForm = ({ onSubmit, onUploadDocument, loading = false }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState({});

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // 格式化日期
      if (values.dateOfBirth) {
        values.dateOfBirth = values.dateOfBirth.format('YYYY-MM-DD');
      }

      onSubmit?.(values);
    } catch (err) {
      console.error('Form validation failed:', err);
    }
  };

  // 处理文件上传
  const handleUpload = (documentType) => ({
    beforeUpload: (file) => {
      const validation = validateFile(file);

      if (!validation.valid) {
        message.error(validation.error);
        return Upload.LIST_IGNORE;
      }

      // 调用上传回调
      onUploadDocument?.(file, documentType);

      // 更新文件列表
      setFileList((prev) => ({
        ...prev,
        [documentType]: [file],
      }));

      return false; // 阻止自动上传
    },
    fileList: fileList[documentType] || [],
    onRemove: () => {
      setFileList((prev) => ({
        ...prev,
        [documentType]: [],
      }));
    },
  });

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <SafetyOutlined className={styles.icon} />
        <h2>KYC Verification</h2>
        <p>Please provide your identity information for verification</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.form}
      >
        {/* 个人信息部分 */}
        <h3>Personal Information</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[
                { required: true, message: 'Please select date of birth' },
                ageRule,
              ]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: 'Please select nationality' }]}
            >
              <Select placeholder="Select nationality">
                {COUNTRIES.map((country) => (
                  <Option key={country.value} value={country.value}>
                    {country.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* 证件信息部分 */}
        <h3>ID Information</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="ID Type"
              name="idType"
              rules={[{ required: true, message: 'Please select ID type' }]}
            >
              <Select placeholder="Select ID type">
                {Object.entries(ID_TYPE_TEXT).map(([key, text]) => (
                  <Option key={key} value={key}>
                    {text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="ID Number"
              name="idNumber"
              rules={[{ required: true, message: 'Please enter ID number' }]}
            >
              <Input placeholder="ID Number" />
            </Form.Item>
          </Col>
        </Row>

        {/* 地址信息部分 */}
        <h3>Address Information</h3>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input placeholder="Street address" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="State/Province"
              name="state"
              rules={[{ required: true, message: 'Please enter state' }]}
            >
              <Input placeholder="State/Province" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Please select country' }]}
            >
              <Select placeholder="Select country">
                {COUNTRIES.map((country) => (
                  <Option key={country.value} value={country.value}>
                    {country.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[
                { required: true, message: 'Please enter postal code' },
                postalCodeRule(),
              ]}
            >
              <Input placeholder="Postal Code" />
            </Form.Item>
          </Col>
        </Row>

        {/* 文档上传部分 */}
        <h3>Document Upload</h3>
        <p className={styles.uploadHint}>
          Upload clear photos or scans of your documents. Supported formats:
          JPG, PNG, PDF (Max 5MB)
        </p>

        <Form.Item label="ID Card / Passport (Front)">
          <Upload {...handleUpload(KYC_DOCUMENT_TYPES.ID_FRONT)} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="ID Card (Back)" help="Required for ID card only">
          <Upload {...handleUpload(KYC_DOCUMENT_TYPES.ID_BACK)} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Selfie Photo">
          <Upload {...handleUpload(KYC_DOCUMENT_TYPES.SELFIE)} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Proof of Address"
          help="Utility bill, bank statement, or government-issued document"
        >
          <Upload
            {...handleUpload(KYC_DOCUMENT_TYPES.PROOF_OF_ADDRESS)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item className={styles.submitBtn}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Submit KYC Verification
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default KYCForm;
