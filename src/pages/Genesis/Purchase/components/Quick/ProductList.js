import Instances from './Instances';
import QuickTable from './QuickTable';
export default function ProductList(props) {
  const { formValues, onChange, isGrid, styles, list, value, loading } = props;

  return (
    <>
      {isGrid ? (
        <Instances
          styles={styles}
          formValues={formValues}
          onChange={onChange}
          data={list}
          value={value}
        />
      ) : (
        <QuickTable
          value={value}
          formValues={formValues}
          onChange={onChange}
          data={list}
          loading={loading}
        />
      )}
    </>
  );
}
