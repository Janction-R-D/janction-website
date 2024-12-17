import { FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { fetchNFTSetting, fetchNFTSettingUpdate } from '@/services/root';
import { Col, Form, message, Row } from 'antd';
import LabelValue from './LabelValue';
import styles from './index.less';
import { useEffect } from 'react';

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
      message.warning('Except for some issues, please refresh and try again!');
      console.log('『err』', err);
    }
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      await fetchNFTSettingUpdate(
        { split_rate: values },
        { inviter: record?.inviter_address },
      );
      message.success('setting success!');
      onCancel();
      onSuccess();
    } catch (err) {
      message.warning('Except for some issues, please try again!');
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
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <LabelValue title="Level 1 ratio">
              <Form.Item name="level1">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 2 ratio">
              <Form.Item name="level2">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 3 ratio">
              <Form.Item name="level3">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 4 ratio">
              <Form.Item name="level4">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 5 ratio">
              <Form.Item name="level5">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 6 ratio">
              <Form.Item name="level6">
                <FormInputNumber max={50} />
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
