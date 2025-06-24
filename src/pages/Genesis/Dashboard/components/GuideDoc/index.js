import { Card, Typography, Image, Modal } from 'antd';
import styles from './index.less';

const { Title, Paragraph } = Typography;

export default function GuideDoc({ visible, onClose }) {
  return (
    <Modal
      title="New Users Guide"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      className={styles['customModal']}
    >
      <div className={styles.documentationContainer}>
        {/* 1. Account Login */}
        <div className={styles.cardWrapper} bordered={false}>
          <Title level={2}>1. Account login</Title>
          <Paragraph>
            Users can quickly enter the login process through the{' '}
            <strong>"Get Started - Sign in"</strong> button on the homepage.
            Supports decentralized and centralized login methods (Google /
            Github). Some services are not available when using centralized
            login.
          </Paragraph>
          <div className={styles.guideImage}>
            <Image
              width={600}
              preview={false}
              src={require('@/assets/images/doc/get_started_sign_in.png')}
              alt="Get Started - Sign in"
              className={styles.guideImage}
            />
          </div>

          <Title level={3}>1. Decentralized Login. Eg: MetaMask</Title>
          <Paragraph>
            Install the browser extension:{' '}
            <a
              href="https://metamask.io/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              MetaMask
            </a>
          </Paragraph>
          <div className={styles.guideImage}>
            <Image
              width={600}
              preview={false}
              src={require('@/assets/images/doc/metamask_install.png')}
              alt="MetaMask Installation"
            />
          </div>

          <Title level={3}>2. Third-party account login</Title>
          <Paragraph>Google / GitHub Account Login.</Paragraph>

          <Title level={3}>3. Using your email</Title>
          <Paragraph>
            Enter your email address, wait for an email containing a
            verification code, and then log in by entering the verification code
            or by using the verification link.
          </Paragraph>
        </div>

        {/* 2. Lessor */}
        <div className={styles.cardWrapper} bordered={false}>
          <Title level={2}>2. Lessor: Rent out your computing resources</Title>

          <Title level={3}>1. Dashboard</Title>
          <Paragraph>
            1. Download Janction App <br />
            2. Generate node ID and paste it into Client
          </Paragraph>

          <Title level={3}>2. Deploy Nodes</Title>
          <Paragraph>
            1. You can run the Janction App to start your node. <br />
            2. Advanced User: Select your node operating system and follow the
            guide to start your node.
          </Paragraph>

          <Title level={3}>3. My nodes</Title>
          <Paragraph>Viewing and managing your nodes</Paragraph>
          <div className={styles.guideImage}>
            <Image
              width={600}
              preview={false}
              src={require('@/assets/images/doc/my_nodes.png')}
              alt="My nodes"
            />
          </div>

          <Paragraph>
            1. List - Configure your machine for the market <br />
            2. Delist <br />
            3. Receive
          </Paragraph>

          <Title level={3}>4. Billing</Title>
          <Paragraph>Billing information and payment history.</Paragraph>
        </div>

        <div className={styles.cardWrapper} bordered={false}>
          <Title level={2}>3. login: Rent computing resources</Title>

          <Title level={3}>1. Dashboard</Title>
          <Paragraph>
            Overview of available resources and quick filters.
          </Paragraph>

          <Title level={3}>2. Purchase</Title>
          <Paragraph>
            1. Click Purchase, filter nodes according to your needs in the
            market <br />
            2. Select Purchase Duration and click Confirm your order <br />
            3. Select currency and payment method, and check to pay. Jump to the
            wallet to complete the purchase operation.
          </Paragraph>

          <Title level={3}>3. My Instances</Title>
          <Paragraph>
            On this interface, you will see the nodes you have purchased and can
            perform management operations on them. The top will display all your
            node statistics.
          </Paragraph>

          <Title level={4}>Remote connection</Title>
          <Paragraph>
            1. More functions - Remote connection - select remote web
          </Paragraph>
          <div className={styles.guideImage}>
            <Image
              width={600}
              preview={false}
              src={require('@/assets/images/doc/remote_web.png')}
              alt="Remote web"
            />
          </div>

          <Title level={4}>SSH connection</Title>
          <Paragraph>
            Click More functions - SSH Settings, insert your public key, copy
            SSH command and paste into terminal, then you can access your
            instance directly.
          </Paragraph>
          <div className={styles.guideImage}>
            <Image
              width={600}
              preview={false}
              src={require('@/assets/images/doc/ssh_settings.png')}
              alt="SSH settings"
            />
          </div>

          <Title level={5}>Directing usage: access instance via terminal</Title>
          <Title level={5}>Use SSH Config for Advanced Usage</Title>
          <Paragraph>
            1. Copy SSH Config and paste it into the file{' '}
            <code>~/.ssh/config</code> <br />
            2. Visual Studio Code / Cursor
          </Paragraph>
          <Paragraph>
            - Installation extension <br />
            &nbsp;&nbsp;1. Cursor:{' '}
            <a
              href="https://marketplace.cursorapi.com/items?itemName=ms-vscode-remote.remote-ssh"
              target="_blank"
              rel="noopener noreferrer"
            >
              marketplace.cursorapi.com
            </a>{' '}
            <br />
            &nbsp;&nbsp;2. VS Code:{' '}
            <a
              href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh"
              target="_blank"
              rel="noopener noreferrer"
            >
              marketplace.visualstudio.com
            </a>
          </Paragraph>
          <Paragraph>
            2. You will see the instance id in extension sidebar, select it and
            enter
          </Paragraph>

          <Title level={3}>4. Terminate</Title>
          <Paragraph>
            When the node is offline, you can choose to return the computing
            resources and return the funds.
          </Paragraph>

          <Title level={3}>5. Orders</Title>
          <Paragraph>Check and view details of the orders.</Paragraph>
          <div className={styles.guideImage}>
            <Image
              width={600}
              preview={false}
              src={require('@/assets/images/doc/orders.png')}
              alt="SSH settings"
            />
          </div>
          <Title level={3}>6. Agent: Easily create your own AI agent</Title>
          <Paragraph>
            1. My AI Agent - Viewing your AI Agents <br />
            <div className={styles.guideImage}>
              <Image
                width={600}
                preview={false}
                src={require('@/assets/images/doc/agent.png')}
                alt="SSH settings"
              />
            </div>
            2. Create My Agent <br />
            &nbsp;&nbsp;1. Input details of your agent, Create <br />
            &nbsp;&nbsp;2. Some document processing will take a longer time. You
            can check the file processing progress on the Document page.
            <div className={styles.guideImage}>
              <Image
                width={600}
                preview={false}
                src={require('@/assets/images/doc/create_agent.png')}
                alt="SSH settings"
              />
            </div>
            2. Chat with My Agent <br />
            Here you can chat with your AI Agent based on the files you have
            uploaded.
            <div className={styles.guideImage}>
              <Image
                width={600}
                preview={false}
                src={require('@/assets/images/doc/chat.png')}
                alt="SSH settings"
              />
            </div>
          </Paragraph>
        </div>
      </div>
    </Modal>
  );
}
