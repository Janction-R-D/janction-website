import JactionEmpty from '@/components/JactionEmpty';
import { Button } from 'antd';

const EmptyPage = (props) => {
  const { history } = props;
  return (
    <div className="empty-page-wrapper">
      <div className="empty-wrapper">
        <JactionEmpty description="It look like you're lost..." />
      </div>
      <div
        className="go-home"
        onClick={() => {
          history.push('/');
        }}
      >
        <span>Home Page</span>
      </div>
    </div>
  );
};

export default EmptyPage;
