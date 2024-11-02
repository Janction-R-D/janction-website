import { Empty } from 'antd';

const JactionEmpty = (props) => {
  const { description = 'No data' } = props;
  return (
    <Empty
      image={<img src={require('@/assets/images/icons/empty.png')} />}
      description={description}
    />
  );
};

export default JactionEmpty;
