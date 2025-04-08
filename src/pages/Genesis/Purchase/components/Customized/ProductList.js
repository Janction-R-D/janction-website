import { fetchListFilter } from '@/services/genesis';
import { getNodeStatusMatch } from '@/utils/lang';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getTableData } from '../utils';
import styles from './index.less';

function ProductList(props) {
  const { onChange, formValues, current } = props;
  const [selectKey, setSelectKey] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (current !== 5) return;

    const {
      location: region,
      gpu: cpu_name,
      processor: gpu_name,
      conectivity_tier: memory,
      operating_system_str: operating_system,
      ai_framework,
    } = formValues || {};
    const payload = {
      region: region || [],
      cpu_name: cpu_name || [],
      gpu_name: gpu_name || [],
      operating_system: operating_system || [],
      framework: ai_framework ? [ai_framework] : [],
    };

    getList(payload);
  }, []);
  const getList = async (input) => {
    try {
      setLoading(true);
      const res = await fetchListFilter(input);

      const data = (res || []).filter((node) => {
        const { isListed } = getNodeStatusMatch(node);
        return isListed;
      });
      const tableData = getTableData(data);
      setList(tableData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const rowSelection = {
    selectedRowKeys: [selectKey],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectKey(selectedRowKeys[0]);
      onChange?.(selectedRows[0]);
    },
  };
  const getRowClassName = (record) => {
    return record.id === selectKey ? styles['selected-row'] : '';
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: 'ID',
      ellipsis: true,
      dataIndex: 'id',
    },
    {
      title: 'Operating System',
      ellipsis: true,
      dataIndex: 'operatingSystem',
      filters: [{ text: 'Android', value: 'Android' }],
      onFilter: (value, record) => record.operatingSystem.includes(value),
    },
    {
      title: 'Architecture',
      ellipsis: true,
      dataIndex: 'architecture',
      filters: [{ text: 'ARM64', value: 'ARM64' }],
      onFilter: (value, record) => record.architecture.includes(value),
    },
    {
      title: 'Processor',
      dataIndex: 'process',
      ellipsis: true,
      render: (text, record) => (
        <div>
          <p>{text?.name.toLowerCase() == 'unknown' ? '~' : text?.name}</p>
          <p>{text?.model}</p>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={list}
      pagination={false}
      rowKey={'id'}
      loading={loading}
      rowClassName={getRowClassName}
      className={styles['table']}
      scroll={{ x: 'auto' }}
      onRow={(record) => ({
        onClick: () => {
          setSelectKey(record.id);
          onChange?.(record);
        },
      })}
    />
  );
}

export default ProductList;
