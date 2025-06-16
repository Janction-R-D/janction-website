import { fetchUserCenter } from '@/services/genesis';
import { fetchMineInviteCode } from '@/services/genesis/distribution';
import { useEffect, useState } from 'react';
import { fetchToken } from '@/services/login';
import { useModel } from 'umi';

export default () => {
  const [avatarSnapUrl, setAvatarSnapUrl] = useState();
  const [code, setCode] = useState();
  const [mineInviteData, setMyInviteData] = useState();
  const [userName, setUserName] = useState();
  const [userInfo, setUserInfo] = useState();
  const { initialState } = useModel('@@initialState');
  const { sessionType } = initialState || {};
  useEffect(() => {
    getUserInfo();
  }, [sessionType]);
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
    if (sessionType == 'wallet') {
      fetchUserCenter()
        .then((res) => {
          setUserInfo(res);
          if (res?.name) {
            setUserName(res?.name);
          }
        })
        .catch((err) => {
          console.log('『err』', err);
        })
        .finally(() => {
          callback && callback(result);
        });
    }
    if (sessionType == 'google') {
      fetchToken()
        .then((res) => {
          const userData = res?.user_info;
          setUserInfo(userData);
          if (userData?.email) {
            setUserName(userData?.email);
            setAvatarSnapUrl(userData?.picture);
          }
        })
        .catch((err) => {
          console.log('『err』', err);
        })
        .finally(() => {
          callback && callback(result);
        });
    }
    if (sessionType == 'email') {
      fetchToken()
        .then((res) => {
          const emailData = res;
          setUserInfo(emailData);
          if (emailData?.platform_user_id) {
            setUserInfo(emailData);
            setUserName(emailData?.platform_user_id);
          }
        })
        .catch((err) => {
          console.log('『err』', err);
        })
        .finally(() => {
          callback && callback(result);
        });
    }
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
