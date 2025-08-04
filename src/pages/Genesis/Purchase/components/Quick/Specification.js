import JanctionRadio from '@/components/JanctionRadio';
import { getInstanceTypes } from '@/constant';
import { useIntl } from 'umi';
import { useState } from 'react';

export default function Specification({ value, onChange }) {
  const { formatMessage } = useIntl();
  const options = getInstanceTypes(formatMessage);
  const [specification, setSpecification] = useState(value || options[0].value);

  return (
    <JanctionRadio
      value={specification}
      onChange={(val) => {
        setSpecification(val);
        onChange?.(val);
      }}
      options={options}
    />
  );
}
