import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { isEmpty } from '@/utils/lang';
import JactionEmpty from '@/components/JactionEmpty';
import numeral from 'numeral';
import styles from '../index.less';
export function Graph({ data }) {
  const echartsData = useMemo(() => {
    if (isEmpty(data))
      return {
        keys: [],
        values: [],
      };

    const keys = Object.keys(data || {});
    const rawValues = Object.values(data || {});

    // Crate an array with the cumulative values
    const cumulativeValues = rawValues.reduce((acc, value, index) => {
      if (index === 0) {
        acc.push(value); // first value is the same
      } else {
        acc.push(acc[index - 1] + value); // add the previous value to the current value
      }
      return acc;
    }, []);

    return {
      keys,
      values: cumulativeValues,
    };
  }, [data]);
  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().slice(0, 9);
    return [formattedDate, formattedTime];
  }
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const date = params[0].name;
        const formatDate = formatDateTime(date);
        const price = params[0].value;

        return `<div style="display:flex; justify-content:space-between;gap:18px; font-size:.7rem;">
        <span>${formatDate[0]}</span> 
        <span>${
          formatDate[1]
        }</span> </div> <hr style="opacity: 0.5;"/>  <strong style="display:flex; justify-content:space-between;gap:12px;font-size:.7rem;">Number: <span">${numeral(
          price,
        ).format('0.000')}</span> </strong>`;
      },

      padding: [10],
      borderRadius: 8,
      label: {
        backgroundColor: '#19191A',
        borderColor: 'black',
      },
      borderWidth: 0,
      backgroundColor: 'black',

      textStyle: {
        color: '#ffffff', // Cambia el color del texto
        fontFamily: 'Arial, sans-serif', // Opcional: fuente
      },
    },
    xAxis: {
      type: 'category',
      data: echartsData.keys,

      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        data: echartsData.values,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 170, 255, 1)' },
              { offset: 1, color: 'rgba(0, 170, 255, 0)' },
            ],
            global: false,
          },
        },
        type: 'line',
      },
    ],
  };

  return (
    <>
      <div className={styles['graph-profit']}>
        {echartsData?.keys?.length > 0 ? (
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
          />
        ) : (
          <JactionEmpty showEmptyIcon />
        )}
      </div>
    </>
  );
}
