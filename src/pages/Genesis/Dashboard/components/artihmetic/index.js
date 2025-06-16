import ReactECharts from 'echarts-for-react';
import styles from './index.less';
const MemoryRing = ({ label, used, max }) => {
  const percent = Math.round((used / max) * 100);

  const formatValue = (value) => {
    if (value >= 1) return `${value.toFixed(1)} GB`;
    return `${(value * 1024).toFixed(0)} MB`;
  };

  const option = {
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: `${percent}%`,
          color: '#6cf',
          fontSize: 18,
          fontWeight: 'bold',
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
    <div>
      <div className={styles.ring}>
        <ReactECharts
          option={option}
          style={{ height: '100px', width: '100px' }}
        />
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {formatValue(used)} / {formatValue(max)}
      </div>
    </div>
  );
};

const Arithmetic = () => {
  return (
    <div className={styles.arithmeticCard}>
      <header>
        <div className={styles.title}>Arithmetic situation</div>
        <span className={styles.subtitle}>Total</span>
        <div className={styles.total}>0</div>
      </header>
      <div className={styles.memorySection}>
        <MemoryRing label="Online memory" used={0} max={10} />
        <MemoryRing label="Offline memory" used={0} max={15} />
        <MemoryRing label="Free memory" used={0} max={0.9} />
      </div>
    </div>
  );
};

export default Arithmetic;
