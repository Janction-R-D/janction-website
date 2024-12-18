import JanctionInput from '@/components/JanctionInput';
import LabelValue from './LabelValue';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { RedoOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import { copy } from '@/utils/lang';
import { fetchInviterCode } from '@/services/root';

const GenerateCode = (props) => {
  const { onUpdate } = props;

  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const getCode = async () => {
    try {
      const res = await fetchInviterCode({ nickname: name, inviter: address });
      onUpdate();
      return res?.code;
    } catch (err) {
      console.log('『err』', err);
      return null;
    }
  };

  const showCodeGenerate = useMemo(() => {
    return name && address;
  }, [name, address]);

  const onCopy = async () => {
    if (!showCodeGenerate) return;
    const code = await getCode();
    const link = `${location.origin}/home?inviterCode=${code}`;
    if (!code) {
      message.warning('Invitation code failed to obtain, please try again!');
      return;
    }
    copy(link);
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
        {showCodeGenerate ? (
          <Tooltip title="Click Copy" color="#000000">
            <span className={styles['copy']} onClick={onCopy}>
              Generate invitation code
            </span>
          </Tooltip>
        ) : (
          <span className={styles['copy']}>Generate invitation code</span>
        )}
      </div>
    </div>
  );
};

export default GenerateCode;
