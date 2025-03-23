import { useEffect, useState } from 'react';
import { Avatar, Button, Card, Checkbox, Empty, Input, Pagination } from 'antd';
import styles from './index.less';
import useContinents from '@/hooks/useContinents';
import { isEmpty } from 'lodash';

export default function Location({ value = [], onChange, current }) {
  const continents = useContinents({ current });

  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (current !== 2) return;
    if (isEmpty(continents)) return;
    const allItems = Object.values(continents).flatMap(
      (countries) => countries,
    );
    setList(allItems);
  }, [continents]);

  const handleCheckboxChange = (checked, newValue) => {
    let newValues = checked
      ? [...value, newValue]
      : value.filter((item) => item !== newValue);
    onChange?.(newValues);
  };

  // Filtrar países según el texto de búsqueda
  const filteredList = list.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Obtener los países de la página actual
  const paginatedList = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <Card className={styles['location-conf-wrapper']}>
      <header className={styles['header']}>
        <Input
          placeholder="Search country..."
          prefix={<i className="iconfont icon-search" />}
          className={styles['search']}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value); // Actualiza el estado de búsqueda
            setCurrentPage(1); // Reinicia a la primera página tras una nueva búsqueda
          }}
        />
        <Button
          className={styles['btn']}
          onClick={() => onChange(filteredList.map((c) => c.name))}
        >
          Select All Countries
        </Button>
      </header>

      {filteredList.length === 0 ? (
        <Empty description="Not Found" className={styles['not-found']} />
      ) : (
        paginatedList.map((country) => (
          <Card
            key={country.code}
            className={[
              styles['item'],
              value.includes(country.name) && styles['active-item'],
            ].join(' ')}
            onClick={() =>
              handleCheckboxChange(!value.includes(country.name), country.name)
            }
          >
            <div className={styles['content']}>
              <div className={styles['content-flag']}>
                <Avatar
                  src={
                    current !== 2
                      ? ''
                      : `https://flagsapi.com/${country.code}/flat/64.png`
                  }
                  alt={`${country.name} flag`}
                  className={styles['flag']}
                />
                <p className={styles['description']}>{country.name}</p>
              </div>
              <Checkbox
                className={styles['rounded-check']}
                checked={value.includes(country.name)}
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, country.name)
                }
              />
            </div>
          </Card>
        ))
      )}

      {filteredList.length > 0 && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredList.length}
          onChange={(page) => setCurrentPage(page)}
          className={styles['pagination-wrapper']}
          showSizeChanger={false}
        />
      )}
    </Card>
  );
}
