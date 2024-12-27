import whyIcon1 from '@/assets/images/home/why_icon1.webp';
import whyIcon2 from '@/assets/images/home/why_icon2.webp';
import whyIcon3 from '@/assets/images/home/why_icon3.webp';
import hiroshi_harada from '@/assets/images/home/hiroshi_harada.webp';
import hiroshi_harada_android from '@/assets/images/home/hiroshi_harada_android.png';
import kunitake_ando from '@/assets/images/home/kunitake_ando.webp';
import kunitake_ando_android from '@/assets/images/home/kunitake_ando_android.png';
import kazumasa_sato from '@/assets/images/home/kazumasa_sato.webp';
import kazumasa_sato_android from '@/assets/images/home/kazumasa_sato_android.png';
import takashi_hagiwara from '@/assets/images/home/takashi_hagiwara.webp';
import takashi_hagiwara_android from '@/assets/images/home/takashi_hagiwara_android.png';

export const characteristics = [
  {
    name: 'Data service network compatible with various data sources',
    icon: 'icon-database',
    desc: 'Standardize protocol flows for data crawling, storage, indexing, caching and querying. On-chain data, browser content, IoT devices, etc. can be used as data sources.',
    key: 0,
  },
  {
    name: 'Ensuring each processor is used efficiently',
    icon: 'icon-cpu',
    desc: 'The computing power service network containerizes various resources and efficiently schedules them to match suitable tasks.',
    key: 1,
  },
  {
    name: 'Proof of Contribution specifically designed for AI',
    icon: 'icon-sources',
    desc: 'Fair contribution verification algorithms ensure the maximization of benefits for each honest participant.',
    key: 2,
  },
  {
    name: 'Fast and secure node management and resource indexing',
    icon: 'icon-chart',
    desc: 'Janction uses Kademlia and K8s to uniformly manage all node and containers, with system resources being standardized, processed, and indexed.',
    key: 3,
  },
];

export const reasons = [
  {
    name: 'Modularization',
    desc: 'By applying modular blockchain technology to data provision, model computation, on-chain verification, data verifiability, and transaction settlement, Janction achieves high scalability and flexibility.',
    img: whyIcon1,
    key: 1,
  },
  {
    name: 'Efficiency and Compatibility',
    desc: 'Janction uses containerization to isolate nd standardize each resource type, allowing processors, data sources, and tasks to operate independently from one another and within their own categories, ensuring both efficiency and security.',
    img: whyIcon2,
    key: 2,
  },
  {
    name: 'Pipeline',
    desc: 'Janction standardizes resource processing, unifying data structures and scheduling methods. It uses Kubernetes and the Kad algorithm for container management and scheduling, enhancing pipeline processing efficiency.',
    img: whyIcon3,
    key: 3,
  },
];

