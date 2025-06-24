import { useEffect, useState } from 'react';
import ResourcesHeader from './components/ResourcesHeader';
import styles from './index.less';
import { Button, Divider, Skeleton } from 'antd';
import useLesses from '../Dashboard3/Hooks/useLesses';
import ModalUpload from './components/UploadCard/ModalUpload';
import {
  fetchNodeList,
  fetchSingleResource,
  fetchUserConfig,
} from '@/services/genesis';
import QuickCard from '@/components/QuickCard/QuickCard';
import InstanceMonitor from '@/components/InstanceMonitor';
import InstanceTable from './components/Table/instanceTable';
import { empty } from '@/utils/lang';
import { isEmpty } from 'lodash';
// import InstanceMonitor from './components/InstanceMonitor';

export default function Lessee() {
  const [avModalOpen, setAvModaOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [resource, setResource] = useState([]);
  const [last, setLast] = useState({});
  const [loading, setLoading] = useState(false);

  const [userConf, setUserConf] = useState({});

  const { lessesData } = useLesses();

  useEffect(() => {
    getUserConfig();
    getAllNodes();
  }, []);
  const getUserConfig = async () => {
    try {
      setLoading(true);
      const res = await fetchUserConfig();
      setUserConf(res);
      if (res?.last_resource_visited) {
        await getLastVisit(res?.last_resource_visited);
      }
      if (!res?.default_avatar_status && res?.pass_newbie_guide) {
        setAvModaOpen(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const getAllNodes = () => {
    fetchNodeList()
      .then((res) => {
        setSummary(res?.summary || null);
        setResource(res?.resources || []);
      })
      .catch((err) => console.log(err));
  };
  const getLastVisit = async (id) => {
    try {
      const { resource } =
        (await fetchSingleResource({ resource_id: id })) || {};
      setLast(resource || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles['dashboard-wrapper']}>
      {/* <ModalUpload
        avModalOpen={avModalOpen}
        handleOk={handleOk}
        setAvModaOpen={setAvModaOpen}
        userConf={userConf}
        setUserConf={setUserConf}
      /> */}
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Dashboard</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>GPU rental service with stable </p>
            <p>service and reasonable price</p>
          </span>
        </header>
      </section>
      <section className={styles['header-resources']}>
        <ResourcesHeader summary={summary} />
      </section>
      <main className={styles['cards-container']}>
        {loading && (
          <>
            <p className={styles['title']}>Last visit</p>
            <div className={styles['video-col']}>
              <Skeleton.Avatar className={styles['custom-skeleton-1']} active />
            </div>
          </>
        )}

        {!loading && !isEmpty(last) && (
          <>
            <p className={styles['title']}>Last visit</p>
            <section className={styles['card-monitor']}>
              <InstanceMonitor instance={last} />
            </section>
          </>
        )}
        <p className={styles['title']}>Last purchased instances</p>
        <InstanceTable
          data={resource}
          getAllNodes={getAllNodes}
          loading={loading}
        />
      </main>
    </main>
  );
}
