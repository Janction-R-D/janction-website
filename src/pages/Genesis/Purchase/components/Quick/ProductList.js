import React, { useEffect, useState } from 'react';
import Instances from './Instances';
import QuickTable from './QuickTable';
import { fetchListFilter } from '@/services/genesis';
export default function ProductList(props) {
  const { formValues, onChange, isGrid, styles, list, value } = props;

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
        />
      )}
    </>
  );
}
