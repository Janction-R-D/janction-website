import React, { useState } from 'react';
import { Button, Card, Divider, Tabs } from 'antd';
import { HourglassOutlined, PlayCircleOutlined } from '@ant-design/icons';
import MonitoringChart from './MonitoringChart';
import styles from './index.less';
import ResourceUtilization from './ResourceUtilization';
import OperationModal from '@/pages/Genesis/Instance/InstanceComponents/OperationModal';

const { TabPane } = Tabs;

const InstanceMonitor = () => {
  const [activeTab, setActiveTab] = useState('cpu');
  const [instance, setInstance] = useState({});
  const status = 'running'; // This should be passed as a prop or fetched from an API
  const dataMap = {
    cpu: [52, 48, 53, 12, 33, 50, 42, 35, 60, 75, 73, 55, 51],
    memory: [32, 35, 40, 30, 34, 33, 39, 42, 38, 40, 43, 45, 44],
    gpu: [15, 20, 18, 25, 30, 28, 22, 18, 17, 20, 25, 27, 24],
    network: [10, 15, 8, 12, 18, 14, 10, 13, 17, 20, 18, 16, 15],
  };

  const unitMap = {
    cpu: '%',
    memory: ' MB',
    gpu: '%',
    network: ' Mbps',
  };
  const getNode = () => {
    //setear el valor de node
  };
  return (
    <Card className={styles.card} bordered={false}>
      <header className={styles.main_header}>
        <div className={styles['header_left']}>
          <i className="iconfont icon-nvidia gpu-logo green" />
          <div>
            <h3 className={styles['gpu-title']}>
              NVIDIA TX4090
              <span className={styles['status']}>
                {
                  <>
                    {status.toLowerCase() === 'running' ? (
                      <span className="status status-running">
                        <i className="iconfont  icon-check"></i> Running
                      </span>
                    ) : status.toLowerCase() === 'stopped' ? (
                      <span className="status status-stopped">
                        <i className="iconfont  icon-play_pause"></i> Stopped
                      </span>
                    ) : status.toLowerCase() === 'expired' ? (
                      <span className="status status-expired">
                        <i className="iconfont  icon-icforbidden"></i> Expired
                      </span>
                    ) : status.toLowerCase() === 'expiring soon' ? (
                      <span className="status status-expiring-soon">
                        <i className="iconfont  icon-questioncircle"></i>{' '}
                        Expiring Soon
                      </span>
                    ) : (
                      <div>other</div>
                    )}
                  </>
                }
              </span>
            </h3>
            <p className={styles['gpu-location']}>Chicago, USA</p>
          </div>
        </div>
        <div className={styles['header_right']}>
          <Button className={styles['connect-btn']}>
            Start
            <div className={styles['icon']}>
              <PlayCircleOutlined />
            </div>
          </Button>
          <Button className={`${styles['connect-btn']} ${styles['diseabled']}`}>
            Stop
            <div className={styles['icon']}>
              <HourglassOutlined color="orange" />
            </div>
          </Button>
          <span className={styles['more']}>
            <OperationModal record={instance} getAllNodes={getNode} />
          </span>
        </div>
      </header>
      <div className={styles.card_container}>
        <section className={styles.monitor}>
          <div className={styles.header}>
            <span className={styles.title}>Instance Monitoring</span>
          </div>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className={styles.tabs}
            tabBarGutter={24}
          >
            <TabPane tab="CPU" key="cpu" />
            <TabPane tab="Memory" key="memory" />
            {/* <TabPane tab="GPU" key="gpu" /> */}
            <TabPane tab="Network" key="network" />
          </Tabs>

          <MonitoringChart
            data={dataMap[activeTab]}
            label={activeTab.toUpperCase()}
            unit={unitMap[activeTab]}
          />
        </section>
        <Divider className={styles.divider} type="vertical" />
        <ResourceUtilization
          data={{
            cpu: 68,
            memory: 45,
            disk: 73,
            network: 25,
          }}
        />
      </div>
    </Card>
  );
};

export default InstanceMonitor;
