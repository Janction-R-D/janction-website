import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.less';
import { Card, message } from 'antd';
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
      const value = `curl '${
        process.env.REGISTER_NODE_URL
      }/v0/node/install.sh?v2=true' | LOCATION=cn NODE_ID=${
        nodesData?.node_id || 'xxxx'
      } bash -s install`;
      return {
        show: `
\`\`\`sh
${value}
\`\`\`
`,
        value,
      };
    }
    const value = `sudo docker run --privileged --name janction-node1 -e K3S_NODE_NAME=${
      nodesData?.node_id || 'xxxx'
    } -e K3S_TOKEN=${nodesData?.token || 'xxxx'} -e K3S_URL=${
      process.env.REGISTER_NODE_URL
    } -d rancher/k3s:latest agent`;
    return {
      show: `
\`\`\`sh
${value}
\`\`\`
`,
      value,
    };
  }, [nodesData]);

  return (
    <Card
      title="Register node"
      className={styles['run-nodes-wrapper']}
      extra={
        <div className="df ai_c gap10">
          <RedoOutlined
            rotate={90}
            spin={loading}
            loading={loading}
            className="poi"
            onClick={getNodes}
          />
          <a
            className="iconfont icon-copy"
            onClick={() => {
              if (isLinux) {
                if (!nodesData?.node_id)
                  return message.warning(
                    'Data missing, please click refresh to get and try again!',
                  );
              } else if (!nodesData?.node_id || !nodesData?.token) {
                return message.warning(
                  'Data missing, please click refresh to get and try again!',
                );
              }
              copy(script.value);
            }}
          ></a>
        </div>
      }
    >
      <Markdown
        children={script.show}
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
