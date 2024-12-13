import JanctionCard from '@/components/JanctionCard';
import styles from './index.less';
import LabelValue from './LabelValue';
import { useState } from 'react';
import { CONFIGURATION } from './extra';
import ModifyModal from './ModifyModal';

const ParameterSetting = (props) => {
  const [record, setRecord] = useState();
  const [visible, setVisible] = useState(false);

  const onEdit = (config) => {
    console.log('『config』', config);
    setRecord({ ...config, value: props?.[config.key] });
    setVisible(true);
  };

  return (
    <JanctionCard title="Parameter setting" divider>
      <div className={styles['parameter-setting']}>
        {Object.values(CONFIGURATION)
          .filter((item) => item.key !== 'password')
          .map((item) => (
            <LabelValue
              {...item}
              key={item.key}
              title={`${item.title}:`}
              value={props?.[item.key]}
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
          record={record}
        />
      )}
    </JanctionCard>
  );
};

export default ParameterSetting;
