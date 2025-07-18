import React from 'react';
import styles from './index.less';
import CardFolder from './components/CardFolder';
import ModelTable from './components/ModelTable';
import { useIntl } from 'umi';
export default function Gpu() {
  const intl = useIntl();
  return (
    <div className={styles.gpu_wrapper}>
      <h1 className={styles.title}>{intl.formatMessage({ id: 'card.gpu' })}</h1>
      <div className={styles.cards}>
        <CardFolder />
        <ModelTable />
      </div>
    </div>
  );
}
