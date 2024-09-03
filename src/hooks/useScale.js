import { useEffect, useState } from 'react';

// 获取缩放比例
const useScale = () => {
  const [scale, setScale] = useState(false);
  const [isPC, setIsPc] = useState(true);

  useEffect(() => {
    getScale();
    window.onresize = getScale;
  }, []);

  const getScale = () => {
    const _isPC = window.innerWidth > 1024;
    const _scale = window.innerWidth / (_isPC ? 1920 : 375);
    setIsPc(_isPC);
    setScale(_scale);
  };

  return { scale, isPC };
};

export default useScale;
