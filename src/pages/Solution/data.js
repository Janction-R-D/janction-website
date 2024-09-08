import banner1 from '@/assets/images/solution/banner1.png';
import banner2 from '@/assets/images/solution/banner2.png';
import banner3 from '@/assets/images/solution/banner3.png';
import '@/assets/images/solution/slogan_bg.png';

export const slogan = {
  title: 'GPU MarketPlace',
  subTitle: 'Ensuring Efficiency and Decentralizing AI Operations',
  description:
    'Janction provides an efficient and cost-effective environment for running artificial intelligence, giving every processor the opportunity to participate in AI processes. We also utilize Web3 to achieve distributed AI and fair settlement.',
};

export const solutionSection = {
  title: 'Improve processor resource utilization and ensure fair settlement',
  description:
    'The pooling, efficient scheduling, and colocation of various processor resources enable them to effectively run AI inference tasks, while rewards are allocated to participants based on their workload with proof.',
  list: [
    {
      title: 'Distributed pooling of resources',
      description:
        'After containerizing GPUs, we use pooling and microservices architecture for scheduling and management. This approach allows us to allocate processor resources according to user needs, maximizing cost efficiency and ensuring security while meeting computational requirements."',
      icon: 'iconfont icon-location',
    },
    {
      title: 'Secure, fast management with adaptable solutions',
      description:
        'Janction uses Kademlia and Kubernetes to manage nodes and resource containers, saving users significant architectural overhead. Janction Layer2, as a Service Mesh in microservices architecture, transparently manages resource scheduling, monitoring, and system security.',
      icon: 'iconfont icon-internet',
    },
    {
      title: 'Decentralized AI and Compute Power Sharing',
      description:
        'Janction is a compute service platform that provides a range of algorithms and protocols to connect compute providers and demanders. We ensure the privacy and security of all participants and have designed a contribution proof algorithm to achieve fair settlement in the resource trading process.',
      icon: 'iconfont icon-web',
    },
  ],
};

export const characteristic = [
  {
    title: 'Efficient Utilization of Distributed GPUs',
    description:
      "Janction provides cutting-edge GPU management and scheduling technology. Each computation process is allocated resources appropriately and runs in isolation. We also use colocation to further enhance processor efficiency, allowing even ordinary users' GPUs, CPUs, and ARM processors to be utilized.",
    icon: banner1,
  },
  {
    title: 'Faster Distributed Cluster Management',
    description:
      'We use Kubernetes to manage pooled GPU resources for users. Kademlia algorithm is employed to manage various GPU nodes and data centers, accelerating communication between nodes and containers. By assigning role identifiers based on node roles, attributes, and weight levels, participants can quickly locate the desired service nodes, similar to data localization.',
    icon: banner2,
  },
  {
    title: 'As a Service Mesh -- Janction Layer2',
    description:
      'Each GPU resource pool creation deploys a Controller contract on the Janction Network. This contract handles service registration and discovery, vGPU scheduling and allocation, metadata storage and management, and license management. The entire service process and transaction settlements are recorded and verified on the blockchain, preventing monopolies and fraud.',
    icon: banner3,
  },
];
