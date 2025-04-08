import JanctionRadio from '@/components/JanctionRadio';
import { INSTANCE_TYPES } from '@/constant';
import { useState } from 'react';
export default function Specification({ value, onChange }) {
  const [specification, setSpecification] = useState(INSTANCE_TYPES[0].value);

  return (
    <JanctionRadio
      value={specification}
      onChange={(val) => onChange?.(val)}
      options={INSTANCE_TYPES}
    />
  );
}
