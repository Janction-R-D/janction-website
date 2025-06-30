import styles from './index.less';
import slogan_bg from '@/assets/images/home/slogan_bg.webp';
import slogan_android_bg from '@/assets/images/home/slogan_android_bg.webp';
import team_bg from '@/assets/images/home/team_bg.webp';
import ai_banner from '@/assets/images/home/ai_banner.webp';
import gpu_banner from '@/assets/images/home/gpu_banner.webp';
import layer_banner from '@/assets/images/home/layer_banner_2.webp';
import ai_android_banner from '@/assets/images/home/ai_android_banner.webp';
import gpu_android_banner from '@/assets/images/home/gpu_android_banner.webp';
import layer_android_banner from '@/assets/images/home/layer_android_banner.webp';
import avatar_bg from '@/assets/images/home/avatar_bg.png';
import user_bg from '@/assets/images/home/user_bg.png';
import shadow_left from '@/assets/images/home/shadow_left.png';
import shadow_right from '@/assets/images/home/shadow_right.png';
import ai_hub_hover_bg from '@/assets/images/home/ai_hub_hover_bg.png';
import user_hover_bg from '@/assets/images/home/user_hover_bg.png';
import reason_hover_bg from '@/assets/images/home/reason_hover_bg.png';
import read_docs from '@/assets/images/home/read_docs.png';
import read_docs_active from '@/assets/images/home/read_docs_active.png';
import products from '@/assets/images/home/products.webp';
import { renderBackgroudImg } from '../../utils/lang';
import { Collapse, Carousel } from 'antd';
import { useRef, useState } from 'react';
import { history } from 'umi';
import useScale from '../../hooks/useScale';
import { characteristics, reasons, teamList, bannderNav } from './data';
import WelcomeCard from './WelcomeCard';
import AttentionCard from './AttentionCard';

const { Panel } = Collapse;

