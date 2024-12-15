import { FormInput, FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { useState } from 'react';
import { message } from 'antd';
import LabelValue from './LabelValue';
import { empty } from '@/utils/lang';

const ModifyModal = (props) => {
  const { visible, onCancel, record, onOk } = props;

  const [value, setValue] = useState(record?.value);

  const Com = record?.type == 'number' ? FormInputNumber : FormInput;

  const okHandle = async () => {
    if (empty(value)) {
      message.warning('Please complete the input!');
      return;
    }
    try {
      onOk && onOk({ [record?.key]: value });
      onCancel();
    } catch (err) {
      console.log('『err222』', err);
    }
  };

  return (
    <JanctionModal
      open={visible}
      title="Modify the configuration"
      centered
      width={706}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <LabelValue title={`${record?.title}:`}>
        <Com
          defaultValue={record.value}
          onChange={(e) => setValue(e.target ? e.target.value : e)}
        />
        <span>{record?.unit}</span>
      </LabelValue>
    </JanctionModal>
  );
};

export default ModifyModal;
