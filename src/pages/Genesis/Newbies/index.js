import { useState } from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';

const { Sider, Content } = Layout;

const sections = {
  Introduction: {
    title: 'Introduction',
    content:
      'Welcome to the platform. Please follow the guide to start your journey.',
  },
  'Quick start': {
    title: 'Quick start',
    steps: [
      {
        title: '1. Create instance',
        description: `After registration, enter the console, under the My Instance menu, click [Rent a new instance].
        
On the instance rental page: select the billing method, region, GPU model, and number of GPUs, then select a suitable idle host and image (with built-in basic images and community images for different deep learning frameworks), and finally create it.`,
      },
      {
        title: '2. Upload data',
        description: `After booting up, find the quick tool [JupyterLab] on the running instance, click to open it, and find the upload button in the screenshot below to upload data. If you need to upload a folder or more advanced upload methods, please refer to the Upload Data document.`,
      },
    ],
  },
  'Video tutorial': {
    title: 'Video tutorial',
    content:
      'Here you can watch a video guide to help you get started quickly.',
  },
  'Container instance': {
    title: 'Container instance',
    content:
      'Learn how to use container-based instances for flexible deployment.',
  },
};

function Newbies() {
  const [selectedKey, setSelectedKey] = useState('Quick start');
  const current = sections[selectedKey];

  return (
    <main className="quick-start-wrapper">
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Help for newbies</h1>
        </header>
      </section>
      <Layout className={styles['quick-start-layout']}>
        <Sider width={220} className={styles['sidebar']}>
          <Menu
            mode="vertical"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
          >
            {Object.keys(sections).map((key) => (
              <Menu.Item key={key}>{key}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content className={styles['content']}>
            <h2>{current.title}</h2>
            {current.steps ? (
              current.steps.map((step, i) => (
                <div key={i} className={styles['step']}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))
            ) : (
              <p>{current.content}</p>
            )}
          </Content>
        </Layout>
      </Layout>{' '}
    </main>
  );
}

Newbies.wrappers = ['@/wrappers/auth'];
export default Newbies;
