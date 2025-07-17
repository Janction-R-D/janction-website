import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.less';
import { Button, Card, Checkbox, message, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { fetchNodesRegister } from '@/services/genesis';
import { RedoOutlined } from '@ant-design/icons';
import { copy } from '@/utils/lang';

const { Text } = Typography;
const RunNodeScript = (props) => {
  const { isLinux, getNodes, nodesData, loading, isWin } = props;
  console.log(isWin);
  const [isCN, setIsCn] = useState(false);

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
    const value = `curl '${process.env.JANCTION_BASE_API}/v0/node/install${
      isWin ? '_win' : ''
    }.sh' | ${isCN ? 'LOCATION=cn' : ''} NODE_ID=${
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
  }, [nodesData, isCN, isWin]);

  const onChange = () => {
    setIsCn(!isCN);
  };

  return (
    <Card
      title="Register node"
      className={styles['run-nodes-wrapper']}
      extra={
        <div className="df ai_c gap10">
          <Checkbox
            className={styles['location-btn']}
            checked={isCN}
            onChange={onChange}
          >
            CN
          </Checkbox>

          <RedoOutlined
            rotate={90}
            spin={loading}
            loading={loading}
            className={styles['icon-orange']}
            onClick={getNodes}
          />
          <a
            className={styles['icon-orange']}
            onClick={() => {
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
          >
            <i className="iconfont icon-copy" />
          </a>
        </div>
      }
    >
      <Text className={styles['token_id_f']}>
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
          className={styles['token_id_mark']}
        ></Markdown>
      </Text>
    </Card>
  );
};

export default RunNodeScript;
