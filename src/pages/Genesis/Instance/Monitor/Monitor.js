import React, { useMemo, useState } from 'react';
import InstanceMonitor from '@/components/InstanceMonitor';
import { formatISODate } from '@/utils/datetime';
import { isExpired } from '@/utils/lang';
import { Pagination } from 'antd';
import JactionEmpty from '@/components/JactionEmpty';
import { isEmpty } from 'lodash';
export default function Monitor({ filteredInstance, getAllNodes, styles }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const mappedOrders = useMemo(() => {
    return filteredInstance?.map((instance) => ({
      ...instance,
      isExpired: isExpired(instance.expired_at),
      isTerminated: instance?.is_terminated,
      isAllowed: !instance?.is_terminated && !instance?.refund,
    }));
  }, [filteredInstance]);

  const notExpiredInstances = useMemo(() => {
    return mappedOrders?.filter((order) => !order.isExpired && order.isAllowed);
  }, [mappedOrders]);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return notExpiredInstances?.slice(start, start + pageSize);
  }, [filteredInstance, currentPage, pageSize]);
  return (
    <>
      <>
        {!isEmpty(paginatedData) && (
          <>
            {paginatedData?.map((instance, index) => (
              <InstanceMonitor
                key={index}
                instance={instance}
                getAllNodes={getAllNodes}
              />
            ))}
            <div className={styles['pagination-wrapper']}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={notExpiredInstances.length}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                showLessItems
              />
            </div>
          </>
        )}
      </>
      {isEmpty(paginatedData) && (
        <JactionEmpty description="There are no instances currently, please add an instance." />
      )}
    </>
  );
}
