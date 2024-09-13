import Jct from '../pages/Jct/Jct';

const JctLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <main>
        <Jct />
      </main>
    </div>
  );
};

export default JctLayout;
