import { Card, Divider, Form } from 'antd';
import styles from './index.less';
import { useEffect, useMemo, useState } from 'react';
import AsidePrice from './Quick/AsidePrice/AsidePrice';
import TypeSelector from './Quick/TypeSelector';
import { history } from 'umi';
import ToggleSwitch from './Quick/ToggelSwitch';
import ProductList from './Quick/ProductList';
import { fetchListFilter } from '@/services/genesis';
import { getNodeStatusMatch } from '@/utils/lang';
import PurDuration from './PurDuration';
import { debounce } from 'lodash';
import Purpose from './Quick/Purpose';
import FrameworkAi from './Customized/FrameworkAi';
import ImagesAi from './Customized/ImagesAi';

const Quick = (props) => {
  const [form] = Form.useForm();
  const [isGrid, setIsGrid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [list, setList] = useState([]);
  const { node_id } = location.state || {};

  useEffect(() => {
    let { operating_system_str: operating_system = [], ai_framework = [] } =
      formValues || {};

    let payload = {
      operating_system,
      framework: ai_framework,
    };

    debouncedGetList(payload);
  }, [formValues?.operating_system_str, formValues?.ai_framework]);

  const getList = async (data) => {
    setLoading(true);
    try {
      const res = await fetchListFilter(data);
      const newList = (res || [])?.filter((node) => {
        const { isListed } = getNodeStatusMatch(node);
        return isListed;
      });

      if (res.length <= 0) {
        setFormValues((prevState) => ({ ...prevState, node: undefined }));
        form.setFieldsValue({ node: undefined });
      }
      setList(newList);
    } catch (error) {
      console.log(error);
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
        onValuesChange={onValuesChange}
        className={styles['form']}
      >
        <section className={styles['header-desc']}>
          <h1 className={styles['title']}>Quick Purchase</h1>
          <p>
            Mobile is convenient, and large users can provide flexible computing
            power.
          </p>
        </section>
        <main className={styles['specification-conf-wrapper']}>
          <div className={styles['purpose-selector-title']}>Purpose</div>
          <Form.Item name="purposes">
            <Purpose />
          </Form.Item>
          {/* <Form.Item name="operating_system_str">
            <Operating getList={getList} />
          </Form.Item> */}

          <Form.Item name="ai_framework">
            <FrameworkAi formValues={formValues} />
          </Form.Item>

          <p>Instance Specification</p>
          <Card className={styles['specification-card']}>
            <section className={styles['specification-card-header']}>
              <Form.Item name="specification">
                <TypeSelector />
              </Form.Item>

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

          <Form.Item name="template">
            <ImagesAi formValues={formValues} form={form} />
          </Form.Item>

          <p style={{ marginBottom: '12px' }}>Purchase Duration</p>
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
