import { Slider } from 'antd';
import styles from './index.less';

const JanctionSlider = (props) => {
  return (
    <div className={styles['janction-slider']}>
      <Slider {...props} />
    </div>
  );
};

export default JanctionSlider;
