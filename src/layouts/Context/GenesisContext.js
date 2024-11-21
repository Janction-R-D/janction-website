import React, { createContext, useState } from 'react';

const GenesisContext = createContext();

export const GenesisProvider = ({ children }) => {
  const [imgUrl, setImgUrl] = useState('/profile.png');

  return (
    <GenesisContext.Provider value={{ imgUrl, setImgUrl }}>
      {children}
    </GenesisContext.Provider>
  );
};

export default GenesisContext;
