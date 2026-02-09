/**
 * 升级实体卡弹窗组件
 * 职责：收集邮寄地址等信息用于升级实体卡
 */

import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import {
  SHIPPING_METHODS,
  SHIPPING_METHOD_TEXT,
  COUNTRIES,
} from '@/utils/tevau';
import { postalCodeRule } from '@/utils/tevau/validator';

const { Option } = Select;

const UpgradeCardModal = ({ visible, card, onConfirm, onCancel, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onConfirm?.(values);
      form.resetFields();
    } catch (err) {
      console.error('Form validation failed:', err);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <Modal
      open={visible}
      title="Upgrade to Physical Card"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Confirm Upgrade
        </Button>,
      ]}
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input placeholder="Recipient's full name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="+1 234 567 8900" />
        </Form.Item>

        <Form.Item
          label="Address Line 1"
          name="addressLine1"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input placeholder="Street address" />
        </Form.Item>

        <Form.Item label="Address Line 2" name="addressLine2">
          <Input placeholder="Apartment, suite, unit, etc. (optional)" />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please enter city' }]}
        >
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item
          label="State/Province"
          name="state"
          rules={[{ required: true, message: 'Please enter state' }]}
        >
          <Input placeholder="State/Province" />
        </Form.Item>

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

        <Form.Item
          label="Shipping Method"
          name="shippingMethod"
          initialValue={SHIPPING_METHODS.STANDARD}
          rules={[{ required: true }]}
        >
          <Select>
            {Object.entries(SHIPPING_METHOD_TEXT).map(([key, text]) => (
              <Option key={key} value={key}>
                {text}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpgradeCardModal;
