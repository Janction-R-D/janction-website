import { fetchMineInviteCode } from '@/services/genesis/distribution';
import { useState } from 'react';

export default () => {
  const [avatarSnapUrl, setAvatarSnapUrl] = useState();
  const [code, setCode] = useState();
  const [mineInviteData, setMyInviteData] = useState();

  const getMineCode = async () => {
    try {
      const res = await fetchMineInviteCode();
      if (res?.code == 40410) {
        // message.warning(res?.msg);
        return;
      }
      setMyInviteData(res);
      setCode(res.code);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return {
    avatarSnapUrl,
    setAvatarSnapUrl,
    getMineCode,
    code,
    mineInviteData,
  };
};
