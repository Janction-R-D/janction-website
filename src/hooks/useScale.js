import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

// 获取缩放比例
const useScale = (basicWidth = 1920) => {
  const [scale, setScale] = useState(false);

  useEffect(() => {
    getScale();
    window.onresize = getScale;
  }, []);

  const getScale = () => {
    const _scale = window.innerWidth / basicWidth;
    setScale(_scale);
  };

  return scale;
};

export default useScale;
