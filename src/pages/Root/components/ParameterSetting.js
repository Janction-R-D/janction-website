import JanctionCard from '@/components/JanctionCard';
import { fetchNFTSettingUpdate } from '@/services/root';
import { EditOutlined } from '@ant-design/icons';
import { Divider, message, Space } from 'antd';
import { useState } from 'react';
import { CONFIGURATION } from './extra';
import styles from './index.less';
import LabelValue from './LabelValue';
import ModifyModal from './ModifyModal';
import SplitRatioSetting from './SplitRatioSetting';

const ParameterSetting = (props) => {
  const { configData, onUpdate } = props;
  const [record, setRecord] = useState();
  const [visible, setVisible] = useState(false);
  const [splitVisible, setSplitVisible] = useState(false);

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
      message.error('update failed!');
      console.log('『err』', err);
    }
  };

  const renderSplitSetting = () => {
    return (
      <div className={styles['split-setting']}>
        <Space split={<Divider type="vertical" />} wrap className="mr15">
          {Object.keys(configData?.split_rate || {}).map((item) => (
            <span key={item}>{`${item}:${configData.split_rate[item]}%`}</span>
          ))}
        </Space>
        <EditOutlined
          className={styles['edit-icon']}
          onClick={() => {
            setSplitVisible(true);
          }}
        />
      </div>
    );
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
              value={configData?.[item.key]}
              onEdit={() => onEdit(item)}
            />
          ))}
        <LabelValue title="Split settings:" align="flex-start">
          {renderSplitSetting()}
        </LabelValue>
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
      {splitVisible && (
        <SplitRatioSetting
          visible={splitVisible}
          record={configData?.split_rate}
          onCancel={() => {
            setSplitVisible(false);
            setRecord();
          }}
          onSuccess={onUpdate}
        />
      )}
    </JanctionCard>
  );
};

export default ParameterSetting;
