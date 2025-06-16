import { useEffect, useMemo } from 'react';
import { Duration, DURATION_OPTIONS } from '@/constant';
import { Form, InputNumber, Select } from 'antd';
import styles from './index.less';

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
const getUnitValueFromLabel = (label) => {
  const match = Object.entries(Duration).find(([key]) => key === label);
  return match?.[1];
};

const PurDuration = ({ formValues, form, setFormValues }) => {
  const { node, purDuration } = formValues || {};

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
  const controlInput = (value) => {
    setFormValues({
      ...formValues,
      purDuration: {
        unit: purDuration?.unit,
        value,
      },
    });
  };
  const handleChange = (delta) => {
    const currentValue = form.getFieldValue(['purDuration', 'value']) || 1;
    let newVal =
      delta === 'add' ? Number(currentValue) + 1 : Number(currentValue) - 1;
    const formData = form.getFieldValue('purDuration');
    console.log(formData);
    if (newVal < 1) return;
    controlInput(newVal);
    form.setFieldsValue({
      purDuration: { ...formData, value: newVal },
    });
  };
  const handleInputChange = (val) => {
    if (val === null || val === undefined || val === '') return;
    controlInput(val);
    form.setFieldsValue({
      purDuration: { unit: form.getFieldValue('purDuration').unit, value: val },
    });
  };
  const handleUnitChange = (newUnit) => {
    form.setFieldsValue({
      purDuration: { ...form.getFieldValue('purDuration'), unit: newUnit },
    });
  };

  return (
    <div style={{ width: '280px' }}>
      <div className={styles['duration-wrapper']}>
        <div className={styles['input-group']}>
          <div className={styles['btn']} onClick={() => handleChange('sub')}>
            -
          </div>
          <Form.Item
            name={['purDuration', 'value']}
            initialValue={limit.minValue}
            noStyle
          >
            <InputNumber
              type="number"
              bordered={false}
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
            initialValue={limit.minUnit}
          >
            <Select
              value={form.getFieldValue(['purDuration', 'unit'])}
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
    </div>
  );
};

export default PurDuration;
