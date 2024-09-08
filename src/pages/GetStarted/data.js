import step1 from '@/assets/images/get-started/step1.png';
import step2 from '@/assets/images/get-started/step2.png';
import step3 from '@/assets/images/get-started/step3.png';
import eye from '@/assets/images/get-started/eye.png';
import data_bank from '@/assets/images/get-started/data_bank.png';
import path from '@/assets/images/get-started/path.png';

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
    title: 'View Your AI Jobs',
    description: 'Check your Job status and running status',
    icon: eye,
  },
  {
    title: 'Check Your Points',
    description: 'Coming Soon',
    icon: path,
  },
  {
    title: 'Submit Your AI Job',
    description: 'Coming Soon',
    icon: data_bank,
  },
];
