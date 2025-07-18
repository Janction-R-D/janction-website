import { useLocation, useModel } from 'umi';
import Lessee from './Lessee';
import Lessor from './Lessor';

const Dashboard = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const location = useLocation();
  const { from } = location.state || {};
  const { isLessee } = initialState || {};
  if (from == 'gpu-page') {
    setInitialState({
      ...initialState,
      isLessee: true,
    });
    return <Lessee />;
  }

  if (isLessee) return <Lessee />;
  return <Lessor />;
};

Dashboard.wrappers = ['@/wrappers/auth'];
export default Dashboard;
