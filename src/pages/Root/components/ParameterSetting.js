import JanctionCard from '@/components/JanctionCard';
import { fetchNFTSettingUpdate } from '@/services/root';
import { message } from 'antd';
import { useState } from 'react';
import { CONFIGURATION } from './extra';
import styles from './index.less';
import LabelValue from './LabelValue';
import ModifyModal from './ModifyModal';

const ParameterSetting = (props) => {
  const { configData, onUpdate } = props;
  const [record, setRecord] = useState();
  const [visible, setVisible] = useState(false);

  const onEdit = (config) => {
    setRecord({ ...config, value: configData?.[config.key] });
    setVisible(true);
  };

  const onOk = async (value) => {
    try {
      await fetchNFTSettingUpdate(value);
      message.success('update success!');
      onUpdate();
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <JanctionCard title="Parameter setting" divider>
      <div className={styles['parameter-setting']}>
        {Object.values(CONFIGURATION).map((item) => (
          <LabelValue
            {...item}
            key={item.key}
            title={`${item.title}:`}
            value={configData?.[item.key]}
            onEdit={() => onEdit(item)}
          />
        ))}
      </div>
      {visible && (
        <ModifyModal
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setRecord();
          }}
          onOk={onOk}
          record={record}
        />
      )}
    </JanctionCard>
  );
};

export default ParameterSetting;
