import { Collapse, Card } from 'antd';
import styles from './index.less';
import { useIntl } from 'umi';

const { Panel } = Collapse;

export default function ComplianceSection() {
  const intl = useIntl();
  const t = (id) => intl.formatMessage({ id });

  return (
    <div className={styles.container_cost}>
      <Card className={styles.card} bordered={false}>
        <Collapse bordered={false} className={styles.collapse} accordion>
          <Panel
            header={t('compliance.founder.title')}
            key="1"
            className={styles.title}
          >
            <div className={styles.content}>
              <p>{t('compliance.founder.p1')}</p>
              <p>{t('compliance.founder.p2')}</p>
              <p>{t('compliance.founder.p3')}</p>
              <p>{t('compliance.founder.p4')}</p>
              <p>{t('compliance.founder.p5')}</p>
              <p className={styles.rightText}>
                {t('compliance.founder.signature')}
              </p>
            </div>
          </Panel>
        </Collapse>
      </Card>

      <Card className={styles.card} bordered={false}>
        <Collapse bordered={false} className={styles.collapse} accordion>
          <Panel
            header={t('compliance.legal.title')}
            key="2"
            className={styles.title}
          >
            <div className={styles.content}>
              <p>{t('compliance.legal.vendor')}</p>
              <p>{t('compliance.legal.rep')}</p>
              <p>{t('compliance.legal.loc')}</p>
              <p>{t('compliance.legal.email')}</p>
              <p>{t('compliance.legal.web')}</p>
              <p>{t('compliance.legal.price')}</p>
              <p>{t('compliance.legal.fees')}</p>
              <p>{t('compliance.legal.payment')}</p>
              <p>{t('compliance.legal.delivery')}</p>
              <p>{t('compliance.legal.returns')}</p>
              <p>{t('compliance.legal.cancel')}</p>
            </div>
          </Panel>
        </Collapse>
      </Card>

      <Card className={styles.card} bordered={false}>
        <Collapse bordered={false} className={styles.collapse} accordion>
          <Panel
            header={t('compliance.security.title')}
            key="3"
            className={styles.title}
          >
            <div className={styles.content}>
              <p>{t('compliance.security.policy')}</p>
              <p>{t('compliance.security.compliance')}</p>
              <p>{t('compliance.security.antisocial')}</p>
            </div>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
}
