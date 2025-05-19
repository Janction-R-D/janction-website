import { useEffect, useMemo, useState } from 'react';
import { Duration, DURATION_OPTIONS } from '@/constant';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { useEffect, useMemo } from 'react';

const DURATION_TO_HOURS = {
  [Duration.Hour]: 1,
  [Duration.Day]: 24,
  [Duration.Week]: 24 * 7,
  [Duration.Month]: 24 * 30,
  [Duration.Year]: 24 * 30 * 12,
};

const UNIT_MAX_VALUES = {
  [Duration.Hour]: 24,
  [Duration.Day]: 30,
  [Duration.Week]: 4,
  [Duration.Month]: 12,
};

const PurDuration = ({ formValues, form }) => {
  const { node } = formValues || {};
  useEffect(() => {
    if (form) {
      form.validateFields(['purDuration']);
    }
  }, [formValues]);
  const limit = useMemo(() => {
    const minUnitVal =
      getUnitValueFromLabel(node?.config?.minimum_lease_unit) || Duration.Day;
    const maxUnitVal =
      getUnitValueFromLabel(node?.config?.maximum_lease_unit) ?? Duration.Year;

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

  const handleChange = (delta) => {
    let next = delta === 'add';
    let newVal;

    if (next) {
      setValue(Number(value) + 1);
      newVal = Number(value) + 1;
    } else {
      if (Number(value) == 1) return;
      setValue(Number(value) - 1);
      newVal = Number(value) - 1;
    }

    form.setFieldsValue({
      purDuration: { value: newVal, unit },
    });
  };
  console.log(formValues);

  const handleInputChange = (Newvalue) => {
    setValue(Newvalue);
    // Sincronizar con el formulario
    form.setFieldsValue({
      purDuration: { unit, value: Newvalue },
    });
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);

    // Sincronizar con el formulario
    // form.setFieldsValue({
    //   purDuration: { value, unit: newUnit },
    // });
  };

  return (
    <div className={styles['duration-wrapper']}>
      <div className={styles['input-group']}>
        <div className={styles['btn']} onClick={() => handleChange('sub')}>
          -
        </div>
        <Form.Item
          name={['purDuration', 'value']}
          noStyle
          rules={[{ required: true, message: 'please input duration value' }]}
        >
          <Input
            type="number"
            bordered={false}
            value={value}
            defaultValue={value}
            min={1}
            onChange={handleInputChange}
            style={{ width: '60px' }}
            className={styles['input']}
          />
        </Form.Item>
        <div className={styles['btn']} onClick={() => handleChange('add')}>
          <i className="iconfont icon-add" />
        </div>
        <Form.Item
          name={['purDuration', 'unit']}
          noStyle
          initialValue={purDuration.unit ?? Duration.Day}
          rules={[{ required: true, message: 'please select duration type' }]}
        >
          <Select
            value={unit}
            onChange={handleUnitChange}
            bordered={false}
            options={allowedUnits}
            style={{ width: '105px' }}
          />
        </Form.Item>

        {/* Validación conjunta */}
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

                if (
                  node &&
                  unit === undefined &&
                  (unit === null || unit === '')
                ) {
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
    </div>
  );
};

export default PurDuration;

const getUnitValueFromLabel = (label) => {
  const match = Object.entries(Duration).find(([key]) => key === label);
  return match?.[1];
};
