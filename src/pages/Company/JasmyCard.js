import { Card } from 'antd';
import styles from './index.less';
import { useIntl } from 'umi';

export default function JasmyCard() {
  const intl = useIntl();

  return (
    <div className={styles.container_jasmycard}>
      <div className={styles.card} bordered={false}>
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>
              {intl.formatMessage({ id: 'jasmyCard.legalName.label' })}
            </span>
            <span className={styles.value}>
              {intl.formatMessage({ id: 'jasmyCard.legalName.value' })}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {intl.formatMessage({ id: 'jasmyCard.address.label' })}
            </span>
            <span className={styles.value}>
              {intl.formatMessage({ id: 'jasmyCard.address.value' })}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {intl.formatMessage({ id: 'jasmyCard.phone.label' })}
            </span>
            <span className={styles.value}>
              {intl.formatMessage({ id: 'jasmyCard.phone.value' })}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {intl.formatMessage({ id: 'jasmyCard.email.label' })}
            </span>
            <span className={styles.value}>
              {intl.formatMessage({ id: 'jasmyCard.email.value' })}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {intl.formatMessage({ id: 'jasmyCard.supervisor.label' })}
            </span>
            <span className={styles.value}>
              {intl.formatMessage({ id: 'jasmyCard.supervisor.value' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
