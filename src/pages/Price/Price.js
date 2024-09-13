import Cards from './components/Cards';
import Header from '../../components/Layouts/Header';
import Footer from '../../components/Layouts/Footer';
export default function Price() {
  return (
    <main>
      <Header />
      <header className="header-container">
        <section className="pricing-header">
          <img src="./assets/banner-des.png" alt="" className="img-md-block" />
          <img src="./assets/banner.png" alt="" className="img-md-hidden" />
          <img
            src="./assets/banner-shadow.png"
            alt="Banner picture"
            className="img-banner-shadow"
          />
        </section>
      </header>
      <main className="pricing-main">
        <article className="pricing-main__header">
          <span className="text-gray">Janction</span>
          <h1 className="text-title">Put title here...</h1>
          <p className="text-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
            nihil, repellendus quibusdam dolorum reiciendis, temporibus ipsum
            atque ipsam, hic rem sunt facilis unde vero asperiores! Nulla, quo.
            Minus, omnis rerum.
          </p>
        </article>
        <section>
          <h2 className="text-subtitle ">Pricing</h2>
          <Cards />
        </section>
      </main>
      <Footer />
    </main>
  );
}
