import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.less';
import { Card } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { fetchNodesRegister } from '@/services/genesis';
import { RedoOutlined } from '@ant-design/icons';
import { copy } from '@/utils/lang';

const RunNodeScript = (props) => {
  const { isLinux } = props;
  const [nodesData, setNodesData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNodes();
  }, []);
  const getNodes = async () => {
    try {
      setLoading(true);
      const res = await fetchNodesRegister();
      setNodesData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };

  const script = useMemo(() => {
    if (isLinux) {
      return `
\`\`\`sh
curl 'https://18.183.24.253:8080/v0/node/install.sh?v2=true' | LOCATION=cn NODE_ID=${
        nodesData?.node_id || 'xxxx'
      } bash -s install
\`\`\`
`;
    }
    return `
\`\`\`sh
sudo docker run --privileged --name janction-node1 -e K3S_NODE_NAME=${
      nodesData?.node_id || 'xxxx'
    } -e K3S_TOKEN=${
      nodesData?.token || 'xxxx'
    } -e K3S_URL=https://18.181.196.49:6443 -d rancher/k3s:latest agent
\`\`\`
`;
  }, [nodesData]);

  return (
    <Card
      title="Register node"
      className={styles['run-nodes-wrapper']}
      extra={
        <RedoOutlined
          rotate={90}
          spin={loading}
          loading={loading}
          className="poi"
          onClick={getNodes}
        />
      }
    >
      <Markdown
        children={script}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      ></Markdown>
      <a className="iconfont icon-copy" onClick={() => copy(script)}></a>
    </Card>
  );
};

export default RunNodeScript;
