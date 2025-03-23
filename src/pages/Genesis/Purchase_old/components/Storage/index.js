import JanctionRange from '@/components/JanctionRange';
import JanctionSelect from '@/components/JanctionSelect';
import JanctionTable from '@/components/JanctionTable';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { generateTempId, updateArray } from '@/utils/lang';

const TYPE = [
  {
    value: '1',
    label: 'General-purpose SSD cloud hard disk',
  },
];
const Storage = (props) => {
  const { value, onChange } = props;
  const [list, setList] = useState([{}]);

  useEffect(() => {
    setList(value || []);
  }, [value]);

  const onAdd = () => {
    const _list = updateArray(list, 'add', {
      data: { id: generateTempId() },
    });
    onChange(_list);
  };

  const onEdit = (field, value, id) => {
    const _list = updateArray(list, 'update', {
      data: { [field]: value },
      identifierValue: id,
    });
    onChange(_list);
  };

  const onDelete = (id) => {
    const _list = updateArray(list, 'delete', {
      identifierValue: id,
    });
    onChange(_list);
  };

  const columns = [
    {
      title: 'use',
      dataIndex: 'platform',
    },
    {
      title: 'type',
      dataIndex: 'progress',
      render: (_, record) => {
        return (
          <JanctionSelect
            options={TYPE}
            placeholder="please select type"
            onChange={(e) => onEdit('progress', e, record.id)}
          />
        );
      },
    },
    {
      title: 'capacity',
      dataIndex: 'cpu_usage',
      render: (_, record) => {
        return (
          <JanctionRange onChange={(e) => onEdit('cpu_usage', e, record.id)} />
        );
      },
    },
    {
      title: 'quantity',
      dataIndex: 'energy',
      render: (_, record) => {
        return (
          <JanctionRange onChange={(e) => onEdit('energy', e, record.id)} />
        );
      },
    },
    {
      title: 'architecture - classification',
      dataIndex: 'disk_usage',
    },
    {
      title: 'operate',
      dataIndex: 'uptime',
      render: (text, record) => {
        return <a onClick={() => onDelete(record.id)}>delete</a>;
      },
    },
  ];

  return (
    <JanctionTable
      bordered={false}
      columns={columns}
      dataSource={list}
      pagination={false}
      footer={() => (
        <div className={styles['janction-table-footer']}>
          <a href="#" onClick={onAdd}>
            <PlusOutlined />
            <span>Add data disk</span>
          </a>
          <span>You can also add 18 data disks</span>
        </div>
      )}
    />
  );
};

export default Storage;
