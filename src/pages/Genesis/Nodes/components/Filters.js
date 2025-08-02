import React from 'react';
import { Radio, Input, Select } from 'antd';
import { useIntl } from 'umi';
export default function Filters({ styles, setFilter, filters }) {
  const intl = useIntl();
  const handleFilters = (filter) => {
    setFilter((prevState) => ({ ...prevState, status: filter.toLowerCase() }));
  };
  const handleSearch = (value) => {
    setFilter((prevState) => ({ ...prevState, word: value }));
  };
  return (
    <div className={styles['filters']}>
      <div className={styles['band-select-wrapper']}>
        <Select
          value={filters?.status}
          onChange={handleFilters}
          className={styles['band-select']}
          dropdownMatchSelectWidth={false}
          style={{ borderRadius: '24px', width: 160 }} // puedes ajustar el ancho
        >
          <Option value="all">
            {intl.formatMessage({ id: 'filters.allNodes' })}
          </Option>
          <Option value="running">
            {intl.formatMessage({ id: 'filters.running' })}
          </Option>
          <Option value="listed">
            {intl.formatMessage({ id: 'filters.listed' })}
          </Option>
          <Option value="active">
            {intl.formatMessage({ id: 'filters.active' })}
          </Option>
          <Option value="offline">
            {intl.formatMessage({ id: 'filters.offline' })}
          </Option>
        </Select>
      </div>
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
            {intl.formatMessage({ id: 'filters.allNodes' })}
          </Radio.Button>
          <Radio.Button
            value="running"
            name="filter"
            onClick={() => handleFilters('running')}
          >
            {intl.formatMessage({ id: 'filters.running' })}
          </Radio.Button>
          <Radio.Button
            value="listed"
            name="filter"
            onClick={() => handleFilters('listed')}
          >
            {intl.formatMessage({ id: 'filters.listed' })}
          </Radio.Button>
          <Radio.Button
            value="active"
            name="filter"
            onClick={() => handleFilters('active')}
          >
            {intl.formatMessage({ id: 'filters.active' })}
          </Radio.Button>
          <Radio.Button
            value="offline"
            name="filter"
            onClick={() => handleFilters('offline')}
          >
            {intl.formatMessage({ id: 'filters.offline' })}
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
