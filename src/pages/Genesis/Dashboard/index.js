import { useModel } from 'umi';
import Lessee from './Lessee';
import Lessor from './Lessor';

const Dashboard = (props) => {
  const { initialState } = useModel('@@initialState');

  const { isLessee } = initialState || {};

  if (isLessee) return <Lessee />;
  return <Lessor />;
};

Dashboard.wrappers = ['@/wrappers/auth'];
export default Dashboard;
