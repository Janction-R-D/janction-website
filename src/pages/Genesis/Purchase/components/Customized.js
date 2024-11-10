import Application from './Application';
import BandWidth from './BandWidth';
import PurchaseCard from './Card';
import PurchaseSubCard from './Card/SubCard';
import Footer from './Footer';
import ImageConf from './ImageConf';
import styles from './index.less';
import RegionSelect from './RegionSelect';
import Settlement from './Settlement';
import Specification from './Specification';

const Customized = (props) => {
  return (
    <div
      className={[styles['config-wrapper'], styles['customized-wrapper']].join(
        ' ',
      )}
    >
      <PurchaseCard title="Basic configuration">
        <PurchaseSubCard title="Instance specification">
          <Specification />
        </PurchaseSubCard>
        <PurchaseSubCard title="Image">
          <ImageConf />
        </PurchaseSubCard>

        <PurchaseSubCard title="Pre-installed application">
          <Application />
        </PurchaseSubCard>
        <PurchaseSubCard title="Region">
          <RegionSelect />
        </PurchaseSubCard>
      </PurchaseCard>
      <PurchaseCard title="Bandwidth">
        <BandWidth />
      </PurchaseCard>
      <Settlement />
      <Footer isLast />
    </div>
  );
};

export default Customized;
