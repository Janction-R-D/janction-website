import styles from './index.less';

const options = [
  'Nvidia RTX 4090',
  'Nvidia RTX 3080',
  'Nvidia RTX 3080',
  'Nvidia RTX 3080',

  'Nvidia RTX 3080',
];

export default function CustomSelect({ onSelect, open, setOpen }) {
  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}>
          <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            {options.map((opt) => (
              <div
                key={opt}
                className={styles.option}
                onClick={() => onSelect(opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
