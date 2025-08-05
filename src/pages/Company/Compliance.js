import styles from './compliance.less';
import { useIntl } from 'umi';

export default function CompliancePlainText() {
  const { formatMessage } = useIntl();

  return (
    <div className={styles.complianceText}>
      <h2>{formatMessage({ id: 'compliance.security.title' })}</h2>
      <div className={styles.complianceBox}>
        <p>{formatMessage({ id: 'compliance.security.policy' })}</p>
        <p>{formatMessage({ id: 'compliance.security.compliance' })}</p>
        <p>{formatMessage({ id: 'compliance.security.antisocial' })}</p>
        <p>{formatMessage({ id: 'compliance.security.data-handling' })}</p>
        <p>{formatMessage({ id: 'compliance.security.third-party' })}</p>
        <p>{formatMessage({ id: 'compliance.security.access-control' })}</p>
        <p>{formatMessage({ id: 'compliance.security.revision-policy' })}</p>
        <p>{formatMessage({ id: 'compliance.security.commitment' })}</p>
      </div>
    </div>
  );
}
