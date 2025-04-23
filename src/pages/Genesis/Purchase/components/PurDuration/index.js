import { Duration, DURATION_OPTIONS } from '@/constant';
import { Form, InputNumber, Select } from 'antd';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { useMemo } from 'react';

const DURATION_TO_HOURS = {
  [Duration.Day]: 24,
  [Duration.Week]: 24 * 7,
  [Duration.Month]: 24 * 30,
  [Duration.Year]: 24 * 30 * 12,
};

const UNIT_MAX_VALUES = {
  [Duration.Day]: 30,
  [Duration.Week]: 4,
  [Duration.Month]: 12,
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
      getUnitValueFromLabel(node?.config?.minimum_lease_unit) ?? Duration.Hour;
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

  const selectedUnit =
    form.getFieldValue(['purDuration', 'unit']) ?? Duration.Day;
  const maxValue = UNIT_MAX_VALUES[selectedUnit] ?? 30;

  return (
    <div className={styles['duration-wrapper']}>
      <LabelVal nameWidthAuto name="Purchase duration">
        <div className={styles['input-group']}>
          <Form.Item
            name={['purDuration', 'value']}
            initialValue={limit.minValue}
            noStyle
          >
            <InputNumber
              type="number"
              bordered={false}
              min={1}
              // max={maxValue}
              style={{ width: '200px' }}
            />
          </Form.Item>

          <Form.Item
            name={['purDuration', 'unit']}
            initialValue={limit.minUnit}
            noStyle
          >
            <Select
              bordered={false}
              options={allowedUnits}
              style={{ width: '105px' }}
            />
          </Form.Item>

          {/* Validación conjunta para 'value' y 'unit' */}
          <Form.Item
            name="purDuration"
            noStyle
            rules={[
              {
                validator: (_, purDuration) => {
                  const val = purDuration?.value;
                  const unit = purDuration?.unit;

                  if (val === undefined || val === null || val === '') {
                    return Promise.reject(
                      new Error('Duration value is required.'),
                    );
                  }

                  if (unit === undefined || unit === null || unit === '') {
                    return Promise.reject(
                      new Error('Duration unit is required.'),
                    );
                  }
                  // Validar los valores máximos específicos por unidad
                  if (val > (UNIT_MAX_VALUES[unit] ?? 30)) {
                    const unitLabel = Object.keys(Duration).find(
                      (key) => Duration[key] === unit,
                    );
                    return Promise.reject(
                      new Error(
                        `Exceeded max value of ${
                          UNIT_MAX_VALUES[unit] ?? 30
                        } for ${unitLabel}`,
                      ),
                    );
                  }

                  const valueInHours = val * DURATION_TO_HOURS[unit];
                  const minInHours =
                    limit.minValue * DURATION_TO_HOURS[limit.minUnit];
                  const maxInHours =
                    limit.maxValue * DURATION_TO_HOURS[limit.maxUnit];
                  console.log(val, valueInHours, minInHours);

                  // Verificar los límites globales de valor
                  if (valueInHours < minInHours || valueInHours > maxInHours) {
                    return Promise.reject(
                      new Error(
                        `Value must be between ${limit.minValue} ${node?.config?.minimum_lease_unit} and ${limit.maxValue} ${node?.config?.maximum_lease_unit}`,
                      ),
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <div style={{ display: 'none' }} />
          </Form.Item>
        </div>
      </LabelVal>
    </div>
  );
};

export default PurDuration;
