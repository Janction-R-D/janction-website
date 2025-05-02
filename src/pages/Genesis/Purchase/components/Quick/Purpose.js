import styles from './purpose.less';

const OPTIONS = [
  'Film production',
  'Industrial design',
  'Enterprise LLM',
  'Animation Studios',
  'Game Developer',
  'Advertising',
  'AI Image Generation',
  'Aspiring 3D Artist',
];

const Purpose = ({ value = [], onChange }) => {
  const toggle = (item) => {
    const newValue = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];
    onChange?.(newValue);
  };

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
          {item}
        </div>
      ))}
    </div>
  );
};

export default Purpose;
