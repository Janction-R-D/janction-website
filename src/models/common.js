import { uniqueId } from 'lodash';
import { useState } from 'react';

export default () => {
  const [avatarSnapUrl, setAvatarSnapUrl] = useState();

  return {
    avatarSnapUrl,
    setAvatarSnapUrl,
  };
};
