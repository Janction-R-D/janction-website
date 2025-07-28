import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';
import StepOne from '../StepOne/StepOne';
import { SYSTEM_LIST } from '@/constant';
import { request } from 'umi';

const DEFAULT = {
  system: SYSTEM_LIST[0].value,
  architecture: null, // arranca sin arquitectura seleccionada
};

const baseURL = 'https://assets.janction.ai/';

function flattenVersions(versions, baseURL) {
  const result = [];

  for (const versionObj of versions) {
    const { version, files } = versionObj;

    for (const file of files) {
      let os = '';
      if (file.includes('/win/')) os = 'windows';
      else if (file.includes('/mac/')) os = 'macos';
      else if (file.includes('/linux/')) os = 'linux';
      else continue;

      const arch = file.includes('arm64')
        ? 'cpu' //  ARM = 'cpu'
        : file.includes('x64') || file.includes('AppImage')
        ? 'cpu64' // AMD64 = 'cpu64'
        : 'unknown';

      const ext = file.split('.').pop();

      result.push({
        url: baseURL + file,
        version,
        operatingSystem: os,
        architecture: arch,
        ext,
      });
    }
  }

  return result;
}

const Guide = ({ onOpen, isOpen, setIsOpen }) => {
  const [selectedValues, setSelectedValues] = useState(DEFAULT);
  const [allLinks, setAllLinks] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);
  const [downloadVersion, setDownloadVersion] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => setIsOpen(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchLinks() {
      setLoading(true);
      try {
        const apiResponse = await request(
          `${process.env.ASSETS_URL}/app-release/metadata.json`,
        );
        if (!apiResponse?.versions?.length) return;

        const all = flattenVersions(apiResponse.versions, baseURL);
        if (isMounted) setAllLinks(all);
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

  useEffect(() => {
    if (!selectedValues.system || !selectedValues.architecture) {
      setDownloadLink(null);
      setDownloadVersion(null);
      return;
    }

    const found = allLinks.find(
      (item) =>
        item.operatingSystem === selectedValues.system &&
        item.architecture === selectedValues.architecture &&
        ['msi', 'dmg', 'AppImage'].includes(item.ext),
    );

    setDownloadLink(found?.url || null);
    setDownloadVersion(found?.version || null);
  }, [selectedValues, allLinks]);

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
              {downloadVersion && (
                <span className={styles.version}>v{downloadVersion}</span>
              )}
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
