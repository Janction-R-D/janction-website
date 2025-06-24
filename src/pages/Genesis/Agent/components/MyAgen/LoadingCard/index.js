import { Card } from 'antd';
import styles from './index.less';
import emptyImg from '@/assets/images/genesis/empty-doc.png';

export default function LoadingCard() {
  return (
    <Card className={styles['card']}>
      <div className={styles.spinner}></div>
      <p className={styles['empty-text']}>Loading</p>
    </Card>
  );
}
