/**
 * 卡片信息注册页面
 * 独立页面，不在 Layout 中
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  message,
  Image,
  Grid,
  Typography,
  Card,
} from 'antd';
import {
  IdcardOutlined,
  GlobalOutlined,
  UserOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  NumberOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import dayjs from 'dayjs';
import TevauLayout from '@/layouts/TevauLayout';
import ArrowIcon from '@/components/Tevau/ArrowIcon';
import { submitKycData } from '@/services/tevau/kyc';
import { handleTevauError } from '@/utils/tevau';
import storage from '@/utils/storage';
import uploadBgFace from '@/assets/images/tevau/uploadBgFace.png';
import uploadBgBack from '@/assets/images/tevau/uploadBgBack.png';
import styles from './index.less';
import '@/styles/common/button.less';

const { Option } = Select;
const { Text } = Typography;

const ID_TYPE_OPTIONS = [
  { value: '1', label: 'ID card' },
  { value: '2', label: 'Passport' },
  { value: '3', label: 'Passport + Non-visitor Visa / China Residence Permit' },
  { value: '4', label: 'Driving license' },
];

const CardRegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [idFrontFileList, setIdFrontFileList] = useState([]);
  const [idBackFileList, setIdBackFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const screens = Grid.useBreakpoint();
  const selectedIdType = Form.useWatch('idType', form) || '1';
  const isVisaMode = selectedIdType === '3';
  const requiresBackImage =
    selectedIdType === '1' || selectedIdType === '3' || selectedIdType === '4';

  const uploadFieldLabels = useMemo(() => {
    if (selectedIdType === '2') {
      return {
        front: 'Passport Photo Page',
        back: '',
      };
    }
    if (selectedIdType === '3') {
      return {
        front: 'Passport Photo Page',
        back: 'Visa / Residence Permit Page',
      };
    }
    if (selectedIdType === '4') {
      return {
        front: 'Front Side of Driving License',
        back: 'Back Side of Driving License',
      };
    }
    return {
      front: 'Photo Side of ID Card',
      back: 'Information Side of ID Card',
    };
  }, [selectedIdType]);

  useEffect(() => {
    form.setFieldsValue({ idType: '1' });
  }, [form]);

  useEffect(
    () => () => {
      if (idFrontFileList[0]?.thumbUrl) {
        URL.revokeObjectURL(idFrontFileList[0].thumbUrl);
      }
      if (idBackFileList[0]?.thumbUrl) {
        URL.revokeObjectURL(idBackFileList[0].thumbUrl);
      }
    },
    [idFrontFileList, idBackFileList],
  );

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 获取用户编码（模拟，实际应该从用户系统获取）
      const userCode = storage.get('TEVAU_USER_CODE') || `USER_${Date.now()}`;
      if (!storage.get('TEVAU_USER_CODE')) {
        storage.set({ name: 'TEVAU_USER_CODE', value: userCode });
      }

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
        identityCardType: values.idType,
        identityCard: values.idNumber,
        identityCardValidityTime: dayjs(values.idValidity).format('YYYY-MM-DD'),
      };

      // 处理证件照片URL（模拟上传，实际需要先上传到服务器）
      if (idFrontFileList.length > 0) {
        // 模拟上传后的URL
        kycData.identityFrontPicUrl = `https://example.com/uploads/${idFrontFileList[0].name}`;
      }
      if (requiresBackImage && idBackFileList.length > 0) {
        kycData.identityBackPicUrl = `https://example.com/uploads/${idBackFileList[0].name}`;
      }

      if (values.idType === '3') {
        kycData.userKycExtenReq = {
          destination: values.destination,
          permitNumber: values.permitNumber,
          issueDate: dayjs(values.issueDate).format('YYYY-MM-DD'),
          validUntil: dayjs(values.validUntil).format('YYYY-MM-DD'),
        };
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

  const handleIdTypeChange = (nextType) => {
    form.setFieldsValue({ idType: nextType });
    form.validateFields(['idType']).catch(() => null);

    if (nextType === '2') {
      setIdBackFileList([]);
      form.setFieldsValue({ idBack: undefined });
    }
  };

  const createUploadProps = (fieldName, fileList, setFileList) => ({
    beforeUpload: (file) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPG) {
        message.error('You can only upload JPG/PNG file!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Image must be smaller than 10MB!');
        return false;
      }

      if (fileList[0]?.thumbUrl) {
        URL.revokeObjectURL(fileList[0].thumbUrl);
      }

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
      form.setFieldsValue({ [fieldName]: fileWithPreview.uid });
      form.validateFields([fieldName]).catch(() => null);
      return false;
    },
    fileList,
    onRemove: () => {
      if (fileList[0]?.thumbUrl) {
        URL.revokeObjectURL(fileList[0].thumbUrl);
      }
      setFileList([]);
      form.setFieldsValue({ [fieldName]: undefined });
      form.validateFields([fieldName]).catch(() => null);
    },
    onPreview: (file) => {
      const url =
        file.thumbUrl ||
        file.url ||
        (file.originFileObj ? URL.createObjectURL(file.originFileObj) : '');
      if (url) {
        setPreviewImage(url);
        setPreviewVisible(true);
      }
    },
    showUploadList: { showPreviewIcon: true, showRemoveIcon: true },
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
          initialValues={{ idType: '1' }}
          layout="vertical"
          labelWrap
          onFinish={handleSubmit}
          className={styles['register-form']}
        >
          <Form.Item
            label={
              <span className={styles['item-label']}>
                <GlobalOutlined />
                Country/Region
              </span>
            }
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
              <Option value="HK">Hong Kong</Option>
              <Option value="JP">Japan</Option>
              <Option value="SG">Singapore</Option>
              <Option value="UK">United Kingdom</Option>
              <Option value="CA">Canada</Option>
              <Option value="AU">Australia</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <UserOutlined />
                Name
              </span>
            }
            required
          >
            <div className={styles['name-row']}>
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
            label={
              <span className={styles['item-label']}>
                <CalendarOutlined />
                Birthday
              </span>
            }
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
            label={
              <span className={styles['item-label']}>
                <NumberOutlined />
                ID Number
              </span>
            }
            name="idNumber"
            rules={[{ required: true, message: 'Please enter ID number' }]}
          >
            <Input placeholder="Enter ID number" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <SafetyCertificateOutlined />
                ID Validity Date
              </span>
            }
            name="idValidity"
            rules={[{ required: true, message: 'Please select validity date' }]}
          >
            <DatePicker
              placeholder="Select validity date"
              size="large"
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <IdcardOutlined />
                ID Card Upload
              </span>
            }
            className={styles['id-upload-form-item']}
          >
            <div className={styles['id-upload-card']}>
              <Card
                className={styles['upload-card-panel']}
                title={
                  <Select
                    value={selectedIdType}
                    onChange={handleIdTypeChange}
                    options={ID_TYPE_OPTIONS}
                    className={`${styles['id-type-select']} id-type-select-global`}
                    bordered={false}
                  ></Select>
                }
              >
                <Form.Item
                  name="idType"
                  hidden
                  rules={[{ required: true, message: 'Please select ID type' }]}
                >
                  <Input />
                </Form.Item>
                {isVisaMode && (
                  <div className={styles['visa-section']}>
                    <div className={styles['visa-tip']}>
                      <InfoCircleOutlined />
                      <Text>
                        Passport + visa mode requires additional visa/residence
                        details.
                      </Text>
                    </div>
                    <Form.Item
                      label={
                        <span className={styles['item-label']}>
                          <FlagOutlined />
                          Destination
                        </span>
                      }
                      name="destination"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter destination',
                        },
                      ]}
                    >
                      <Input placeholder="Enter destination" size="large" />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className={styles['item-label']}>
                          <NumberOutlined />
                          Permit Number
                        </span>
                      }
                      name="permitNumber"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter permit number',
                        },
                      ]}
                    >
                      <Input placeholder="Enter permit number" size="large" />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className={styles['item-label']}>
                          <CalendarOutlined />
                          Visa Issue Date
                        </span>
                      }
                      name="issueDate"
                      rules={[
                        {
                          required: true,
                          message: 'Please select issue date',
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="Select issue date"
                        size="large"
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className={styles['item-label']}>
                          <CalendarOutlined />
                          Visa Valid Until
                        </span>
                      }
                      name="validUntil"
                      rules={[
                        {
                          required: true,
                          message: 'Please select valid until date',
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="Select valid until"
                        size="large"
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </div>
                )}
                <div className={styles['id-upload-grid']}>
                  <Form.Item
                    label={
                      <span className={styles['upload-item-title']}>
                        {uploadFieldLabels.front}
                      </span>
                    }
                    name="idFront"
                    rules={[
                      {
                        required: true,
                        validator: () => {
                          if (idFrontFileList.length > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              `Please upload ${uploadFieldLabels.front.toLowerCase()}`,
                            ),
                          );
                        },
                      },
                    ]}
                  >
                    <Upload
                      {...createUploadProps(
                        'idFront',
                        idFrontFileList,
                        setIdFrontFileList,
                      )}
                      listType="picture-card"
                      maxCount={1}
                    >
                      {idFrontFileList.length === 0 && (
                        <div
                          className={styles['upload-placeholder']}
                          style={{ backgroundImage: `url(${uploadBgFace})` }}
                        ></div>
                      )}
                    </Upload>
                  </Form.Item>

                  {requiresBackImage && (
                    <Form.Item
                      label={
                        <span className={styles['upload-item-title']}>
                          {uploadFieldLabels.back}
                        </span>
                      }
                      name="idBack"
                      preserve={false}
                      rules={[
                        {
                          validator: () => {
                            if (idBackFileList.length > 0) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                `Please upload ${uploadFieldLabels.back.toLowerCase()}`,
                              ),
                            );
                          },
                        },
                      ]}
                    >
                      <Upload
                        {...createUploadProps(
                          'idBack',
                          idBackFileList,
                          setIdBackFileList,
                        )}
                        listType="picture-card"
                        maxCount={1}
                      >
                        {idBackFileList.length === 0 && (
                          <div
                            className={styles['upload-placeholder']}
                            style={{ backgroundImage: `url(${uploadBgBack})` }}
                          ></div>
                        )}
                      </Upload>
                    </Form.Item>
                  )}
                </div>
              </Card>
            </div>
          </Form.Item>

          <Form.Item>
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
