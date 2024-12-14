import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // 引入 KaTeX 的样式
import remarkToc from 'remark-toc';
import React, { useEffect, useState } from 'react';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkStringify from 'remark-stringify';
import styles from './index.less';

const extractTextFromChildren = (children) => {
  // 如果 children 是字符串或数字，直接返回
  if (typeof children === 'string' || typeof children === 'number') {
    return children;
  }

  // 如果 children 是数组，递归提取每一项的文本
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }

  // 如果是 React 元素，递归提取其子元素的文本
  if (React.isValidElement(children)) {
    return React.Children.toArray(children.props.children)
      .map(extractTextFromChildren)
      .join('');
  }

  return '';
};
const slugify = (text) => {
  const plainText = extractTextFromChildren(text); // 提取纯文本
  return plainText
    .toString()
    .replace(/\*\*|__|\*/g, '') // 去除加粗、斜体等 Markdown 符号
    .replace(/<[^>]*>/g, '') // 去除 HTML 标签
    .trim()
    .toLowerCase()
    .replace(/\./g, '') // 将点替换为连字符
    .replace(/[^a-z0-9]+/g, '-') // 替换非字母数字字符为 `-`
    .replace(/^-+|-+$/g, ''); // 去除两端多余的 `-`
};
const JanctionMarkdown = (props) => {
  const { children } = props;
  const [toc, setToc] = useState('');

  useEffect(() => {
    // 通过 unified 管道生成目录
    unified()
      .use(remarkParse) // 解析 Markdown
      .use(remarkToc, { heading: 'Janction Help', tight: true }) // 插件生成 TOC
      .use(remarkStringify) // 将处理后的 AST 转换回 Markdown 字符串
      .process(children)
      .then((file) => {
        const tocContent = String(file)
          .split('\n') // 按行分割
          .slice(0, 77) // 截取目录部分（可根据实际情况调整）
          .join('\n'); // 重新拼接为字符串
        setToc(tocContent);
      });
  }, []);

  return (
    <div className={`markdown-body ${styles['janction-help-markdown']}`}>
      <div className={styles['markdown-aside']}>
        <Markdown>{toc}</Markdown>
      </div>
      <div className={styles['markdonw-main']}>
        <Markdown
          className="janction-markdown"
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
            h2: ({ node, ...props }) => (
              <h2 id={slugify(props.children)}>{props.children}</h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 id={slugify(props.children)}>{props.children}</h3>
            ),
            h4: ({ node, ...props }) => (
              <h4 id={slugify(props.children)}>{props.children}</h4>
            ),
            h5: ({ node, ...props }) => (
              <h5 id={slugify(props.children)}>{props.children}</h5>
            ),
          }}
          remarkPlugins={[remarkMath, remarkToc]}
          rehypePlugins={[rehypeKatex]}
        >
          {children}
        </Markdown>
      </div>
    </div>
  );
};

export default JanctionMarkdown;
