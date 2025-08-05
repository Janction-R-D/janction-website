import { useIntl } from 'umi';
import styles from './purpose.less';

const Purpose = ({ value = [], onChange }) => {
  const intl = useIntl();
  const toggle = (itemValue) => {
    const newValue = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue];
    onChange?.(newValue);
  };

  const OPTIONS = [
    {
      label: intl.formatMessage({ id: 'options.film' }),
      value: intl.formatMessage({ id: 'options.film' }),
    },
    {
      label: intl.formatMessage({ id: 'options.industrial' }),
      value: intl.formatMessage({ id: 'options.industrial' }),
    },
    {
      label: intl.formatMessage({ id: 'options.llm' }),
      value: intl.formatMessage({ id: 'options.llm' }),
    },
    {
      label: intl.formatMessage({ id: 'options.animation' }),
      value: intl.formatMessage({ id: 'options.animation' }),
    },
    {
      label: intl.formatMessage({ id: 'options.game' }),
      value: intl.formatMessage({ id: 'options.game' }),
    },
    { label: intl.formatMessage({ id: 'options.ad' }), value: 'Advertising' },
    {
      label: intl.formatMessage({ id: 'options.imageGen' }),
      value: intl.formatMessage({ id: 'options.imageGen' }),
    },
    {
      label: intl.formatMessage({ id: 'options.artist' }),
      value: intl.formatMessage({ id: 'options.artist' }),
    },
  ];

  return (
    <div className={styles['purpose-selector']}>
      {OPTIONS.map((item) => (
        <div
          key={item.value}
          className={`${styles.item} ${
            value.includes(item.value) ? styles.selected : ''
          }`}
          onClick={() => toggle(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Purpose;
