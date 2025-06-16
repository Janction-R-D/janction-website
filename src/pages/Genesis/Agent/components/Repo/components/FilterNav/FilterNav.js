import React, { useState } from 'react';
import styles from './index.less'; // Asegúrate de tener este archivo

export default function FilterNav({ onChange }) {
  const [activeFilter, setActiveFilter] = useState('Recommended');
  const filters = [
    { label: 'Recommended', key: 'Recommended' },
    { label: 'Popular', key: 'Popular' },
    { label: 'Score', key: 'Score' },
  ];
  const handleClick = (key) => {
    setActiveFilter(key);
    if (onChange) {
      onChange(key);
    }
  };

  return (
    <div className={styles.nav}>
      {filters.map((filter) => (
        <div
          key={filter.key}
          className={`${styles.item} ${
            activeFilter === filter.key ? styles.active : ''
          }`}
          onClick={() => handleClick(filter.key)}
        >
          {filter.label}
        </div>
      ))}
    </div>
  );
}
