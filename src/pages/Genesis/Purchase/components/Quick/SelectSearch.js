import { Radio, Select } from 'antd';
import styles from './selector.less';
import { useEffect, useState } from 'react';
import { set } from 'lodash';

const { Option } = Select;
export default function SelectSearch({
  countries,
  setList,
  originalList,
  list,
  formValues,
}) {
  const isFixedOption = ['basic-cpu', 'high-gpu'].includes(
    formValues?.specification,
  );
  const [code, setCode] = useState('all');
  const isCountrySelected = !isFixedOption;
  const renderCountryOptions = () => {
    return countries.map((country) => (
      <Option key={country.code} value={country.code}>
        {country.name}
      </Option>
    ));
  };
  const handleCountryChange = (countryCode) => {
    // onChange(countryCode);
    setCode(countryCode);
    const newList = originalList.filter(
      (node) => node?.attr?.location === countryCode,
    );
    console.log(countryCode + '\n', 'newList :', newList);
    setList(newList);
  };
  useEffect(() => {
    console.log(code);
    if (code === 'all') {
      setList(originalList);
    } else {
      const newList = originalList.filter(
        (node) => node?.attr?.location === code,
      );
      console.log(code + '\n', 'newList :', newList);
      setList(newList);
    }
  }, [formValues?.specification]);
  return (
    <div className={styles['type-selector-select']}>
      <Radio.Group
        value={isCountrySelected ? 'country' : null}
        onChange={(e) => {
          if (
            e.target.value === 'country' &&
            !isCountrySelected &&
            countries.length > 0
          ) {
            handleCountryChange(countries[0].code);
          }
        }}
      >
        <Radio.Button value="country">Location:</Radio.Button>
      </Radio.Group>

      <Select
        showSearch
        placeholder="Select Country"
        style={{ width: 180 }}
        onChange={handleCountryChange}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        disabled={countries.length === 0}
      >
        {renderCountryOptions()}
      </Select>
    </div>
  );
}
