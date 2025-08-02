import ReactECharts from 'echarts-for-react';
import styles from './index.less';
import { useIntl, FormattedMessage } from 'umi';

const MemoryRing = ({ label, used, max }) => {
  const percent = Math.round((used / max) * 100);
  const intl = useIntl();

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
          { value: used, name: intl.formatMessage({ id: 'arithmetic.used' }) },
          {
            value: max - used,
            name: intl.formatMessage({ id: 'arithmetic.freeMemory' }),
          },
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
  const intl = useIntl();

  return (
    <div className={styles.arithmeticCard}>
      <header>
        <div className={styles.title}>
          <FormattedMessage id="arithmetic.title" />
        </div>
        <span className={styles.subtitle}>
          <FormattedMessage id="arithmetic.subtitle" />
        </span>
        <div className={styles.total}>0</div>
      </header>
      <div className={styles.memorySection}>
        <MemoryRing
          label={intl.formatMessage({ id: 'arithmetic.online' })}
          used={0}
          max={10}
        />
        <MemoryRing
          label={intl.formatMessage({ id: 'arithmetic.offline' })}
          used={0}
          max={15}
        />
        <MemoryRing
          label={intl.formatMessage({ id: 'arithmetic.free' })}
          used={0}
          max={0.9}
        />
      </div>
    </div>
  );
};

export default Arithmetic;
