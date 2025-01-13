import { FormInput, FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { useState } from 'react';
import { message } from 'antd';
import LabelValue from './LabelValue';
import { empty } from '@/utils/lang';

const ModifyModal = (props) => {
  const { visible, onCancel, record, onOk, title } = props;

  const [value, setValue] = useState(record?.value);

  const Com = record?.type == 'number' ? FormInputNumber : FormInput;

  const okHandle = async () => {
    if (empty(value) && record?.type !== 'number') {
      message.warning('Please complete the input!');
      return;
    }
    try {
      if (record?.type == 'number') {
        onOk && (await onOk({ [record?.key]: value || 0 }, record));
      } else {
        onOk && (await onOk({ [record?.key]: value }, record));
      }
      onCancel();
    } catch (err) {
      message.error('Setup failed, please try again!');
      console.log('『err』', err);
    }
  };

  return (
    <JanctionModal
      open={visible}
      title={title || 'Modify the configuration'}
      centered
      width={706}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <LabelValue title={`${record?.title}:`}>
        <Com
          defaultValue={record.value}
          min={record?.min || 0}
          max={record?.max}
          onChange={(e) => setValue(e?.target ? e?.target?.value : e)}
        />
        <span>{record?.unit}</span>
      </LabelValue>
    </JanctionModal>
  );
};

export default ModifyModal;
