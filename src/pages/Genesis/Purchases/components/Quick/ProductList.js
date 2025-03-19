import React, { useEffect, useState } from 'react';
import Instances from './Instances';
import QuickTable from './QuickTable';
import { fetchListFilter } from '@/services/genesis';
export default function ProductList(props) {
  const { formValues, onChange, isGrid, styles, list } = props;

  return (
    <div>
      {isGrid ? (
        <Instances
          styles={styles}
          formValues={formValues}
          onChange={onChange}
          data={list}
        />
      ) : (
        <QuickTable formValues={formValues} onChange={onChange} data={list} />
      )}
    </div>
  );
}
