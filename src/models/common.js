import { fetchUserCenter } from '@/services/genesis';
import { fetchMineInviteCode } from '@/services/genesis/distribution';
import { useState } from 'react';
import { message } from 'antd';

export default () => {
  const [avatarSnapUrl, setAvatarSnapUrl] = useState();
  const [code, setCode] = useState();
  const [mineInviteData, setMyInviteData] = useState();
  const [userName, setUserName] = useState();
  const [userInfo, setUserInfo] = useState();

  const getMineCode = async () => {
    try {
      const res = await fetchMineInviteCode();
      // if (res?.code == 40410) {
      // // message.warning(res?.msg);
      //   return;
      // }
      setMyInviteData(res);
      setCode(res.code);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const getUserInfo = (callback) => {
    let result = null;
    fetchUserCenter()
      .then((res) => {
        setUserInfo(res);
      })
      .catch((err) => {
        console.log('『err』', err)
      })
      .finally(() => {
        callback && callback(result);
      });
  };

  return {
    avatarSnapUrl,
    setAvatarSnapUrl,
    getMineCode,
    code,
    mineInviteData,
    userName,
    setUserName,
    userInfo,
    setUserInfo,
    getUserInfo,
  };
};
