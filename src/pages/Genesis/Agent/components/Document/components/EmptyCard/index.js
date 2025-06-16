import { Card } from 'antd';
import styles from './index.less';
import emptyImg from '@/assets/images/genesis/empty-doc.png';

export default function EmptyCard() {
  return (
    <Card className={styles['card']}>
      <img src={emptyImg} />
      <p className={styles['empty-text']}>
        In the process of feature development
      </p>
    </Card>
  );
}
