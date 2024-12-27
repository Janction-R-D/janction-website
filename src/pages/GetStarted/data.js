import step1 from '@/assets/images/get-started/step1.webp';
import step2 from '@/assets/images/get-started/step2.webp';
import step3 from '@/assets/images/get-started/step3.webp';
import eye from '@/assets/images/get-started/eye.png';
import data_bank from '@/assets/images/get-started/data_bank.png';
import path from '@/assets/images/get-started/path.png';
import '@/assets/images/get-started/flow.png';
import '@/assets/images/get-started/step_shadow.webp';

export const steps = [
  {
    name: 'Step1',
    title: 'Environmental preparation',
    description:
      'Choose Your Operating System, Install Softwares Such As Docker',
    banner: step1,
  },
  {
    name: 'Step2',
    title: 'Initialize',
    description: 'Download Janction Binary Setup And Initalize Dataset',
    banner: step2,
  },
  {
    name: 'Step3',
    title: 'Run Node',
    description: 'Join Network, Loading Jobs And Computing',
    banner: step3,
  },
];

export const computes = [
  {
    title: 'Run A Node',
    description: 'Anyone can run a node and join janction network',
    icon: path,
    buttonText: 'Get Started',
    path: '/genesis',
  },
  {
    title: 'View Your  Point',
    description: 'Points leaderboard, points dynamic history',
    icon: data_bank,
    buttonText: 'Explore',
    path: '/explore?nav=points',
  },
  {
    title: 'View Your Nodes',
    description: 'View global node status',
    icon: eye,
    buttonText: 'Explore',
    path: '/explore?nav=node',
  },
];
