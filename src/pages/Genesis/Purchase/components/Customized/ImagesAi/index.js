import { useEffect, useMemo, useState } from 'react';
import { Checkbox, Spin } from 'antd';
import { fetchTemplates } from '@/services/genesis';
import styles from './index.less';
import { debounce } from 'lodash';

const ImagesAi = ({ value, onChange, formValues, current = 5 }) => {
  const [opciones, setOpciones] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (current !== 5) return;

    const payload = {
      frameworks: formValues?.ai_framework?.length
        ? formValues.ai_framework.join(',')
        : null,
      arch:
        formValues?.node?.operatingSystem && formValues?.node?.architecture
          ? `${formValues.node.operatingSystem}/${formValues.node.architecture}`
          : undefined,
    };
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, v]) => v !== null),
    );
    debouncedGetTemplate(filteredPayload);
  }, [formValues?.ai_framework, formValues?.node]);
  useEffect(() => {
    return () => {
      debouncedGetTemplate.cancel();
    };
  }, [debouncedGetTemplate]);
  const obtenerOpciones = async (params) => {
    try {
      setloading(true);
      const respuesta = (await fetchTemplates(params)) || [];
      setOpciones(respuesta);
    } catch (error) {
      console.error('Error :', error);
    } finally {
      setloading(false);
    }
  };
  const debouncedGetTemplate = useMemo(
    () => debounce(obtenerOpciones, 1000),
    [],
  );
  if (loading) {
    return (
      <>
        <p>Loading...</p>
        <Spin tip="Loading options..." />
      </>
    );
  }
  const handleCheckboxChange = (name) => {
    const nuevaSeleccion = value === name ? null : name;
    onChange?.(nuevaSeleccion);
  };

  return (
    <div className={styles['checkbox-grid']}>
      {opciones?.map((item) => (
        <div
          key={item.name}
          className={[
            styles['checkbox-item'],
            value === item.name && styles['active-item'],
          ].join(' ')}
          onClick={() => handleCheckboxChange(item.name)}
        >
          <div className={styles['content']}>{item.name}</div>
          <Checkbox
            checked={value === item.name}
            style={{ visibility: 'hidden' }}
            onChange={() => handleCheckboxChange(item.name)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesAi;
