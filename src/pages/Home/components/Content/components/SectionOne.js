import { useIntl } from 'umi';
import styles from './index.less';

export default function SectionOne() {
  const intl = useIntl();

  return (
    <section className={styles['sectionOne']}>
      <h1>{intl.formatMessage({ id: 'sectionOne.title' })}</h1>
      <span>{intl.formatMessage({ id: 'sectionOne.description' })}</span>
    </section>
  );
}
