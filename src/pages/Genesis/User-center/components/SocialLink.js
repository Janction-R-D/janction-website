import React, { useState } from 'react';
import styles from '../index.less';
import { Button, Card } from 'antd';
export default function SocialLink() {
  const [discordConnect, setdiscordConnect] = useState(false);
  const [xConnect, setxConnect] = useState(true);
  const icons = {
    x: 'x',
    discord: 'discord',
  };

  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>Link your social tags</h3>
      </section>
      <section className={styles['social-tags']}>
        <SociaElement
          isConneted={xConnect}
          setIsconnect={setxConnect}
          social={'Twitter'}
          icon={icons.x}
        />
        <SociaElement
          isConneted={discordConnect}
          setIsconnect={setdiscordConnect}
          social={'Discord'}
          icon={icons.discord}
        />
      </section>
    </Card>
  );
}

function SociaElement({ isConneted, social, setIsconnect, icon }) {
  console.log(icon);
  return (
    <article className={styles['social-tag']}>
      <div className={styles['social-box']}>
        <div className={styles['social-icon']}>
          <i className={`iconfont icon-${icon}`}></i>
        </div>
        {isConneted == false ? (
          <p>Connect to {social} account</p>
        ) : (
          <p> {social} Account Name</p>
        )}

        {isConneted && (
          <div className={styles['isConnected']}>
            <i className="iconfont icon-check"></i>
            <p>Connected</p>
          </div>
        )}
      </div>
      <div className={styles['buttons']}>
        {isConneted == false ? (
          <Button className={styles['create-btn']}>Connect</Button>
        ) : (
          <Button className={styles['cancel-btn']}>Disconnect</Button>
        )}
      </div>
    </article>
  );
}
