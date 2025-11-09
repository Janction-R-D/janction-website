import { useIntl } from 'umi';
import styles from './priceCards.less';

const PriceCards = () => {
  const intl = useIntl();

  const plans = [
    {
      titleKey: 'plan.standard.title',
      priceKey: 'plan.standard.price',
      subtitleKey: 'plan.standard.subtitle',
      hourlyPriceKey: 'plan.standard.hourlyPrice',
      hourlySubtitleKey: 'plan.standard.hourlySubtitle',
      detailsKeys: ['plan.standard.details.1'],
    },
    {
      titleKey: 'plan.business.title',
      priceKey: 'plan.business.price',
      subtitleKey: 'plan.business.subtitle',
      detailsKeys: [
        'plan.business.details.1',
        'plan.business.details.2',
        'plan.business.details.3',
        'plan.business.details.4',
        'plan.business.details.5',
      ],
    },
    {
      titleKey: 'plan.enterprise.title',
      priceKey: 'plan.enterprise.price',
      subtitleKey: 'plan.enterprise.subtitle',
      detailsKeys: ['plan.enterprise.details.1', 'plan.enterprise.details.2'],
    },
  ];

  return (
    <div className={styles.priceCardsContainer}>
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`${styles.card} ${styles['card-' + index]}`}
        >
          <div className={styles.cardHeader}>
            <h3>{intl.formatMessage({ id: plan.titleKey })}</h3>
            {plan.subtitleKey && (
              <p className={styles.subtitle}>
                {intl.formatMessage({ id: plan.subtitleKey })}
              </p>
            )}
          </div>
          <div className={styles.cardBody}>
            <h2 className={styles.price}>
              {intl.formatMessage({ id: plan.priceKey })}
            </h2>
            {plan.hourlyPriceKey && (
              <p className={styles.hourlyPrice}>
                {intl.formatMessage({ id: plan.hourlyPriceKey })}
              </p>
            )}
            <ul>
              {plan.detailsKeys.map((key, i) => (
                <li key={i}>{intl.formatMessage({ id: key })}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriceCards;
