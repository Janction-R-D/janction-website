import whyIcon1 from '@/assets/images/home/why_icon1.png';
import whyIcon2 from '@/assets/images/home/why_icon2.png';
import whyIcon3 from '@/assets/images/home/why_icon3.png';
import hiroshi_harada from '@/assets/images/home/hiroshi_harada.png';
import hiroshi_harada_android from '@/assets/images/home/hiroshi_harada_android.png';
import kunitake_ando from '@/assets/images/home/kunitake_ando.png';
import kunitake_ando_android from '@/assets/images/home/kunitake_ando_android.png';
import kazumasa_sato from '@/assets/images/home/kazumasa_sato.png';
import kazumasa_sato_android from '@/assets/images/home/kazumasa_sato_android.png';
import takashi_hagiwara from '@/assets/images/home/takashi_hagiwara.png';
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
    role: 'FOUNDER',
    avatar: hiroshi_harada,
    avatar_android: hiroshi_harada_android,
    introductions: [
      'Worked at KPMG AZSA & Co. as a statutory auditor, mainly for listed companies in a wide range of industries, including broadcasting, subject joints, IT and manufacturing.',
      'He has also been involved in the auditing and support of many companies oreparing to go public, and was involved in the listing of one of his clients on the JASDAQ market.',
      'Certified public accountant (registration no. 30168), member of the JapaneseInstitute of Certified Public Accountantse ',
      'Joined Jasmy as CFo in January 2020.',
    ],
  },
  {
    userName: 'BERND HOLLERIT',
    role: 'CTO',
    avatar: kunitake_ando,
    avatar_android: kunitake_ando_android,
    introductions: [
      'Currently, Director of the Japan Innovation Network, Chairman of theUniversity of Nagano, etc.',
      'Appointed Representative Director in April 2016',
      'President and COO of Sony Corporation; President and COO of SonyEngineering and Manufacturing of America; Chairman of the Board, SonyFinancial Holdings Inc. and Chairman of the Board, Sony Life InsuranceCompany; Chairman, Frontier Human Resources Study Group, Ministry ofEconomy, Trade and Industry',
    ],
  },
  {
    userName: 'KAZUMASA SATO',
    avatar: kazumasa_sato,
    avatar_android: kazumasa_sato_android,
    introductions: [
      'President and Representative Director of Sonystyle.com Japan K.K.. Presidentof Sony Style Company, Executive Officer of Sony Marketing Inc. and Presidenof Sony Style Japan K.K.. Executive Officer of Sony Marketing Inc. and GeneralManager of Creative Center, Sony Corporation. and President andRepresentative Director of BJlT Inc.',
      'Appointed Representative Director in April 2016 and President, COO of theCompany in November 2018',
    ],
  },
  {
    userName: 'TAKASHI HAGIWARA',
    avatar: takashi_hagiwara,
    avatar_android: takashi_hagiwara_android,
    introductions: [
      'Joined Sony Corporation, where he worked in software product design forconsumer products and was responsible for PC/VAlO development and designfor many years.In 2000, he became President of Sony Digital NetworkApplications Corporation (SDNA). After serving as Deputy General Manager ofthe VAl0 & Mobile Business Unit, in 2015 he was Appointed President andRepresentative Director of Vision Arts Corporation. He has developed varioussystem construction projects based on cloud technology for variouscompanies in the group.',
      'Since 2020, he has overseen the development of Jasmy Software.',
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
