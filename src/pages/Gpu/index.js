import React from 'react';
import styles from './index.less';
import CardFolder from './components/CardFolder';
import ModelTable from './components/ModelTable';
export default function Gpu() {
  return (
    <div className={styles.gpu_wrapper}>
      <h1 className={styles.title}>Provide GPU</h1>
      <div className={styles.cards}>
        <CardFolder />
        <ModelTable />
      </div>
    </div>
  );
}
