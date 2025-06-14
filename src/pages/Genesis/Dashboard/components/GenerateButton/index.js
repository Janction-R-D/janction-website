import { fetchNodesRegister } from '@/services/genesis';
import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import styles from './index.less';
import { copy } from '@/utils/lang';
export default function GenerateButton() {
  const [nodeId, setNodeId] = useState('');
  const [loading, setLoading] = useState(false);

  const getNodes = async () => {
    try {
      setLoading(true);
      message.info({
        content: 'Generating code...',
        key: 'generate',
        duration: 0,
      });
      const res = await fetchNodesRegister();
      if (!res?.node_id) {
        console.log(res);
        throw new Error('Error: Sommething went wrong!');
      }
      setNodeId(res?.node_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    } finally {
      message.destroy('generate');
    }
  };

  const generate = async () => {
    try {
      await getNodes();
      copy(nodeId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button className={styles['button']} onClick={generate}>
      Generate Token ID{' '}
      <span className={styles.icon_rotate}>
        <ArrowUpOutlined />
      </span>
    </Button>
  );
}
