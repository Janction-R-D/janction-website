import React from 'react';
import { Radio, Input } from 'antd';
export default function Filters({ styles, setFilter, filters }) {
  const handleFilters = (filter) => {
    setFilter((prevState) => ({ ...prevState, status: filter.toLowerCase() }));
  };
  const handleSearch = (value) => {
    setFilter((prevState) => ({ ...prevState, word: value }));
  };
  return (
    <div className={styles['filters']}>
      <div className={styles['band-radio-wrapper']}>
        <Radio.Group
          value={filters?.status}
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
            value="listed"
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
          <Radio.Button
            value="offline"
            name="filter"
            onClick={() => handleFilters('offline')}
          >
            offline
          </Radio.Button>
        </Radio.Group>
      </div>

      <Input
        value={filters?.word}
        suffix={
          <i className="iconfont icon-search" style={{ fontSize: '1vw' }} />
        }
        placeholder="You can fuzzy search for nodes by Device ID"
        onChange={(e) => handleSearch(e.target.value)}
        onPressEnter={(e) => handleSearch(e.target.value)}
        className={styles['search-input']}
      />
    </div>
  );
}
