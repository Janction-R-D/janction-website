import { ThirdwebProvider } from 'thirdweb/react';

function ThirdWeb(props) {
  const { children } = props;
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}

export default ThirdWeb;
