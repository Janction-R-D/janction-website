import { useEffect, useState } from 'react';

const useIsPC = () => {
  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    whileResize();
    window.onresize = whileResize;
  }, []);

  const whileResize = () => {
    const _scale = window.innerWidth > 1024;
    setIsPC(_scale);
  };

  return isPC;
};

export default useIsPC;
