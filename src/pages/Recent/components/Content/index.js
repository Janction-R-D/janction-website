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
export default function Content() {
  return (
    <section className={styles['main']}>
      <SectionOne />
      <SectionInput />
      <WhySection />
      <Decentralized />
      <ProductsTable />
      <HowSection />
      <PriceComparison />
      <Faq />
      <InquiryForm />
    </section>
  );
}
