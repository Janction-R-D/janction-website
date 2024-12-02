import JanctionRange from '@/components/JanctionRange';
import JanctionSlider from '@/components/JanctionSlider';
import styles from './index.less';

const ConnectivityTier = (props) => {
  const { value, defaultValue, onChange } = props;

  const marks = {
    0: '1Mbps',
    800: '800Mbps',
    1600: '1600Mbps',
  };

  return (
    <div className={styles['connectivity-tier']}>
      <JanctionSlider
        min={1}
        max={1600}
        marks={marks}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={styles['slider']}
      />
      <JanctionRange
        min={1}
        max={1600}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        unit="Mbps"
      />
    </div>
  );
};

export default ConnectivityTier;
