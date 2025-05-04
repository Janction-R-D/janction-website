import styles from './index.less';
import { Button, Divider } from 'antd';
export default function Lessee() {
  return (
    <main className={styles['dashboard-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Dashboard</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>GPU rental service with stable </p>
            <p>service and reasonable price</p>
          </span>
        </header>
      </section>
    </main>
  );
}
