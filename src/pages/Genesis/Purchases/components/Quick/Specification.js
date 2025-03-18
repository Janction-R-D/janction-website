import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Radio } from 'antd';
import { instance_types } from './constant.json';
import JanctionRadio from '@/components/JanctionRadio';
export default function Specification({ value, onChange }) {
  const [specification, setSpecification] = useState(instance_types[0].value);

  return (
    <JanctionRadio
      value={specification}
      onChange={(val) => onChange?.(val)}
      options={instance_types}
    />
  );
}
