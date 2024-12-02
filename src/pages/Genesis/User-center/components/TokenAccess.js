import React, { useState } from 'react';
import { Card, Button } from 'antd';
import styles from '../index.less';
import TokenTable from './TokenTable';
import tokens from './Tokens.json';
import NewToken from './NewToken';
export default function TokenAccess() {
  const [isNewToken, setIsNewToken] = useState(false);

  const onGenerate = () => {
    setIsNewToken(true);
  };
  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>Access Token</h3>
      </section>
      <section className={styles['card-security']}>
        {/* <article>
          <p>
            Access Token You can use the Access Token feature to manage the
            credentials you curate. This includes amending/replacing/removing
            items. In the future, Galxe will support the use of Access Tokens to
            manage campaigns, NFT metadata, and so much more.
          </p>
          <span className={styles['text-blue']}>
            Learn More detail about access token and how to update credentials
            with GraphQL API.
          </span>
        </article> */}
        <section className={styles['token-container']}>
          <Button className={styles['btn-transparent']} onClick={onGenerate}>
            Generate
          </Button>
          <NewToken isNewToken={isNewToken} setIsNewToken={setIsNewToken} />
          <TokenTable tokens={tokens} />
        </section>
      </section>
    </Card>
  );
}
