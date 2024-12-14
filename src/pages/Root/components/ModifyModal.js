import { FormInput, FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { useState } from 'react';
import { message } from 'antd';
import LabelValue from './LabelValue';
import { fetchNFTSetting, fetchNFTSettingUpdate } from '@/services/root';

const ModifyModal = (props) => {
  const { visible, onCancel, record, onSuccess } = props;

  const [value, setValue] = useState(record?.value);

  const Com = record?.type == 'number' ? FormInputNumber : FormInput;

  const onOk = async () => {
    console.log('『value』', value);
    try {
      const res = await fetchNFTSettingUpdate();
      message.success('update success!');
      onSuccess();
    } catch (err) {
      console.log('『err』', err);
    }
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
