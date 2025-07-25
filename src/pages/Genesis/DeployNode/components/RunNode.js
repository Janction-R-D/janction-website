import { ANDROID_APK_PATH, COMMAND, DOCKER_PATH } from '@/constant';
import { useEffect, useState } from 'react';
import { copy } from '@/utils/lang';
import styles from './index.less';
import { Typography } from 'antd';
import RunNodeScript from './RunNodeScript';
const { Text } = Typography;
const RunNode = (props) => {
  const { selectedValues, nodesData, loading, isWin } = props;

  const [nodeData, setNodaData] = useState();
  useEffect(() => {
    let nodeData = {
      docker: DOCKER_PATH[selectedValues?.system],
      script:
        COMMAND[selectedValues?.system]?.[selectedValues?.architecture] ||
        '(code area)',
    };
    if (selectedValues?.system == 'android') {
      nodeData.apk = ANDROID_APK_PATH;
    }
    setNodaData(nodeData);
  }, [selectedValues]);

  const renderLinks = () => {
    if (selectedValues?.system == 'android') {
      return (
        <>
          <section className={styles['link']}>
            <h1>Prerequisites: Install termux-app</h1>
            <Text className={styles['token_id']}>
              {nodeData?.apk}
              <a
                className={styles['icon-orange']}
                href={nodeData?.apk}
                target="_blank"
              >
                <i className="iconfont icon-link" />
              </a>
            </Text>
          </section>
        </>
      );
    }
    if (selectedValues?.system == 'macos') {
      return (
        <>
          <section className={styles['link']}>
            <h1>Prerequisites</h1>

            <h2>1. Check & Install Homebrew</h2>

            <p>Check if Homebrew is installed:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew --version</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`brew --version`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>If not installed, run the following:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">
                  $ /bin/bash -c "$(curl -fsSL
                  https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                </span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() =>
                  copy(
                    `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`,
                  )
                }
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>Add Homebrew to your PATH:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">
                  $ echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' &gt;&gt;
                  ~/.zshrc
                </span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() =>
                  copy(
                    `echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc`,
                  )
                }
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ source ~/.zshrc</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`source ~/.zshrc`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>Verify installation (optional):</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew doctor</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`brew doctor`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>Update Homebrew (recommended):</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew update</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`brew update`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <h2>2. Check & Install Lima</h2>

            <p>Check if Lima is installed:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl --version</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`limactl --version`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>If not installed, install Lima using Homebrew:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew install lima</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`brew install lima`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>Start the default virtual machine:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl start</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`limactl start`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <h2>3. Access Virtual Machine Shell</h2>

            <p>Access Lima shell with root privileges:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ lima sudo -i</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`lima sudo -i`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <RunNodeScript
              nodesData={nodesData}
              loading={loading}
              isWin={false}
            />

            <p>If successful, the following message will be displayed:</p>
            <Text className={styles['token_id']}>
              <pre className={styles['output']}>{`
Congratulations! Installation completed successfully!
 === EdgeCore Configuration Summary === 
KubeEdge Version: v1.20.0
Configuration Status:
- metaServer: enabled
- edgeMesh: disabled
- edgeStream: enabled
Backup File: /etc/kubeedge/config/edgecore.yaml.20250720_000731.bak
=======================================

=== Service Management Commands ===
To start edgecore service:
  systemctl start edgecore
To check edgecore service status:
  systemctl status edgecore
To stop edgecore service:
  systemctl stop edgecore
=======================================
    `}</pre>
            </Text>

            <h2>5. Manage Lima Virtual Machine</h2>

            <p>
              <strong>Do not stop the VM while the node is active.</strong>
            </p>

            <p>Stop the virtual machine:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl stop default</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`limactl stop default`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>Check VM status:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl status default</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`limactl status default`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>Delete the virtual machine:</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl delete default</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`limactl delete default`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>
          </section>
        </>
      );
    }
    if (selectedValues?.system == 'linux') {
      return (
        <RunNodeScript
          isLinux
          nodesData={nodesData}
          loading={loading}
          isWin={false}
        />
      );
    }
    return (
      <>
        <section className={styles['link']}>
          <h1>Prerequisites</h1>

          <h2>1. Install WSL</h2>
          <Text className={styles['token_id']}>
            <p className="ell">
              https://learn.microsoft.com/en-us/windows/wsl/install
            </p>
            <a
              href="https://learn.microsoft.com/en-us/windows/wsl/install"
              target="_blank"
            >
              <i className="iconfont icon-link" />
            </a>
          </Text>

          <p style={{ marginTop: '16px' }}>
            If you prefer not to follow the Microsoft WSL guide, you can follow
            our step-by-step instructions below:
          </p>

          <h3>Check if WSL is installed</h3>
          <p>
            On Windows 10/11, WSL usually comes preinstalled. For earlier
            Windows versions that don't support WSL, please upgrade your system.
          </p>
          <p>
            To check whether WSL is already installed (if version info is
            displayed, it's installed):
          </p>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --version</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --version')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <h3>Install Ubuntu</h3>
          <Text className={styles['token_id']}>
            <p className="ell">
              $ wsl.exe --install --distribution Ubuntu --web-download
            </p>
            <a
              className={styles['icon-blue']}
              onClick={() =>
                copy('wsl.exe --install --distribution Ubuntu --web-download')
              }
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <h3>Verify Installation</h3>
          <p>Check if the installation succeeded (Ubuntu should be listed):</p>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --list</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --list')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <h3>Start Ubuntu and set root password</h3>
          <p>
            Launch Ubuntu. The first time you start it, you will be prompted to
            set a root password. Please remember it.
          </p>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe -d Ubuntu</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe -d Ubuntu')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <RunNodeScript
            nodesData={nodesData}
            loading={loading}
            isWin={isWin}
          />

          <p>
            If you see the following output, it means the node was installed
            successfully:
          </p>
          <Text className={styles['token_id']}>
            <pre className={styles['output']}>{`
Congratulations! Installation completed successfully!
 === EdgeCore Configuration Summary === 
KubeEdge Version: v1.20.0
Configuration Status:
- metaServer: enabled
- edgeMesh: disabled
- edgeStream: enabled
Backup File: /etc/kubeedge/config/edgecore.yaml.20250720_000731.bak
=======================================

=== Service Management Commands ===
To start edgecore service:
  systemctl start edgecore
To check edgecore service status:
  systemctl status edgecore
To stop edgecore service:
  systemctl stop edgecore
=======================================
    `}</pre>
          </Text>

          <h3>WSL VM Management</h3>
          <p>Use these commands to manage the WSL virtual machine:</p>

          <strong>View running virtual machines:</strong>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --list --verbose</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --list --verbose')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <strong>Start the Ubuntu VM:</strong>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe -d Ubuntu</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe -d Ubuntu')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <strong>Shutdown running VMs:</strong>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --shutdown</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --shutdown')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <strong>Delete Ubuntu VM:</strong>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --unregister Ubuntu</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --unregister Ubuntu')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>
        </section>
      </>
    );
  };

  return (
    <section className={styles['run-node']}>
      <hgroup>
        <div className={styles['run-node__box']}></div>
        <span className={styles['node-desc']}>
          You need to execute the following command
        </span>
      </hgroup>
      <div className={styles['content']}>{renderLinks()}</div>
    </section>
  );
};

export default RunNode;
