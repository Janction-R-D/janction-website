import { useState } from 'react';
import { Modal, Steps, Image, Button } from 'antd';
import styles from './index.less';

import img1 from '@/assets/images/genesis/tailscale/tailscale_0.png';
import img2 from '@/assets/images/genesis/tailscale/tailscale_1.png';
import img3 from '@/assets/images/genesis/tailscale/tailscale_2.png';
import img4 from '@/assets/images/genesis/tailscale/tailscale_4.png';
import img5 from '@/assets/images/genesis/tailscale/tailscale_3.png';
import img6 from '@/assets/images/genesis/tailscale/tailscale_5.png';
import img7 from '@/assets/images/genesis/tailscale/tailscale_6.png';
import img8 from '@/assets/images/genesis/tailscale/tailscale_7.png';

const { Step } = Steps;

const stepsData = [
  {
    title: 'Install the Tailscale app',
    description: (
      <>
        First, download and install the Tailscale application on your computer.
        You can get the latest version from{' '}
        <a
          href="https://tailscale.com/download"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1677ff' }}
        >
          the official download page
        </a>
        . Follow the setup wizard until the app is installed successfully.
      </>
    ),
    image: img1,
  },
  {
    title: 'Enable the Network Extension',
    description: 'Go to System Settings to add Tailscale extension',
    image: img2,
  },
  {
    title: 'Enable the Network Extension',
    description:
      'General Settings → Network Extension and enable Tailscale so it can access the required network features.',
    image: img3,
  },
  {
    title: 'Add Tailscale',
    description: 'Enable tailscale network extension',
    image: img5,
  },
  {
    title: 'Open Tailscale settings',
    description:
      "Click the Tailscale icon in the menu bar at the top of your screen, then select 'Settings' or 'Tailscale Settings' from the dropdown.",
    image: img4,
  },

  {
    title: 'Enable CLI Integration',
    description:
      "In the Tailscale settings, scroll down to the 'CLI Integration: Manage Tailscale from terminal' section and click 'Show me how'.",
    image: img6,
  },
  {
    title: 'Install the Tailscale CLI',
    description:
      "When the modal appears, click the button to install Tailscale CLI at /usr/local/bin/tailscale. Once installed, you'll be able to manage Tailscale directly from the terminal.",
    image: img7,
  },
  {
    title: 'Verify CLI Installation',
    description:
      'Open a new terminal and run `tailscale status` to verify that the CLI is working properly.',
    image: img8,
  },
];

export default function TailscaleSetupModal({ visible, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Modal
      title="Tailscale Installation Guide"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      className={styles['customModal']}
    >
      <Steps
        current={currentStep}
        size="small"
        style={{ marginBottom: 24 }}
        onChange={setCurrentStep}
      >
        {stepsData.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>

      <h2 style={{ paddingBottom: '1rem' }}>{stepsData[currentStep].title}</h2>
      <div style={{ paddingBottom: '1rem' }}>
        {stepsData[currentStep].description}
      </div>
      <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
        <Image width={400} src={stepsData[currentStep].image} preview={false} />
      </div>

      <div style={{ textAlign: 'right' }}>
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          style={{ marginRight: 8 }}
        >
          Previous
        </Button>
        <Button
          type="primary"
          disabled={currentStep === stepsData.length - 1}
          onClick={() => setCurrentStep(currentStep + 1)}
          className={styles['connect-btn']}
        >
          Next
        </Button>
      </div>
    </Modal>
  );
}
