import { Duration, DURATION_OPTIONS } from '@/constant';
import { Form, InputNumber, Select } from 'antd';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { useMemo } from 'react';

const DURATION_TO_HOURS = {
  // [-1]: 1, --> to implement hour choice...
  [Duration.Day]: 24,
  [Duration.Week]: 24 * 7,
  [Duration.Month]: 24 * 30,
};
const toHours = (value, unitValue) => value * DURATION_TO_HOURS[unitValue];

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
      maxValue: node?.config?.maximum_lease_duration ?? 12,
      minUnit: minUnitVal,
      maxUnit: maxUnitVal,
    };
  }, [node]);

  const minHours = useMemo(
    () => toHours(limit.minValue, limit.minUnit),
    [limit],
  );
  const maxHours = useMemo(
    () => toHours(limit.maxValue, limit.maxUnit),
    [limit],
  );

  const allowedUnits = useMemo(() => {
    return DURATION_OPTIONS.filter(
      (opt) => opt.value >= limit.minUnit && opt.value <= limit.maxUnit,
    );
  }, [limit]);
  const handleUnitChange = (unit) => {
    const value = form.getFieldValue(['purDuration', 'value']);
    const totalHours = toHours(value, unit);

    if (totalHours < minHours || totalHours > maxHours) {
      // Si se sale del rango, reseteamos a minValue
      form.setFieldsValue({
        purDuration: {
          value: limit.minValue,
        },
      });
    }
  };
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
                  const unit =
                    getFieldValue(['purDuration', 'unit']) ?? limit.minUnit;
                  const totalHours = toHours(value, unit);

                  if (totalHours < minHours || totalHours > maxHours) {
                    return Promise.reject(
                      `Value must be between ${limit.minValue} ${node?.config?.minimum_lease_unit} and ${limit.maxValue} ${node?.config?.maximum_lease_unit}`,
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber bordered={false} min={1} style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item
            name={['purDuration', 'unit']}
            noStyle
            initialValue={limit.minUnit}
            rules={[{ required: true, message: 'please select duration type' }]}
          >
            <Select
              bordered={false}
              options={allowedUnits}
              style={{ width: '105px' }}
              onChange={handleUnitChange}
            ></Select>
          </Form.Item>
        </div>
      </LabelVal>
    </div>
  );
};

export default PurDuration;
