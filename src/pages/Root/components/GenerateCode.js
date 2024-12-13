import JanctionInput from '@/components/JanctionInput';
import LabelValue from './LabelValue';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { RedoOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import { copy } from '@/utils/lang';

const GenerateCode = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState();

  const getCode = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const showCodeGenerate = useMemo(() => {
    return name && address;
  }, [name, address]);

  const onCopy = () => {
    copy(code);
  };

  return (
    <div className={styles['generate-code']}>
      <LabelValue title="Enter a nickname">
        <JanctionInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="please enter a user nickname"
        />
      </LabelValue>
      <LabelValue title="Inviter address">
        <JanctionInput
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="please enter the address of the user"
        />
      </LabelValue>
      <div
        className={[
          styles['extra'],
          showCodeGenerate && styles['show-extra'],
        ].join(' ')}
      >
        {showCodeGenerate && (
          <Tooltip title="Click Copy" color="#000000">
            <span className={styles['copy']} onClick={onCopy}>
              Generate invitation code
            </span>
          </Tooltip>
        )}
        {showCodeGenerate && (
          <RedoOutlined
            rotate={90}
            spin={loading}
            loading={loading}
            className={styles['refresh']}
            onClick={getCode}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateCode;
