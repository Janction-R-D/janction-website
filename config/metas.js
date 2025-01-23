function transformArrayObjects(array) {
  return array
    .map((obj) => {
      return Object.keys(obj).map((key) => {
        return {
          name: 'description',
          content: obj[key],
        };
      });
    })
    .flat();
}

export const characteristics = [
  {
    name: 'Data service network compatible with various data sources',
    desc: 'Standardize protocol flows for data crawling, storage, indexing, caching and querying. On-chain data, browser content, IoT devices, etc. can be used as data sources.',
  },
  {
    name: 'Ensuring each processor is used efficiently',
    desc: 'The computing power service network containerizes various resources and efficiently schedules them to match suitable tasks.',
  },
  {
    name: 'Proof of Contribution specifically designed for AI',
    desc: 'Fair contribution verification algorithms ensure the maximization of benefits for each honest participant.',
  },
  {
    name: 'Fast and secure node management and resource indexing',
    desc: 'Janction uses Kademlia and K8s to uniformly manage all node and containers, with system resources being standardized, processed, and indexed.',
  },
];

export const reasons = [
  {
    name: 'Modularization',
    desc: 'By applying modular blockchain technology to data provision, model computation, on-chain verification, data verifiability, and transaction settlement, Janction achieves high scalability and flexibility.',
  },
  {
    name: 'Efficiency and Compatibility',
    desc: 'Janction uses containerization to isolate nd standardize each resource type, allowing processors, data sources, and tasks to operate independently from one another and within their own categories, ensuring both efficiency and security.',
  },
  {
    name: 'Pipeline',
    desc: 'Janction standardizes resource processing, unifying data structures and scheduling methods. It uses Kubernetes and the Kad algorithm for container management and scheduling, enhancing pipeline processing efficiency.',
  },
];

export const teamList = [
  {
    userName: 'HIROSHI HARADA',
    role: 'FOUNDER',
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
    introductions: [
      'Currently, Director of the Japan Innovation Network, Chairman of theUniversity of Nagano, etc.',
      'Appointed Representative Director in April 2016',
      'President and COO of Sony Corporation; President and COO of SonyEngineering and Manufacturing of America; Chairman of the Board, SonyFinancial Holdings Inc. and Chairman of the Board, Sony Life InsuranceCompany; Chairman, Frontier Human Resources Study Group, Ministry ofEconomy, Trade and Industry',
    ],
  },
  {
    userName: 'KAZUMASA SATO',
    introductions: [
      'President and Representative Director of Sonystyle.com Japan K.K.. Presidentof Sony Style Company, Executive Officer of Sony Marketing Inc. and Presidenof Sony Style Japan K.K.. Executive Officer of Sony Marketing Inc. and GeneralManager of Creative Center, Sony Corporation. and President andRepresentative Director of BJlT Inc.',
      'Appointed Representative Director in April 2016 and President, COO of theCompany in November 2018',
    ],
  },
  {
    userName: 'TAKASHI HAGIWARA',
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

export default [
  {
    name: 'title',
    content: 'Janction',
  },
  {
    name: 'title',
    content: 'Home',
  },
  {
    name: 'title',
    content: 'Explore',
  },
  {
    name: 'title',
    content: 'Get Started',
  },
  {
    name: 'title',
    content: 'Dashboard',
  },
  {
    name: 'title',
    content: 'HOW IT WORKS',
  },
  {
    name: 'title',
    content: 'Decoupling, Pipeline and Proof',
  },
  {
    name: 'title',
    content: 'Layer 2 for verifiable, synergic and scalable AI',
  },
  {
    name: 'title',
    content: 'GPU MARKET',
  },
  {
    name: 'title',
    content: 'LAYER2 ARCHITECTURE',
  },
  {
    name: 'title',
    content: "Janction's GPU MARKET",
  },
  {
    name: 'title',
    content: 'Decentralized AI hub',
  },
  {
    name: 'title',
    content: 'Why Janction？',
  },
  {
    name: 'title',
    content: 'Team',
  },
  {
    name: 'title',
    content: 'AI Ecosystem',
  },
  {
    name: 'description',
    content:
      'Janction is building a service network for the data and computing power sides of artificial intelligence, featuring a fair and efficient revenue distribution algorithm, a data verification layer specifically designed for AI, and an efficient distributed resource allocation system.',
  },
  {
    name: 'description',
    content:
      'Janction decouples data, computing power, and models within the AI system, allowing tasks and resources to run in isolated yet pipeline processes. The Janction Network provides decentralized AI services for contribution verification, revenue distribution, and data verifiability, using unique algorithms for node and route management.',
  },
  ...transformArrayObjects(characteristics),
  ...transformArrayObjects(reasons),
  ...transformArrayObjects(teamList),
  ...transformArrayObjects(questionList),
  ...transformArrayObjects(bannderNav),
  {
    name: 'title',
    content: 'LAYER 2 FOR DECENTRALIZED AI',
  },
  {
    name: 'title',
    content: 'Node Running',
  },
  {
    name: 'title',
    content: 'Node Overview',
  },
  {
    name: 'title',
    content: 'Nodes Points',
  },
  {
    name: 'title',
    content: 'LAYER 2 FOR DECENTRALIZED AI',
  },
  {
    name: 'title',
    content: 'Nvidia',
  },
  {
    name: 'title',
    content: 'Apple',
  },
  {
    name: 'title',
    content: 'CPU',
  },
  {
    name: 'title',
    content: 'VISION',
  },
  {
    name: 'title',
    content: 'JOIN NETWORK',
  },
  {
    name: 'title',
    content: 'Environmental preparation',
  },
  {
    name: 'title',
    content: 'Initialize',
  },
  {
    name: 'title',
    content: 'Run Node',
  },
  {
    name: 'title',
    content: 'Let’s Compute',
  },
  {
    name: 'title',
    content: 'View Your AI Jobs',
  },
  {
    name: 'title',
    content: 'Submit Your AI Job',
  },
  {
    name: 'title',
    content: 'Check Your Points',
  },
  {
    name: 'title',
    content: '',
  },
  {
    name: 'title',
    content: '',
  },
  {
    name: 'description',
    content:
      'Janction GPU Marketplace aims to provide unlimited GPU capacity to users at lower costs by aggregating GPUs from multiple sources.',
  },
  {
    name: 'description',
    content: 'Choose Your Operating System, Install Softwares Such As Docker',
  },
  {
    name: 'description',
    content: 'Download Janction Binary Setup And Initalize Dataset',
  },
  {
    name: 'description',
    content: 'Join Network, Loading Jobs And Computing',
  },
  {
    name: 'description',
    content: 'Check your Job status and running status',
  },
];
