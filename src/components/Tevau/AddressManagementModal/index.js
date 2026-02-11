import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Select, Input, message } from 'antd';
import { CloseOutlined, LeftOutlined } from '@ant-design/icons';
import ArrowIcon from '@/components/Tevau/ArrowIcon';
import styles from './index.less';

const { Option } = Select;

const AddressManagementModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (!visible) {
      setIsEditMode(false);
    } else {
      form.setFieldsValue({
        country: 'CN',
        city: 'beijing',
        address: 'Chaoyang District, Beijing, China',
        postCode: '100000',
      });
    }
  }, [visible, form]);

  const handleAction = async () => {
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }

    try {
      await form.validateFields();
      message.success('Address updated successfully.');
      setIsEditMode(false);
    } catch (error) {
      // 校验失败时无需额外处理
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
      mask={true}
      maskClosable={true}
      wrapClassName={styles['modal-wrap']}
      className={styles['modal']}
      width={1034}
      centered
      destroyOnClose
    >
      <div className={styles['modal-content']}>
        <Button className={styles['close-btn']} type="link" onClick={onCancel}>
          <CloseOutlined style={{ fontSize: '20px' }} />
        </Button>

        <div className={styles['content-body']}>
          <div className={styles['left-section']}>
            <Button
              className={styles['back-btn']}
              type="link"
              onClick={onCancel}
            >
              <LeftOutlined />
              <span>Back</span>
            </Button>
            <img
              src={require('@/assets/images/tevau/cardAddressBg.png')}
              alt="Address"
              className={styles['modal-image']}
            />
          </div>

          <div className={styles['right-section']}>
            <h2 className={styles['modal-title']}>
              {isEditMode ? 'Address Edit' : 'Address management'}
            </h2>

            <Form
              form={form}
              layout="vertical"
              className={styles['address-form']}
              disabled={!isEditMode}
            >
              <div className={styles['row-fields']}>
                <Form.Item
                  label="Country/Region"
                  name="country"
                  className={styles['half-field']}
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
                  </Select>
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  className={styles['half-field']}
                  rules={[{ required: true, message: 'Please select city' }]}
                >
                  <Select placeholder="Please select" size="large">
                    <Option value="newyork">New York</Option>
                    <Option value="beijing">Beijing</Option>
                    <Option value="london">London</Option>
                    <Option value="toronto">Toronto</Option>
                    <Option value="sydney">Sydney</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please enter address' }]}
              >
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="Enter address"
                />
              </Form.Item>

              <Form.Item
                label="Post code"
                name="postCode"
                rules={[{ required: true, message: 'Please enter post code' }]}
              >
                <Input size="large" placeholder="Enter post code" />
              </Form.Item>
            </Form>

            <Button
              type="primary"
              className={styles['action-btn']}
              onClick={handleAction}
            >
              <span>{isEditMode ? 'Submit' : 'Edit'}</span>
              <ArrowIcon size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressManagementModal;
