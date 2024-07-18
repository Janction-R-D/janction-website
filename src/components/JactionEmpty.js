import { Empty } from 'antd';

const JactionEmpty = (props) => {
  return (
    <Empty
      image={<img src={require('@/assets/images/icons/empty.png')} />}
      description="No data"
    />
  );
};

export default JactionEmpty;
