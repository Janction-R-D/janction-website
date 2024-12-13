import { FormInput, FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { useState } from 'react';
import LabelValue from './LabelValue';

const ModifyModal = (props) => {
  const { visible, onCancel, record } = props;

  const [value, setValue] = useState(record?.value);

  const Com = record?.type == 'number' ? FormInputNumber : FormInput;

  const onOk = () => {
    console.log('『value』', value);
  };

  return (
    <JanctionModal
      open={visible}
      title="Modify the configuration"
      centered
      width={706}
      onOk={onOk}
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
