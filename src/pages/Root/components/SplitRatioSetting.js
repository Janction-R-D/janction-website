import { FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { fetchNFTSetting, fetchNFTSettingUpdate } from '@/services/root';
import { empty } from '@/utils/lang';
import { Col, Form, message, Row } from 'antd';
import { useEffect } from 'react';
import LabelValue from './LabelValue';
import styles from './index.less';

const SplitRatioSetting = (props) => {
  const { visible, onCancel, record, onSuccess } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (!record?.inviter_address) return;
    getSplitRate();
  }, [record]);
  const getSplitRate = async () => {
    try {
      const res = await fetchNFTSetting({ inviter: record.inviter_address });
      form.setFieldsValue(res || {});
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await fetchNFTSettingUpdate(
        { split_rate: values },
        { inviter: record?.inviter_address },
      );

      // Check if the response indicates success
      if (res?.code == 40011) {
        message.warning(res?.error);
        return;
      }
      message.success('Settings updated successfully!');
      onCancel(); // Close the modal
      onSuccess(); // Execute success callback
    } catch (err) {
      console.log('『err』', err);
    }
  };
  return (
    <JanctionModal
      open={visible}
      title="Split ratio setting"
      centered
      width={480}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={record}
        className={styles['split-form']}
        onValuesChange={(changedValues, allValues) => {
          const value = Object.values(changedValues)[0];
          const key = Object.keys(changedValues)[0];
          if (empty(value)) {
            form.setFieldsValue({ [key]: undefined });
          }
        }}
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <LabelValue title="Level 1 ratio">
              <Form.Item name="level1">
                <FormInputNumber min={0} max={40} />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 2 ratio">
              <Form.Item name="level2">
                <FormInputNumber min={0} max={40} />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 3 ratio">
              <Form.Item name="level3">
                <FormInputNumber min={0} max={40} />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 4 ratio">
              <Form.Item name="level4">
                <FormInputNumber min={0} max={40} />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 5 ratio">
              <Form.Item name="level5">
                <FormInputNumber min={0} max={40} />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 6 ratio">
              <Form.Item name="level6">
                <FormInputNumber min={0} max={40} />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
        </Row>
      </Form>
    </JanctionModal>
  );
};

export default SplitRatioSetting;
