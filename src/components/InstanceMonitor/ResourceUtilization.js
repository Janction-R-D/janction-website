import React from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';
import { Divider } from 'antd';
const DiskRing = ({ label, used = 0, max = 0 }) => {
  const percent = Math.round((used / max) * 100) || 0;

  const formatValue = (value) => {
    if (value >= 1) return `${value.toFixed(1)} GB`;
    return `${(value * 1024).toFixed(0)} MB`;
  };

  const option = {
    series: [
      {
        type: 'pie',
        radius: ['72%', '90%'],
        label: {
          show: true,
          position: 'center',
          formatter: `{value|${percent}%}`,
          rich: {
            value: {
              fontSize: 16,
              color: '#6cf',
              fontWeight: 'bold',
            },
          },
        },
        labelLine: { show: false },
        data: [
          { value: used, name: 'Used' },
          { value: max - used, name: 'Free' },
        ],
        color: ['#6cf', '#2b2f3a'],
      },
    ],
  };

  return (
    <div className={styles.ringBlock}>
      <div>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {formatValue(used)} / {formatValue(max)}
        </span>
      </div>
      <ReactECharts
        option={option}
        style={{ height: '160px', width: '120px' }}
      />
    </div>
  );
};

const ResourceUtilization = ({ configInfo }) => {
  const getGpu = () => {
    if (!configInfo?.gpu_chip) return '--';
    const gpu = configInfo.gpu_chip;

    return (
      <>
        <p>{gpu ? `${gpu[0]} * ${gpu.length}` : '--'}</p>
      </>
    );
  };
  const getCpu = () => {
    if (!configInfo?.cpu_chip) return '--';
    const cpu = configInfo?.cpu_chip;

    return (
      <>
        <p>{cpu}</p>
      </>
    );
  };
  return (
    <div className={styles.resourceCard}>
      <header className={styles.header}>
        <div className={styles.title}>Resource utilization</div>
      </header>
      <section>
        <div className={styles.diskSection}>
          <DiskRing label="System disk" used={0} max={100} />
          <DiskRing label="Data disk" used={0} max={100} />
        </div>
        <div className={styles.information}>
          <div className={styles.title}>Instance Information</div>
          <article>
            <div className={styles.item}>
              <span className={styles.label}>Specs: </span>
              <span className={styles.value}>
                {' '}
                {configInfo?.Cores} Cores <Divider type="vertical" />{' '}
                {configInfo?.memory}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>GPU: </span>
              <span className={styles.value}>
                {getGpu()} <Divider type="vertical" />
                {getCpu()}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Expiration Time: </span>
              <span className={styles.value}>
                <span> {configInfo?.expired}</span>
                {/* <span className={styles['renewal']}>Renewal 45% off</span> */}
              </span>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ResourceUtilization;
