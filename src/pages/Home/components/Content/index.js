import React from 'react';
import styles from './index.less';
import SectionOne from './components/SectionOne';
import SectionInput from './components/SectionInput';
import WhySection from './components/WhySection';
import Decentralized from './components/Decentralized';
import ProductsTable from './components/ProductsTable';
import HowSection from './components/HowSection';
import PriceComparison from './components/PriceComaprision';
import Faq from './components/Faq';
import InquiryForm from './components/InquiryForm';
import WelcomeCard from '../WelcomeCard';
import PriceCards from './components/Pricing/PriceCards';
export default function Content() {
  return (
    <section className={styles['main-container']}>
      <section className={styles['main']}>
        <WelcomeCard />
        <SectionOne />
        <SectionInput />
        <WhySection />
        <Decentralized />
        <PriceCards />
        <ProductsTable />
        <HowSection />
        <PriceComparison />
      </section>
      <Faq />
      <InquiryForm />
    </section>
  );
}
