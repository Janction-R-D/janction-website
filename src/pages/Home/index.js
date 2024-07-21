import styles from './index.less';

const Home = (props) => {
  const characteristics = [
    {
      name: 'INTEGRATED SERVICE',
      desc: 'Integrate data, GPU and moclelsrting Alinto one platform fully suppo Dapps.FULLY V',
      list: [
        'Add target company',
        'Add target job',
        'Add detailed description',
      ],
    },
    {
      name: 'FULLY VERIFIABLE',
      desc: 'Integrate data, GPU and moclelsrting Alinto one platform fully suppo Dapps.FULLY V',
      list: [
        'PDF,docx,txt supported',
        'Modify your materials at any time',
        'Resume revision(incoming)',
      ],
    },
    {
      name: 'PERMISSIONLESS ACCES',
      desc: 'Get guaranteed solutions fromultiple models and dynamildatahainlabel with ZK proofs for off-cinformation.',
      list: [
        'PDF,docx,txt supported',
        'Modify your materials at any time',
        'Resume revision(incoming)',
      ],
    },
    {
      name: 'Start assistant session',
      desc: 'Open for any roles, like GPU Al users, Al agents, Al develc holders,pers,etc. Have a scalability for an!scenarios, such as DA layer,zkEVM,Interoperability.',
      list: [
        'Select voice source',
        'AI real-time speech recognition',
        'professional and adaptable ',
      ],
    },
  ];

  const reasons = [
    {
      name: 'INTEGRATED SERVICE',
      desc: 'Integrate data, GPU and moclelsrting Alinto one platform fully suppo Dapps.FULLY V',
    },
    {
      name: 'FULLY VERIFIABLE',
      desc: 'Integrate data, GPU and moclelsrting Alinto one platform fully suppo Dapps.FULLY V',
    },
    {
      name: 'PERMISSIONLESS ACCES',
      desc: 'Get guaranteed solutions fromultiple models and dynamildatahainlabel with ZK proofs for off-cinformation.',
    },
  ];

  const questions = [
    'How Janction Efficiently Stores AI/ML Models for Different Users?',
    'Is Janction considering adopting the security guarantees provided by Restaking?',
    "How does Janction's execution layer handle the various AI subdomain functionalities?",
  ];

  return (
    <div className={styles['home-container']}>
      <div className={styles['slogan']}>
        <h1>Blockchains, Abstracted.</h1>
        <p>
          AI interview assistant that helps generate amazing interview <br />{' '}
          response, in just ONE second, at a fraction of the cost!
        </p>
        <div className={styles['buttons']}>
          <a href="javascript:viod(0)" className={styles['get-started']}>
            <span>Get Started</span>
            <i className="iconfont icon-link"></i>
          </a>
          <a href="javascript:viod(0)" className={styles['read-docs']}></a>
          <div className={styles['shadow']}></div>
        </div>
      </div>
      <div className={styles['how-works']}>
        <p className={styles['title']}></p>
        <h1>
          Instruct to our <br /> AI Searvice
        </h1>
        <p className={styles['desc']}>
          The brand new PUI 5.8.x is coming soon for PICO Neo3 / Neo3 Pro / Neo3
          Pro Eye users
        </p>
        <a href="javascript:viod(0)"></a>
      </div>

      <div className={styles['decentral-ai-hub']}>
        <h1>Decentral AI hub</h1>
        <div className={styles['characteristic-list']}>
          <ul>
            {characteristics.map((item) => (
              <li key={item.name}>
                <h2>{item.name}</h2>
                <p>{item.desc}</p>
                <div className={styles['shadow']}></div>
                <ul>
                  {item.list.map((_item) => (
                    <li key={_item}>{_item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles['why-and-how']}>
        <h1>
          Why ProVisual? How to use <br /> the online 3D visualizer?
        </h1>
        <p>
          The brand new PUI 5.8.x is coming soon for PICO Neo3 / Neo3 Pro / Neo3
          Pro Eye users
        </p>
        <div className={styles['reason-list']}>
          <ul>
            {reasons.map((item) => (
              <li className={styles['item.name']}>
                <img src="" alt="" />
                <h2>{item.name}</h2>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles['questions']}>
        <h1>Want to ask something from us?</h1>
        <p>
          The brand new PUI 5.8.x is coming soon for PICO Neo3 / Neo3 Pro / Neo3
          Pro Eye users
        </p>
        <div className={styles['question-list']}>
          <ul>
            {questions.map((item) => (
              <li key={item}>
                <p>{item}</p>
                <i></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