const Home = (props) => {
  const defaultCollapse = ['0', '1', '2', '3'];

  const [activeBanner, setActiveBanner] = useState(0);
  const [activeCollapse, setActiveCollapse] = useState(defaultCollapse);
  const [reasonActive, setReasonActive] = useState();
  const bannerRef = useRef();
  const { isPC } = useScale();

  return (
    <div className={styles['home-container']}>
      <WelcomeCard />
      {/* <AttentionCard /> */}
      <div
        className={styles['slogan']}
        style={renderBackgroudImg(isPC ? slogan_bg : slogan_android_bg)}
      >
        <h1>
          <span className="nowrap">Layer 2 for verifiable,</span>
          <br /> synergic and {!isPC && <br />}scalable AI
        </h1>
        <p>
          Janction is building a service network for the data and computing{' '}
          {isPC && <br />}
          power sides of artificial intelligence, featuring a fair and efficient{' '}
          {isPC && <br />}
          revenue distribution algorithm, a data verification layer specifically{' '}
          {isPC && <br />}
          designed for AI, and an efficient distributed resource allocation
          system.
        </p>
        <div className={styles['buttons']}>
          <div
            className={styles['get-started']}
            onClick={() => {
              history.push('/genesis');
            }}
          >
            <span>Get Started</span>
            <i className="iconfont icon-lt-arrow"></i>
          </div>
          <a
            className={styles['read-docs']}
            href="https://docs.janction.io"
            target="__black"
          ></a>
          <div className={styles['shadow']}></div>
        </div>
      </div>
      <div className={styles['how-works']}>
        <div className={styles['info']}>
          <p className={styles['title']}>HOW IT WORKS</p>
          <h1>
            Decoupling,
            <br />
            Pipeline and Proof
          </h1>
          <p className={styles['desc']}>
            Janction decouples data, computing power, and models within the AI
            {isPC && <br />}
            system, allowing tasks and resources to run in isolated yet pipeline
            {isPC && <br />}
            processes. The Janction Network provides decentralized AI services
            for
            {isPC && <br />}
            contribution verification, revenue distribution, and data
            verifiability,
            {isPC && <br />}
            using unique algorithms for node and route management.
          </p>
          <div
            className={styles['learn-more']}
            onClick={() => {
              history.push('/genesis');
            }}
          >
            <a>Learn more</a>
          </div>
        </div>
        <div
          className={styles['products']}
          style={renderBackgroudImg(products)}
        ></div>
        <div className={styles['shadow']}></div>
      </div>

      <div className={styles['banner']}>
        <Carousel
          ref={bannerRef}
          infinite={false}
          afterChange={(current) => {
            setActiveBanner(current);
          }}
        >
          <img src={isPC ? gpu_banner : gpu_android_banner} alt="gpu banner" />
          <img
            src={isPC ? layer_banner : layer_android_banner}
            alt="layer banner"
          />
          <img src={isPC ? ai_banner : ai_android_banner} alt="ai banner" />
        </Carousel>
        <nav>
          <ul style={{ '--index': activeBanner }}>
            {bannderNav.map((item, index) => (
              <li
                key={item.name}
                className={`${styles['nav-item']} ${
                  activeBanner === index ? styles['active'] : ''
                }`}
                onClick={() => {
                  setActiveBanner(index);
                  bannerRef.current.goTo(index);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles['toggle-wrapper']}>
          <a
            className={`${activeBanner > 0 ? styles['active'] : ''}`}
            onClick={() => {
              bannerRef.current.prev();
            }}
          >
            <i className="iconfont icon-pre"></i>
          </a>
          <a
            className={activeBanner < 2 && styles['active']}
            onClick={() => {
              bannerRef.current.next();
            }}
          >
            <i className="iconfont icon-next"></i>
          </a>
        </div>
      </div>

      <div className={styles['decentral-ai-hub']}>
        <h1>Decentralized AI hub</h1>
        <div className={styles['characteristic-list']}>
          <Collapse
            accordion={!isPC}
            bordered={false}
            activeKey={activeCollapse}
            expandIcon={({ isActive }) => (
              <div
                className={`${styles['expand-icon']} ${
                  isActive && styles['active-expand-icon']
                }`}
              >
                <i className="iconfont icon-down" />
              </div>
            )}
            expandIconPosition="end"
            onChange={(keys) => {
              if (isPC) return;
              setActiveCollapse(keys);
            }}
          >
            {characteristics.map((item) => (
              <Panel
                header={
                  <h2>
                    <i className={`iconfont ${item.icon}`}></i>
                    <span>{item.name}</span>
                  </h2>
                }
                key={item.key}
              >
                <p>{item.desc}</p>
              </Panel>
            ))}
          </Collapse>
          {/* <ul>
            {characteristics.map((item) => (
              <li key={item.name}>
                <h2>
                  <i className={`iconfont ${item.icon}`}></i>
                  <span>{item.name}</span>
                </h2>
                <p>{item.desc}</p>
                <div className={styles['shadow']}></div>
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      <div className={styles['why-and-how']}>
        <h1>Why Janction？</h1>
        <div className={styles['reason-list']}>
          <ul>
            {reasons.map((item) => (
              <li
                className={`${
                  item.key === reasonActive ? styles['active'] : ''
                }`}
                key={item.key}
              >
                <img src={item.img} alt="" />
                <Collapse
                  accordion
                  bordered={false}
                  activeKey={reasonActive}
                  expandIcon={({ isActive }) => {
                    return (
                      <div
                        className={`${styles['expand-icon']} ${
                          isActive && styles['active-expand-icon']
                        }`}
                      >
                        <i className="iconfont icon-down" />
                      </div>
                    );
                  }}
                  expandIconPosition="end"
                  onChange={(keys) => {
                    setReasonActive(keys);
                  }}
                >
                  <Panel header={<h2>{item.name}</h2>} key={item.key}>
                    <p>{item.desc}</p>
                  </Panel>
                </Collapse>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={styles['team']}
        style={isPC ? renderBackgroudImg(team_bg) : {}}
      >
        <h1>Team</h1>
        <div className={styles['team-list']}>
          {isPC && (
            <ul>
              {teamList.map((item, index) => (
                <li key={index} className={styles['item.name']}>
                  <img src={item.avatar} alt="" />
                  <div className={styles['user']}>
                    <div className={styles['user-info']}>
                      <span className={styles['name']}>{item.userName}</span>
                      {item.role && (
                        <span className={styles['role']}>{item.role}</span>
                      )}
                    </div>
                    <ul>
                      {item.introductions.map((introduction, index) => (
                        <li key={index}>{introduction}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!isPC && (
            <Collapse
              accordion
              bordered={false}
              expandIcon={({ isActive }) => (
                <div
                  className={`${styles['expand-icon']} ${
                    isActive && styles['active-expand-icon']
                  }`}
                >
                  <i className="iconfont icon-down" />
                </div>
              )}
              expandIconPosition="end"
            >
              {teamList.map((item) => (
                <Panel
                  header={
                    <div
                      className={styles['user']}
                      style={renderBackgroudImg(avatar_bg)}
                    >
                      <img
                        src={isPC ? item.avatar : item.avatar_android}
                        alt=""
                      />
                      <div className={styles['user-info']}>
                        <span className={styles['name']}>{item.userName}</span>
                        {item.role && (
                          <span className={styles['role']}>{item.role}</span>
                        )}
                      </div>
                    </div>
                  }
                  key={item.userName}
                >
                  <ul className={styles['introductions']}>
                    {item.introductions.map((introduction, index) => (
                      <li key={index}>{introduction}</li>
                    ))}
                  </ul>
                </Panel>
              ))}
            </Collapse>
          )}
        </div>
      </div>

      {/* <div className={styles['questions']}>
        <h1>Want to ask something from us?</h1>
        <p>
          The brand new PUI 5.8.x is coming soon for PICO Neo3 / Neo3 Pro / Neo3{' '}
          {isPC && <br />} Pro Eye users
        </p>
        <div className={styles['question-list']}>
          <Collapse
            accordion
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
              <div
                className={`${styles['expand-icon']} ${
                  isActive && styles['active-expand-icon']
                }`}
              >
                <i />
              </div>
            )}
            expandIconPosition="end"
          >
            {questionList.map((item) => (
              <Panel header={item.title} key={item.title}>
                <p>{item.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
