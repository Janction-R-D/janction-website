import { useModel } from 'umi';
import Lessees from './Lessees';
import Lessors from './Lessors';

const Dashboard = (props) => {
  const { initialState } = useModel('@@initialState');

  const { isLessees } = initialState || {};

  if (isLessees) return <Lessees />;
  return <Lessors />;
};

Dashboard.wrappers = ['@/wrappers/auth'];
export default Dashboard;
