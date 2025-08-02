import { ANDROID_APK_PATH, COMMAND, DOCKER_PATH } from '@/constant';
import { useEffect, useState } from 'react';
import { copy } from '@/utils/lang';
import styles from './index.less';
import { Typography } from 'antd';
import RunNodeScript from './RunNodeScript';
import { useIntl } from 'umi';

const { Text } = Typography;

const RunNode = (props) => {
  const { selectedValues, nodesData, loading, isWin } = props;
  const [nodeData, setNodaData] = useState();
  const intl = useIntl();

  useEffect(() => {
    let nodeData = {
      docker: DOCKER_PATH[selectedValues?.system],
      script:
        COMMAND[selectedValues?.system]?.[selectedValues?.architecture] ||
        '(code area)',
    };
    if (selectedValues?.system === 'android') {
      nodeData.apk = ANDROID_APK_PATH;
    }
    setNodaData(nodeData);
  }, [selectedValues]);

  const renderLinks = () => {
    if (selectedValues?.system === 'android') {
      return (
        <>
          <section className={styles['link']}>
            <h1>{intl.formatMessage({ id: 'runNode.install.termux' })}</h1>
            <Text className={styles['token_id']}>
              {nodeData?.apk}
              <a
                className={styles['icon-orange']}
                href={nodeData?.apk}
                target="_blank"
                rel="noreferrer"
              >
                <i className="iconfont icon-link" />
              </a>
            </Text>
          </section>
        </>
      );
    }

    if (selectedValues?.system === 'macos') {
      return (
        <>
          <section className={styles['link']}>
            <h1>{intl.formatMessage({ id: 'runNode.prerequisites' })}</h1>

            <h2>
              1. {intl.formatMessage({ id: 'runNode.check.install.brew' })}
            </h2>

            <p>{intl.formatMessage({ id: 'runNode.check.brew.version' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew --version</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('brew --version')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>{intl.formatMessage({ id: 'runNode.not.installed.run' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">
                  $ /bin/bash -c &quot;$(curl -fsSL
                  https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)&quot;
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

            <p>{intl.formatMessage({ id: 'runNode.add.homebrew.path' })}</p>
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
                onClick={() => copy('source ~/.zshrc')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>{intl.formatMessage({ id: 'runNode.verify.installation' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew doctor</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('brew doctor')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>{intl.formatMessage({ id: 'runNode.update.homebrew' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew update</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('brew update')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <h2>
              2. {intl.formatMessage({ id: 'runNode.check.install.lima' })}
            </h2>

            <p>{intl.formatMessage({ id: 'runNode.check.lima.version' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl --version</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('limactl --version')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>{intl.formatMessage({ id: 'runNode.install.lima' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew install lima</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('brew install lima')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>{intl.formatMessage({ id: 'runNode.start.vm' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl start</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('limactl start')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <h2>3. {intl.formatMessage({ id: 'runNode.access.shell' })}</h2>

            <p>{intl.formatMessage({ id: 'runNode.access.lima.shell' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ lima sudo -i</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('lima sudo -i')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <RunNodeScript
              nodesData={nodesData}
              loading={loading}
              isWin={false}
            />

            <p>{intl.formatMessage({ id: 'runNode.install.success' })}</p>
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

            <h2>5. {intl.formatMessage({ id: 'runNode.manage.vm' })}</h2>

            <p>
              <strong>
                {intl.formatMessage({ id: 'runNode.do.not.stop' })}
              </strong>
            </p>

            <p>{intl.formatMessage({ id: 'runNode.stop.vm' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl stop default</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('limactl stop default')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>{intl.formatMessage({ id: 'runNode.check.vm.status' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl status default</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('limactl status default')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>

            <p>{intl.formatMessage({ id: 'runNode.delete.vm' })}</p>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl delete default</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy('limactl delete default')}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>
          </section>
        </>
      );
    }

    if (selectedValues?.system === 'linux') {
      return (
        <RunNodeScript
          isLinux
          nodesData={nodesData}
          loading={loading}
          isWin={false}
        />
      );
    }

    // Para windows (u otro caso)
    return (
      <>
        <section className={styles['link']}>
          <h1>{intl.formatMessage({ id: 'runNode.prerequisites' })}</h1>

          <h2>1. {intl.formatMessage({ id: 'runNode.install.wsl' })}</h2>
          <Text className={styles['token_id']}>
            <p className="ell">
              https://learn.microsoft.com/en-us/windows/wsl/install
            </p>
            <a
              href="https://learn.microsoft.com/en-us/windows/wsl/install"
              target="_blank"
              rel="noreferrer"
            >
              <i className="iconfont icon-link" />
            </a>
          </Text>

          <p style={{ marginTop: 16 }}>
            {intl.formatMessage({ id: 'runNode.wsl.guide' })}
          </p>

          <h3>{intl.formatMessage({ id: 'runNode.check.wsl.installed' })}</h3>
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

          <h3>{intl.formatMessage({ id: 'runNode.install.ubuntu' })}</h3>
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

          <h3>{intl.formatMessage({ id: 'runNode.verify.installation' })}</h3>
          <p>{intl.formatMessage({ id: 'runNode.node.installed.success' })}</p>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --list</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --list')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <h3>{intl.formatMessage({ id: 'runNode.start.ubuntu.set.root' })}</h3>
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

          <p>{intl.formatMessage({ id: 'runNode.node.installed.success' })}</p>
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

          <h3>{intl.formatMessage({ id: 'runNode.wsl.vm.management' })}</h3>
          <p>{intl.formatMessage({ id: 'runNode.manage.vm.commands' })}</p>

          <strong>
            {intl.formatMessage({ id: 'runNode.view.running.vms' })}
          </strong>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --list --verbose</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --list --verbose')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <strong>
            {intl.formatMessage({ id: 'runNode.start.ubuntu.vm' })}
          </strong>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe -d Ubuntu</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe -d Ubuntu')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <strong>{intl.formatMessage({ id: 'runNode.shutdown.vms' })}</strong>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl.exe --shutdown</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl.exe --shutdown')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <strong>
            {intl.formatMessage({ id: 'runNode.delete.ubuntu.vm' })}
          </strong>
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
        <div className={styles['run-node__box']} />
        <span className={styles['node-desc']}>
          {intl.formatMessage({ id: 'runNode.execute.command' })}
        </span>
      </hgroup>
      <div className={styles['content']}>{renderLinks()}</div>
    </section>
  );
};

export default RunNode;
