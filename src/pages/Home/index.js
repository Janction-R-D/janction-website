import React from 'react';
import styles from './index.less';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
export default function Recent() {
  return (
    <section>
      <Header />
      <Content />
      <Footer />
    </section>
  );
}
