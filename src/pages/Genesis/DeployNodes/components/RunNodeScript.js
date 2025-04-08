import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.less';
import { Button, Card, Checkbox, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { fetchNodesRegister } from '@/services/genesis';
import { RedoOutlined } from '@ant-design/icons';
import { copy } from '@/utils/lang';

const RunNodeScript = (props) => {
  const { isLinux } = props;

  const [nodesData, setNodesData] = useState();
  const [loading, setLoading] = useState(false);
  const [isCN, setIsCn] = useState(false);

  useEffect(() => {
    getNodes();
  }, []);
  const getNodes = async () => {
    try {
      setLoading(true);
      const res = await fetchNodesRegister();
      console.log(res);
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
        process.env.JANCTION_BASE_API
      }/v0/node/install.sh' | ${isCN ? 'LOCATION=cn' : ''} NODE_ID=${
        nodesData?.node_id || ''
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
    const value = `curl '${
      process.env.JANCTION_BASE_API
    }/v0/node/install.sh' | ${isCN ? 'LOCATION=cn' : ''} NODE_ID=${
      nodesData?.node_id || ''
    } bash -s install`;
    return {
      show: `
\`\`\`sh
${value}
\`\`\`
`,
      value,
    };
  }, [nodesData, isCN]);

  const onChange = () => {
    setIsCn(!isCN);
  };

  return (
    <Card
      title="Register node"
      className={styles['run-nodes-wrapper']}
      extra={
        <div className="df ai_c gap10">
          {isLinux && (
            <Checkbox
              className={styles['location-btn']}
              checked={isCN}
              onChange={onChange}
            >
              CN
            </Checkbox>
          )}
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
              console.log(nodesData);
              if (isLinux) {
                if (!nodesData?.node_id)
                  return message.warning(
                    'Data missing, please click refresh to get and try again!',
                  );
              } else if (!nodesData?.node_id && !nodesData?.token) {
                return message.warning(
                  'Data missing, please click refresh to get and try again!',
                );
              }
              copy(script.value);
            }}
          ></a>
          {/* <Button
            type="primary"
            className={styles['token-btn']}
            onClick={() => {
              copy(nodesData?.node_id);
            }}
          >
            Get an ID token
          </Button> */}
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
