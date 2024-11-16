import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.less';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { fetchNodesRegister } from '@/services/genesis';

const RunNodes = (props) => {
  const [nodesData, setNodesData] = useState();
  useEffect(() => {
    getNodes();
  }, []);
  const getNodes = async () => {
    try {
      const res = await fetchNodesRegister();
      setNodesData(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  return (
    <Card className={styles['run-nodes-wrapper']}>
      <Markdown
        children={`
### register node
\`\`\`sh
curl -sfL http://18.181.196.49:80/v0/node/install.sh | NODE_ID=${
          nodesData?.nodeId || 'xxxx'
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

export default RunNodes;
