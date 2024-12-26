import { fetchRootAuthStatus } from '@/services/root';
import { useEffect, useState } from 'react';
import { Redirect, useAccess, useModel } from 'umi';

export default (props) => {
  const { history } = props;

  const [status, setStatus] = useState();

  useEffect(() => {
    onAuth();
  }, []);
  const onAuth = async () => {
    try {
      await fetchRootAuthStatus();
      setStatus('login');
    } catch (error) {
      setStatus('unlogin');
      console.log('『error』', error);
    }
  };

  // Enter the permission judgment before the page
  if (status == 'login') {
    return props.children;
  }
  if (status == 'unlogin') return <Redirect to="/root/login" />;
};
