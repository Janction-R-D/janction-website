import { Card } from 'antd';
import styles from './index.less';
import emptyImg from '@/assets/images/genesis/empty-doc.png';

export default function EmptyCard() {
  return (
    <Card className={styles['card']}>
      <img src={emptyImg} />
      <p className={styles['empty-text']}>
        No available Agent , please create a new Agent !
      </p>
    </Card>
  );
}
