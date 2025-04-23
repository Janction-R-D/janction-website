import { Duration, DURATION_OPTIONS } from '@/constant';
import { Form, InputNumber, Select } from 'antd';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { useEffect, useMemo } from 'react';

const DURATION_TO_HOURS = {
  // [Duration.Houre]: 1/24,
  [Duration.Day]: 24,
  [Duration.Week]: 24 * 7,
  [Duration.Month]: 24 * 30,
  // [Duration.Year]: 24 * 30 * 12,
};

const getUnitValueFromLabel = (label) => {
  const match = Object.entries(Duration).find(([key, val]) => key === label);
  return match?.[1];
};
const PurDuration = (props) => {
  const { formValues, form } = props;
  const { node } = formValues;

  const limit = useMemo(() => {
    const minUnitVal =
      getUnitValueFromLabel(node?.config?.minimum_lease_unit) ?? Duration.Day;
    const maxUnitVal =
      getUnitValueFromLabel(node?.config?.maximum_lease_unit) ?? Duration.Month;

    return {
      minValue: node?.config?.minimum_lease_duration ?? 1,
      maxValue: node?.config?.maximum_lease_duration ?? 30,
      minUnit: minUnitVal,
      maxUnit: maxUnitVal,
    };
  }, [formValues]);

  const allowedUnits = useMemo(() => {
    return DURATION_OPTIONS.filter(
      (opt) => opt.value >= limit.minUnit && opt.value <= limit.maxUnit,
    );
  }, [formValues]);

  return (
    <div className={styles['duration-wrapper']}>
      <LabelVal nameWidthAuto name="Purchase duration">
        <div className={styles['input-group']}>
          <Form.Item
            name={['purDuration', 'value']}
            noStyle
            initialValue={limit.minValue}
            rules={[
              { required: true, message: 'Please input duration value' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === undefined || value === null || value === '') {
                    return Promise.resolve();
                  }
                  if (value < limit.minValue || value > limit.maxValue) {
                    return Promise.reject(
                      `Value must be between ${limit.minValue} ${node?.config?.minimum_lease_unit} and ${limit.maxValue} ${node?.config?.maximum_lease_unit}`,
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber
              type="number"
              bordered={false}
              min={1}
              style={{ width: '200px' }}
            />
          </Form.Item>
          <Form.Item
            name={['purDuration', 'unit']}
            noStyle
            initialValue={limit.minUnit}
            rules={[
              { required: true, message: 'please select duration type' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === undefined || value === null || value === '') {
                    return Promise.resolve();
                  }

                  if (value < limit.minUnit || value > limit.maxUnit) {
                    return Promise.reject(
                      `Value must be between ${limit.minValue} ${node?.config?.minimum_lease_unit} and ${limit.maxValue} ${node?.config?.maximum_lease_unit}`,
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              bordered={false}
              options={allowedUnits}
              style={{ width: '105px' }}
            ></Select>
          </Form.Item>
        </div>
      </LabelVal>
    </div>
  );
};

export default PurDuration;
