import styles from './index.less';
import { modelsGpu } from './ModelTable';

export default function CustomSelect({ onSelect, open, setOpen }) {
  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}>
          <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            {modelsGpu.map((opt) => (
              <div
                key={opt}
                className={styles.option}
                onClick={() => onSelect(opt)}
              >
                {opt.model}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
