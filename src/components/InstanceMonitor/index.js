import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, message, Tabs } from 'antd';
import {
  ClockCircleOutlined,
  DesktopOutlined,
  HourglassOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import MonitoringChart from './MonitoringChart';
import styles from './index.less';
import ResourceUtilization from './ResourceUtilization';
import OperationModal from '@/pages/Genesis/Instance/InstanceComponents/OperationModal';
import {
  fetchNodeList,
  fetchNodeOperation,
  fetchStatistic,
} from '@/services/genesis';
import { formatISODate } from '@/utils/datetime';
import { convertMBtoGB } from '@/utils/lang';

const { TabPane } = Tabs;
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const InstanceMonitor = ({ instance }) => {
  const [activeTab, setActiveTab] = useState('cpu');
  const [reosurceStat, setResourceStat] = useState({});
  useEffect(() => {
    getStatistic();
  }, []);

  async function getStatistic() {
    const payload = {
      resource_id: instance?.id,
    };

    try {
      const { data = {} } = await fetchStatistic(payload);
      const res = (await data[instance.id]?.data) || {};
      setResourceStat(res);
    } catch (error) {
      console.log(error);
    }
  }

  const instanceData = {
    resource_id: instance?.id,
    id: instance?.id,
    node_id: instance?.node_id,
    name: instance?.name,
    Cores: instance?.node?.attr.cpu,
    memory: convertMBtoGB(instance?.node?.attr.memory.toFixed(2)),
    status: instance?.status_str,
    expired: formatDate(instance?.expired_at),
    created: formatDate(instance?.created_at),
    Location: instance?.node?.attr?.location || '~',
    gpu_chip: instance?.node?.attr?.cpu_chip,
    cpu_chip: instance?.node?.attr?.cpu,
    MemoryUsage: convertMBtoGB(instance?.activity?.memory_usage?.toFixed(2)),
    // downtime: `${formatISODate(instance?.created_at)}\r\n${formatISODate(
    //   instance?.expired_at,
    // )}`,
    activity: instance?.activity,
    resource: instance?.activity?.resource_id,
  };

  const cpuData = [];
  const memoryData = [];
  const networkData = [];
  // Recorrer y llenar los arreglos
  for (const timestamp in reosurceStat) {
    const entry = reosurceStat[timestamp];

    cpuData.push({
      date: formatISODate(timestamp).split(' ')?.[0],
      value: entry.cpu_usage,
    });

    memoryData.push({
      date: formatISODate(timestamp).split(' ')?.[0],
      value: entry.memory_usage,
    });

    networkData.push({
      date: formatISODate(timestamp).split(' ')?.[0],
      value: entry.network_usage,
    });
  }
  const dataMap = {
    cpu: cpuData,
    memory: memoryData,
    network: networkData,
  };

  const unitMap = {
    cpu: '%',
    memory: ' MB',
    // gpu: '%',
    network: ' Mbps',
  };
  const getNode = () => {
    //setear el valor de node
  };
  const handleOperation = (operation, resource, id) => {
    const payload = JSON.stringify({
      resource_id: resource,
      operation,
      id,
    });
    fetchNodeOperation(payload)
      .then((res) => {
        getAllNodes();
        message.success('Operation completed!');
      })
      .catch((err) => {
        console.log('Error capturado:', err);
      });
  };
  return (
    <Card className={styles.card} bordered={false}>
      <header className={styles.main_header}>
        <div className={styles['header_left']}>
          <i className="iconfont icon-nvidia gpu-logo green" />
          <div>
            <h3 className={styles['gpu-title']}>
              {instance?.id}
              <span className={styles['status']}>
                {
                  <>
                    {instanceData?.status?.toLowerCase() === 'running' ? (
                      <span
                        className={`${styles['status']} ${styles['status-running']}`}
                      >
                        <i className="iconfont  icon-check"></i> Running
                      </span>
                    ) : instanceData?.status?.toLowerCase() === 'stopped' ? (
                      <span
                        className={`${styles['status']} ${styles['status-stopped']}`}
                      >
                        <i className="iconfont  icon-play_pause"></i> Stopped
                      </span>
                    ) : instanceData?.status?.toLowerCase() === 'expired' ? (
                      <span
                        className={`${styles['status']} ${styles['status-expired']}`}
                      >
                        <i className="iconfont  icon-icforbidden"></i> Expired
                      </span>
                    ) : instanceData?.status?.toLowerCase() ===
                      'expiring soon' ? (
                      <span className="status status-expiring-soon">
                        <i className="iconfont  icon-questioncircle"></i>{' '}
                        Expiring Soon
                      </span>
                    ) : instanceData?.status?.toLowerCase() === 'pending' ? (
                      <span
                        className={
                          (styles['status'], styles['status-starting'])
                        }
                      >
                        <i className="iconfont icon-refresh "></i>

                        <span>Stating</span>
                      </span>
                    ) : (
                      <div>other</div>
                    )}
                  </>
                }
              </span>
            </h3>
            <p className={styles['gpu-location']}>{instanceData?.location}</p>
          </div>
        </div>
        <div className={styles['header_right']}>
          {/* <Button
            className={styles['connect-btn']}
            onClick={() =>
              handleOperation('start', record?.id, record?.node?.id)
            }
          >
            Start
            <div className={styles['icon']}>
              <PlayCircleOutlined />
            </div>
          </Button>
          <Button
            className={`${styles['connect-btn']} ${styles['diseabled']}`}
            onClick={() =>
              handleOperation('stop', record?.id, record?.node?.id)
            }
          >
            Stop
            <div className={styles['icon']}>
              <HourglassOutlined color="orange" />
            </div>
          </Button> */}
          <span className={styles['more']}>
            <OperationModal record={instanceData} getAllNodes={getNode} />
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
          configInfo={instanceData}
        />
      </div>
    </Card>
  );
};

export default InstanceMonitor;
