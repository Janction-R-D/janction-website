import React, { useEffect, useState } from 'react';
import { fetchNodeList } from '../../../../services/genesis/instance';

export default function useNodes() {
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    fetchNodeList()
      .then((data) => setNodes(data))
      .catch((err) => console.log(err));
  }, []);
  return { nodes };
}
