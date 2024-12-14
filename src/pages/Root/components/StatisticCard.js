import { renderBackgroudImg } from '@/utils/lang';
import styles from './index.less';
import up from '@/assets/images/root/up.png';
import down from '@/assets/images/root/down.png';
import invariant from '@/assets/images/root/invariant.png';
import numeral from 'numeral';

const StatisticCard = (props) => {
  const { title, value, unit, increaseRate, desc, precision } = props;

  return (
    <div className={styles['statistic-card']}>
      <div className={styles['title']}>{title}</div>
      <div className={styles['value']}>
        <span>{numeral(value).format(precision ? '0,0.00' : '0,0')}</span>
        <span className={styles['unit']}>{unit}</span>
      </div>
      <div className={styles['increase-rate']}>
        <span
          className={[
            styles['icon'],
            !increaseRate && styles['invariant'],
          ].join(' ')}
          style={renderBackgroudImg(
            increaseRate > 0 ? up : increaseRate < 0 ? down : invariant,
          )}
        ></span>
        <span
          className={[
            styles['rate-value'],
            increaseRate > 0 && styles['up-value'],
            increaseRate < 0 && styles['down-value'],
          ].join(' ')}
        >
          {numeral(increaseRate).format('0%')}
        </span>
        <span className={styles['desc']}>{desc}</span>
      </div>
    </div>
  );
};

export default StatisticCard;
