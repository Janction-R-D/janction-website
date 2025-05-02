import { Card, Collapse, Divider, Form } from 'antd';
import styles from './index.less';
import { useEffect, useMemo, useState } from 'react';
import Operating from './Quick/Operating';
import AsidePrice from './Quick/AsidePrice/AsidePrice';
import Specification from './Quick/Specification';
import TypeSelector from './Quick/TypeSelector';
import { history } from 'umi';
import ToggleSwitch from './Quick/ToggelSwitch';
import FrameworkAi from './Customized/FrameworkAi';
import ProductList from './Quick/ProductList';
import { fetchListFilter } from '@/services/genesis';
import { getNodeStatusMatch } from '@/utils/lang';
import PurDuration from './PurDuration';
import { debounce } from 'lodash';
import Purpose from './Quick/Purpose';

const Quick = (props) => {
  const [form] = Form.useForm();
  const [isGrid, setIsGrid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [list, setList] = useState([]);
  const { node_id } = location.state || {};

  useEffect(() => {
    let { operating_system_str: operating_system = [], ai_framework } =
      formValues || {};

    let payload = {
      operating_system,
      framework: ai_framework ? [ai_framework] : [],
    };

    // getList(payload);
    debouncedGetList(payload);
  }, [formValues?.operating_system_str, formValues?.ai_framework]);

  const getList = async (data) => {
    setLoading(true);
    try {
      const res = await fetchListFilter(data);
      const newList = (res || []).filter((node) => {
        const { isListed } = getNodeStatusMatch(node);
        return isListed;
      });
      // check if theres an available node , if not refresh value of node in form
      if (res.length <= 0) {
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
  const onValuesChange = async () => {
    const values = form.getFieldsValue();
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
          {/* <Collapse
            className={styles['custom-collapse']}
            bordered={false}
            defaultActiveKey={1}
          >
            <Collapse.Panel
              header="Pre-installed application (AI Framework)"
              key="1"
              style={{ background: '#000' }}
            >
              <Form.Item name="ai_framework">
                <FrameworkAi formValues={formValues} />
              </Form.Item>
            </Collapse.Panel>
          </Collapse> */}
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
          <p style={{ marginBottom: '12px' }}>Purchase Duration</p>
          <Form.Item name="purDuration">
            <div style={{ width: '280px' }}>
              <PurDuration form={form} formValues={formValues} />
            </div>
          </Form.Item>
        </main>
      </Form>
      <Divider type="vertical" className={styles['divider']} />
      <AsidePrice
        formValues={formValues}
        styles={styles}
        onConfirm={onConfirm}
      />
    </main>
  );
};

export default Quick;