export const teamList = [
  {
    userName: 'HIROSHI HARADA',
    role: 'CEO',
    avatar: hiroshi_harada,
    avatar_android: hiroshi_harada_android,
    introductions: [
      'In 2008, he joined KPMG JAPAN, where he was engaged in IPO support services, financial statement audits, internal control audits, and M&A advisory services. He is familiar with many businesses, manufacturing, telecom, broadcast, construction, advertising, publishing, and has insights of IPOs.',
      'Joined JASMY in 2018; as CFO, he was the first Japanese company to be listed on Coinbase/Binance and achieved CAP $2B, leading it to become the largest cryptocurrency in Japan.',
      'In 2023, he funded JANCTION, a project to solve the data challenges of the monopolized GPU and AI market through decentralization.',
      'Certified Public Accountant (#30168), Certified Tax Accountant (#150298)',
    ],
  },
  {
    userName: 'BERND HOLLERIT',
    role: 'CTO',
    avatar: kunitake_ando,
    avatar_android: kunitake_ando_android,
    introductions: [
      'Dr. Hollerit earned his PhD degree in Engineering with a specialization in Systems Innovation from The University of Tokyo and has worked in tech leadership roles for over a decade.',
      'After managing global teams in research & development, software engineering, and data science at organizations such as the National Institute of Informatics and Fast Retailing, he became Chief Technology Officer in the crypto/artificial intelligence/web 3.0 space. Previous successes include writing a white paper that led to a sales increase of 164%, developing a DevOps CI/CD pipeline that reduced feedback time from 2-3 days to 10 minutes, and saving ¥23M JPY per year by improving an image recognition system.',
      'For Jasmy Lab’s JANCTION project, Dr. Hollerit is leading the technical development of the GPU pool, layer 1 and layer 2 blockchains, decentralized applications, and data marketplace.',
    ],
  },
  {
    userName: 'AKIRA SUGANUMA',
    role: 'Co-Founder',
    avatar: kazumasa_sato,
    avatar_android: kazumasa_sato_android,
    introductions: [
      'The individual has extensive experience in launching new businesses with various companies, including subsidiaries of ITOCHU-SHOKUHIN Co.,Ltd., covering both Japanese and foreign enterprises. Subsequently, they began a consulting business focused on establishing new ventures in Japan and China and negotiating with government agencies. In their role as the head of a new business division at a cryptocurrency exchange, they were involved in a broad range of activities, including marketing.',
      'In 2023, JasmyLab participated in Janction as a Co-Founder.',
    ],
  },
  {
    userName: 'KEISUKE KATO',
    role: 'Community Manager',
    avatar: takashi_hagiwara,
    avatar_android: takashi_hagiwara_android,
    introductions: [
      'He has always been at the forefront of experience in crypto assets, starting trading in 2018 and creating and selling his own NFT in 2022.',
      'After graduating from college, he joined a web3 related company, where he gained experience in listing crypto assets and building a community. He joined JANCTION in January 2024 as a further challenge. With his natural energy and enthusiasm, he built a dynamic community of over 10,000 people in just a few months.',
    ],
  },
];

export const questionList = [
  {
    title: 'How Janction Efficiently Stores AI/ML Models for Different Users？',
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
  {
    title:
      "Compared to traditional cloud GPU platforms, how does Janction's distributed idle GPU computing power solution ensure price advantages and provide stable and reliable computing power services?",
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
  {
    title:
      'How does Janction ensure the efficiency and quality of data annotation for various data types with different formats and standards?',
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
  {
    title:
      "How does Janction's execution layer handle the various AI subdomain functionalities?",
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
  {
    title: 'How does Janction select and use different DAs?',
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
  {
    title:
      'Is Janction considering adopting the security guarantees provided by Restaking?',
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
  {
    title: 'What is the current progress of Janction’s product technology?',
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
  {
    title: 'How will Janction consider airdropping to the community?',
    answer:
      'Since there are three main categories of AI/ML models, traditional machine learning models (linear regression, decision trees, support vector machines) with storage spaces generally ranging from hundreds of KB to tens of MB; tens of MB to several GB Deep learning models (depending on the depth, width, and number of parameters of the network. For example, a smaller convolutional neural network (CNN) may be tens to hundreds of MB in size, while a large deep neural network (DNN) may will exceed hundreds of MB or even several GB); large language models (LLM) from hundreds of MB to tens of GB, depending on the size of the model and the number of parameters. We use a set of highly reliable and scalable file storage systems and memory caching mechanisms to ensure that models with storage space less than 4GB (specific threshold recommendations and technical confirmations) are used for persistent storage, and can be intelligently preloaded into the memory of GPU instances. middle. For the model itself, we will also use some traditional compression techniques. In addition, based on the region where the GPUs we aggregate are located, we will make corresponding CDN configurations for the model. As for the large language model, due to the huge storage space, we are still examining the technical solutions. We will probably choose a distributed file storage solution, such as Hadoop Distributed File System. At the same time, we will use distributed storage solutions, such as Redis, Memcached, etc.',
  },
];

export const bannderNav = [
  {
    name: 'GPU MARKET',
  },
  {
    name: 'LAYER2 ARCHITECTURE',
  },
  {
    name: 'AI Ecosystem',
  },
];
