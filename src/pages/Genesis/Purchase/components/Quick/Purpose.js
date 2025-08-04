import { useIntl } from 'umi';
import styles from './purpose.less';

const Purpose = ({ value = [], onChange }) => {
  const intl = useIntl();
  const toggle = (item) => {
    const newValue = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];
    onChange?.(newValue);
  };
  const OPTIONS = [
    {
      label: intl.formatMessage({ id: 'options.film' }),
      value: 'Film production',
    },
    {
      label: intl.formatMessage({ id: 'options.industrial' }),
      value: 'Industrial design',
    },
    {
      label: intl.formatMessage({ id: 'options.llm' }),
      value: 'Enterprise LLM',
    },
    {
      label: intl.formatMessage({ id: 'options.animation' }),
      value: 'Animation Studios',
    },
    {
      label: intl.formatMessage({ id: 'options.game' }),
      value: 'Game Developer',
    },
    { label: intl.formatMessage({ id: 'options.ad' }), value: 'Advertising' },
    {
      label: intl.formatMessage({ id: 'options.imageGen' }),
      value: 'AI Image Generation',
    },
    {
      label: intl.formatMessage({ id: 'options.artist' }),
      value: 'Aspiring 3D Artist',
    },
  ];
  return (
    <div className={styles['purpose-selector']}>
      {OPTIONS.map((item) => (
        <div
          key={item}
          className={`${styles.item} ${
            value.includes(item) ? styles.selected : ''
          }`}
          onClick={() => toggle(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Purpose;
