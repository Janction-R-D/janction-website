import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.less';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { fetchNodesRegister } from '@/services/genesis';
import { RedoOutlined } from '@ant-design/icons';

const RunNodeScript = (props) => {
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
        children={`
\`\`\`sh
curl -sfL ${location.href}/v0/node/install.sh | NODE_ID=${
          nodesData?.node_id || 'xxxx'
        } TOKEN=${nodesData?.token || 'xxxx'} sh -
\`\`\`
`}
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
    </Card>
  );
};

export default RunNodeScript;
