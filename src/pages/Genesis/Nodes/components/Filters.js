import React from 'react';
import { Radio, Input } from 'antd';
export default function Filters({ styles, setFilters, filters }) {
  const handleFilters = (filter) => {
    setFilters((prevState) => ({ ...prevState, status: filter.toLowerCase() }));
    console.log(filters, filter);
  };
  const handleSearch = (value) => {
    console.log(value);
    setFilters((prevState) => ({ ...prevState, word: value }));
  };
  return (
    <div className={styles['filters']}>
      <div className={styles['band-radio-wrapper']}>
        <Radio.Group
          defaultValue="all"
          buttonStyle="solid"
          style={{
            borderRadius: '24px',
          }}
          className={styles['band-radio']}
        >
          <Radio.Button
            value="all"
            name="filter"
            onClick={() => handleFilters('all')}
          >
            All nodes
          </Radio.Button>
          <Radio.Button
            value="running"
            name="filter"
            onClick={() => handleFilters('running')}
          >
            running
          </Radio.Button>
          <Radio.Button
            value="list"
            name="filter"
            onClick={() => handleFilters('listed')}
          >
            listed
          </Radio.Button>
          <Radio.Button
            value="active"
            name="filter"
            onClick={() => handleFilters('active')}
          >
            active
          </Radio.Button>
        </Radio.Group>
      </div>

      <Input
        suffix={
          <i className="iconfont icon-search" style={{ fontSize: '1vw' }} />
        }
        placeholder="You can fuzzy search for nodes by device ID or api"
        onChange={(e) => handleSearch(e.target.value)}
        onPressEnter={(e) => handleSearch(e.target.value)}
        className={styles['search-input']}
      />
    </div>
  );
}
