import React from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';
import { Divider } from 'antd';
const DiskRing = ({ label, used, max }) => {
  const percent = Math.round((used / max) * 100);

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

const ResourceUtilization = () => {
  return (
    <div className={styles.resourceCard}>
      <header className={styles.header}>
        <div className={styles.title}>Resource utilization</div>
      </header>
      <div className={styles.diskSection}>
        <DiskRing label="System disk" used={46} max={100} />
        <DiskRing label="Data disk" used={72} max={120} />
      </div>
      <div className={styles.information}>
        <div className={styles.title}>Instance Information</div>
        <article>
          <div className={styles.item}>
            <span className={styles.label}>Specs: </span>
            <span className={styles.value}>
              {' '}
              8 Cores <Divider type="vertical" /> 16GB
            </span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>GPU: </span>
            <span className={styles.value}>
              Nvdia Tx4090 <Divider type="vertical" /> 16GB
            </span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Expiration Time: </span>
            <span className={styles.value}>
              <span> 2025-05-04 10:22:22</span>
              <span className={styles['renewal']}>Renewal 45% off</span>
            </span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ResourceUtilization;
