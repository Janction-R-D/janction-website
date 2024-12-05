import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { request } from 'umi';
import styles from '../index.less';

async function getDiscordUserData(token) {
  try {
    const data = await request('https://discord.com/api/v10/users/@me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User data from Discord:', data);
    return data;
  } catch (error) {
    console.error('Error fetching Discord user data:', error);
  }
}

async function getTwitterUserData(token) {
  try {
    const data = await request('https://api.twitter.com/2/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User data from Twitter:', data);
    return data;
  } catch (error) {
    console.error('Error fetching Twitter user data:', error);
  }
}

function DiscordElement({ icon }) {
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(
      window.location.hash.replace('#', '?'),
    );
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      setToken(accessToken);
      localStorage.setItem('discordToken', accessToken);
      setIsConnected(true);

      getDiscordUserData(accessToken).then((data) => {
        setUserInfo(data);
      });
    } else {
      const storedToken = localStorage.getItem('discordToken');
      if (storedToken) {
        setToken(storedToken);
        setIsConnected(true);
        getDiscordUserData(storedToken).then((data) => {
          setUserInfo(data);
        });
      }
    }
  }, []);

  const handleClick = () => {
    if (isConnected) {
      setToken(null);
      localStorage.removeItem('discordToken');
      setIsConnected(false);
      setUserInfo(null);
    } else {
      redirectToDiscordAuth();
    }
  };

  const redirectToDiscordAuth = () => {
    const clientId = '1313569428213862490';
    const redirectUri = encodeURIComponent(
      'http://localhost:8000/genesis/user-center',
    );
    const scopes = 'identify';
    const responseType = 'token';
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scopes}`;
    window.open(discordAuthUrl, '_blank');
  };

  return (
    <article className={styles['social-tag']}>
      <div className={styles['social-box']}>
        <div className={styles['social-icon']}>
          <i className={`iconfont icon-${icon}`}></i>
        </div>
        {isConnected ? (
          <p>{userInfo?.username}</p>
        ) : (
          <p>Connect to Discord account</p>
        )}

        {isConnected && (
          <div className={styles['isConnected']}>
            <i className="iconfont icon-check"></i>
            <p>Connected</p>
          </div>
        )}
      </div>
      <div className={styles['buttons']}>
        <Button
          className={isConnected ? styles['cancel-btn'] : styles['create-btn']}
          onClick={handleClick}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
    </article>
  );
}

function TwitterElement({ icon }) {
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  //   useEffect(() => {
  //     const urlParams = new URLSearchParams(
  //       window.location.hash.replace('#', '?'),
  //     );
  //     const accessToken = urlParams.get('access_token');

  //     if (accessToken) {
  //       setToken(accessToken);
  //       localStorage.setItem('twitterToken', accessToken);
  //       setIsConnected(true);

  //       getTwitterUserData(accessToken).then((data) => {
  //         setUserInfo(data);
  //       });
  //     } else {
  //       const storedToken = localStorage.getItem('twitterToken');
  //       if (storedToken) {
  //         setToken(storedToken);
  //         setIsConnected(true);
  //         getTwitterUserData(storedToken).then((data) => {
  //           setUserInfo(data);
  //         });
  //       }
  //     }
  //   }, []);

  const handleClick = () => {
    if (isConnected) {
      setToken(null);
      localStorage.removeItem('twitterToken');
      setIsConnected(false);
      setUserInfo(null);
    } else {
      redirectToTwitterAuth();
    }
  };

  const redirectToTwitterAuth = () => {
    const clientId = 'N24zSm5GUTgybUZHb2lwUThUS1c6MTpjaQ';
    const redirectUri = encodeURIComponent(
      'http://localhost:8000/genesis/user-center',
    );
    const scopes = 'tweet.read users.read';
    const responseType = 'token';
    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scopes}`;
    window.open(twitterAuthUrl, '_blank');
  };

  return (
    <article className={styles['social-tag']}>
      <div className={styles['social-box']}>
        <div className={styles['social-icon']}>
          <i className={`iconfont icon-${icon}`}></i>
        </div>
        {isConnected ? (
          <p>{userInfo?.username}</p>
        ) : (
          <p>Connect to Twitter account</p>
        )}

        {isConnected && (
          <div className={styles['isConnected']}>
            <i className="iconfont icon-check"></i>
            <p>Connected</p>
          </div>
        )}
      </div>
      <div className={styles['buttons']}>
        <Button
          className={isConnected ? styles['cancel-btn'] : styles['create-btn']}
          onClick={handleClick}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
    </article>
  );
}

export default function SocialLink() {
  const icons = {
    discord: 'discord',
    twitter: 'x',
  };

  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>Link your social tags</h3>
      </section>
      <section className={styles['social-tags']}>
        <TwitterElement icon={icons.twitter} />
        <DiscordElement icon={icons.discord} />
      </section>
    </Card>
  );
}
