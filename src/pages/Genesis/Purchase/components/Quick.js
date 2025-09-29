import { Card, Divider, Form } from 'antd';
import styles from './index.less';
import { useEffect, useMemo, useState } from 'react';
import AsidePrice from './Quick/AsidePrice/AsidePrice';
import TypeSelector from './Quick/TypeSelector';
import { history, useIntl } from 'umi';
import ToggleSwitch from './Quick/ToggelSwitch';
import ProductList from './Quick/ProductList';
import { fetchListFilter } from '@/services/genesis';
import { getNodeStatusMatch } from '@/utils/lang';
import PurDuration from './PurDuration';
import { debounce } from 'lodash';
import Purpose from './Quick/Purpose';
import ImagesAi from './Customized/ImagesAi';
import useCountrySelectorData from './Quick/hook/useCountrySelectorData';
import SelectSearch from './Quick/SelectSearch';

const Quick = (props) => {
  const [form] = Form.useForm();
  const [isGrid, setIsGrid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [list, setList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const allCountries = useCountrySelectorData();
  const { node_id } = location.state || {};
  const intl = useIntl();

  const availableCountries = useMemo(() => {
    if (allCountries.length === 0) {
      return [];
    }

    if (list.length === 0) {
      return allCountries;
    }

    const presentCountryCodes = new Set(
      list.map((node) => node.location).filter((code) => code),
    );

    const filteredCountries = allCountries.filter((country) =>
      presentCountryCodes.has(country.code),
    );

    return filteredCountries.length > 0 ? filteredCountries : allCountries;
  }, [list, allCountries]);

  const initialValues = useMemo(
    () => ({
      specification: 'basic-cpu',
    }),
    [],
  );

  useEffect(() => {
    let {
      operating_system_str: operating_system = [],
      ai_framework = [],
      specification: currentFilter = initialValues.specification,
    } = formValues || {};

    const isFixedOption = ['basic-cpu', 'high-gpu'].includes(currentFilter);

    let payload = {
      operating_system,
      framework: ai_framework,
      type: isFixedOption ? currentFilter : undefined,
      country_code: !isFixedOption ? currentFilter : undefined,
    };

    debouncedGetList(payload);
  }, [
    formValues?.operating_system_str,
    formValues?.ai_framework,
    formValues.specification,
  ]);

  const getList = async (data) => {
    setLoading(true);

    try {
      const res = await fetchListFilter(data);

      const newList =
        res?.filter((node) => {
          const { isListed } = getNodeStatusMatch(node);
          return isListed;
        }) || [];

      if (!res || res?.length <= 0) {
        setFormValues((prevState) => ({ ...prevState, node: undefined }));
        form.setFieldsValue({ node: undefined });

        if (
          !['basic-cpu', 'high-gpu'].includes(
            form.getFieldValue('specification'),
          )
        ) {
          form.setFieldsValue({ specification: 'basic-cpu' });
        }
      }
      const specification = form.getFieldValue('specification');
      if (specification === 'basic-cpu') {
        const newList = res.filter((node) => !node?.attr?.no_gpu);
        setList(newList);
        setOriginalList(newList);
      } else {
        const newList = res.filter((node) => node?.attr?.no_gpu);
        setList(newList);
        setOriginalList(newList);
      }
    } catch (error) {
      console.log(error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedGetList = useMemo(() => debounce(getList, 1000), []);
  const onValuesChange = async (_, values) => {
    setFormValues(values);
  };

  const onConfirm = async () => {
    try {
      await form.validateFields();
      history.push('/genesis/purchase/settlement', { formValues });
    } catch (err) {
      console.log('『err』', err);
    }
  };
  return (
    <main className={styles['quick-conf-wrapper']}>
      <Form
        form={form}
        name="customized"
        initialValues={initialValues}
        onValuesChange={onValuesChange}
        className={styles['form']}
      >
        <section className={styles['header-desc']}>
          <h1 className={styles['title']}>
            {intl.formatMessage({ id: 'purchase.quick' })}
          </h1>
          <p>{intl.formatMessage({ id: 'instance.description' })}</p>
        </section>
        <main className={styles['specification-conf-wrapper']}>
          <div className={styles['purpose-selector-title']}>
            {intl.formatMessage({ id: 'purchase.purpose' })}
          </div>
          <Form.Item name="purposes">
            <Purpose />
          </Form.Item>

          <Form.Item name="template">
            <ImagesAi formValues={formValues} form={form} />
          </Form.Item>
          <p>{intl.formatMessage({ id: 'instance.specification' })}</p>
          <Card className={styles['specification-card']}>
            <section className={styles['specification-card-header']}>
              <div className={styles['specification-content']}>
                <Form.Item name="specification">
                  <TypeSelector
                    countries={availableCountries}
                    setList={setList}
                    list={list}
                  />
                </Form.Item>
                <Form.Item name="location">
                  <SelectSearch
                    countries={availableCountries}
                    setList={setList}
                    list={list}
                    originalList={originalList}
                    formValues={formValues}
                  />
                </Form.Item>
              </div>

              <section className={styles['switch-container']}>
                <ToggleSwitch isGrid={isGrid} setIsGrid={setIsGrid} />
              </section>
            </section>

            <Form.Item
              name="node"
              rules={[{ required: true, message: 'Please select an instance' }]}
            >
              <ProductList
                list={list}
                isGrid={isGrid}
                styles={styles}
                loading={loading}
              />
            </Form.Item>
          </Card>

          <p style={{ marginBottom: '12px' }}>
            {intl.formatMessage({ id: 'steps.purchase_duration' })}
          </p>
          <Form.Item name="purDuration">
            <PurDuration
              form={form}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Form.Item>
        </main>
      </Form>
      <Divider type="vertical" className={styles['divider']} />
      <AsidePrice
        formValues={formValues}
        styles={styles}
        onConfirm={onConfirm}
        loading={loading}
      />
    </main>
  );
};

export default Quick;
