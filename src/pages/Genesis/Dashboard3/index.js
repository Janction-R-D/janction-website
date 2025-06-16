import { useModel } from 'umi';
import Lessee from './Lessee';
import Lessor from './Lessor';
import { useEffect } from 'react';

const Dashboard = (props) => {
  const { initialState } = useModel('@@initialState');
  const { getMineCode } = useModel('common');

  const { isLessee } = initialState || {};

  useEffect(() => {
    getMineCode();
  }, []);

  if (isLessee) return <Lessee />;
  return <Lessor />;
};

Dashboard.wrappers = ['@/wrappers/auth'];
export default Dashboard;
