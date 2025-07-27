import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less'; // Import styles
import StepOne from '../StepOne/StepOne';
import { SYSTEM_LIST } from '@/constant';
import { request } from 'umi';

const DEFAULT = {
  system: SYSTEM_LIST[0].value,
};

const baseURL = 'https://assets.janction.ai/';

function getLatestWinX64MsiAndMacArm64Dmg(apiResponse, baseURL) {
  if (!apiResponse?.versions?.length) return null;

  const latest = apiResponse.versions[0];
  const files = latest.files;

  const winX64Msi = files.find(
    (f) => f.endsWith('.msi') && f.includes('/win/x64/'),
  );

  const macArm64Dmg = files.find(
    (f) => f.endsWith('.dmg') && f.includes('/mac/arm64/'),
  );

  return {
    version: latest.version,
    windowsMsiUrl: winX64Msi ? baseURL + winX64Msi : null,
    macDmgUrl: macArm64Dmg ? baseURL + macArm64Dmg : null,
  };
}

const Guide = ({ onOpen, isOpen, setIsOpen }) => {
  const [selectedValues, setSelectedValues] = useState(DEFAULT);
  const [links, setLinks] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchLinks() {
      setLoading(true);
      try {
        const apiResponse = await request(
          `${process.env.ASSETS_URL}/app-release/metadata.json`,
        );

        const latest = getLatestWinX64MsiAndMacArm64Dmg(apiResponse, baseURL);
        if (!latest) return;

        const newLinks = [
          {
            operatingSystem: 'windows',
            appLink: latest.windowsMsiUrl,
          },
          {
            operatingSystem: 'macos',
            appLink: latest.macDmgUrl,
          },
          {
            operatingSystem: 'linux',
            appLink: null,
          },
        ];

        if (isMounted) setLinks(newLinks);
      } catch (error) {
        console.error('Error fetching links:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Modal
      className={styles['install-node-container']}
      onCancel={handleCancel}
      open={isOpen}
      onOk={onOpen}
      footer={false}
      closable={false}
    >
      <main className={styles['install-wizard-steps']} />
      <StepOne
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        links={links}
        setDownloadLink={setDownloadLink}
        loading={loading}
      />
      <div className={styles['install-wizard-footer']}>
        {downloadLink ? (
          <a
            href={downloadLink}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="primary" className={styles.btn}>
              Download
              <span className={styles.icon}>
                <DownloadOutlined />
              </span>
            </Button>
          </a>
        ) : (
          <Button
            type="primary"
            className={styles.btn}
            disabled
            loading={loading}
          >
            Download
            <span className={styles.icon}>
              <DownloadOutlined />
            </span>
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Guide;
