import Price from '../pages/Price/Price';

const PricingLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <main>
        <Price />
      </main>
    </div>
  );
};

export default PricingLayout;
