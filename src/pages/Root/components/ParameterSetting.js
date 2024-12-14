import JanctionCard from '@/components/JanctionCard';
import styles from './index.less';
import LabelValue from './LabelValue';
import { useEffect, useState } from 'react';
import { CONFIGURATION } from './extra';
import ModifyModal from './ModifyModal';
import { fetchNFTSetting } from '@/services/root';

const ParameterSetting = (props) => {
  const [record, setRecord] = useState();
  const [visible, setVisible] = useState(false);
  const [settingData, setSettingData] = useState();

  useEffect(() => {
    getSettingData();
  }, []);
  const getSettingData = async () => {
    try {
      const res = await fetchNFTSetting();
      setSettingData(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const onEdit = (config) => {
    console.log('『config』', config);
    setRecord({ ...config, value: settingData?.[config.key] });
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
              value={settingData?.[item.key]}
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
          onSuccess={getSettingData}
          record={record}
        />
      )}
    </JanctionCard>
  );
};

export default ParameterSetting;
