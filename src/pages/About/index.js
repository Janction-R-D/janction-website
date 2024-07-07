import styles from './index.less';
import Items from './components/Items';
import Faq from '../Faq';
import { useState } from 'react';

const About = (props) => {
  const [userList, setUserList] = useState([
    {
      user: {
        name: 'HIROSHI  HARADA',
        role: 'FOUNDER',
      },
      description: [
        'Worked at KPMG AZSA 8 Co. as a statutory auditor, mainly for listedcompanies in a wide range of industries, including broadcasting, subject joints.IT and manufacturing',
        'He has also been involved in the auditing and support of many companiespreparing to go public, and was involved in the listing of one of his clients onthe JASDAQ market.',
        'Certified public accountant (registration no. 30168), member of the JapaneseInstitute of Certified Public Accountants',
        'Joined Jasmy as CFo in January 2020.',
      ],
    },
    {
      user: {
        name: 'KUNITAKE ANDO',
      },
      description: [
        'President and CO0 of Sony Corporation; President and Co0 of SonyEngineering and Manufacturing of America, Chairman of the Board, SonyFinancial Holdings Inc, and Chairman of the Board, Sony Life InsuranceCompany; Chairman, Frontier Human Resources Study Group, Ministry ofEconomy, Trade and Industry',
        'Appointed Representative Director in April 2016',
        'Currently, Director of the Japan Innovation Network, Chairman of theUniversity of Nagano, etc.',
      ],
    },
    {
      user: {
        name: 'KAZUMASA SATO',
      },
      description: [
        'President and Representative Director of Sonystyle.com Japan K.K., Presidentof Sony Style Company, Executive Officer of Sony Marketing inc. and Presidenof Sony Style Japan K,K., Executive Officer of Sony Marketing Inc. and GeneralManager of Creative Center, Sony Corporation. and President andRepresentative Director of BJlT Inc.',
        'Appointed Representative Director in April 2016 and President, Coo of theCompany in November 2018',
      ],
    },
    {
      user: {
        name: 'TAKASHI HAGIWARA',
      },
      description: [
        'Joined Sony Corporation, where he worked in software product design forconsumer products and was responsible for PC/VAl0 development and designfor many years.In 2000, he became President of Sony Digital NetworkApplications Corporation (SDNA). After serving as Deputy General Manager ofthe VAl0 & Mobile Business Unit, in 2015 he was Appointed President andRepresentative Director of Vision Arts Corporation. He has developed varioussystem construction projects based on cloud technology for variouscompanies in the group.',
        'Since 2020, he has overseen the development of Jasmy Software.',
      ],
    },
  ]);

  return (
    <div className={styles['about-container']}>
      <div className={styles['about-us']}>
        <h1>About Us</h1>
        <div className={styles['info']}>
          <img
            src={require('@/assets/images/about/renderings.png')}
            alt=""
            width={305}
          />
          <section>
            <h2>Company Name</h2>
            <p>
              Our team is based in Tokyo. We were founded in March 2024 and
              received XXX bonus We were founded in March 2024 and received XXX
              bonusWe were founded in March 2024 and received XXX bonus We were
              founded in March 2024 and received XXX bonus We were founded in
              March 2024 and received XXX bonus
            </p>
          </section>
        </div>
      </div>
      <div className={styles['who-we-are']}>
        <h1>Who We Are</h1>
        <div className={styles['info']}>
          <div className={styles['left']}>
            <Items data={userList[0]} />
            <Items data={userList[1]} />
            <div className={styles['divider']}>
              <img src={require('@/assets/svgs/divider.svg')} alt="" />
            </div>
          </div>
          <div className={styles['right']}>
            <div className={styles['divider']}>
              <img src={require('@/assets/svgs/divider.svg')} alt="" />
            </div>
            <Items data={userList[2]} className={styles['right-first-items']} />
            <Items data={userList[3]} />
          </div>
        </div>
      </div>
      <Faq />
    </div>
  );
};

export default About;
