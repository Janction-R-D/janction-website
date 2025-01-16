import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { isEmpty } from '@/utils/lang';
import JactionEmpty from '@/components/JactionEmpty';
import numeral from 'numeral';

export function Graph2({ data }) {
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

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const date = params[0].name;
        const price = params[0].value;
        return `Time: ${date}<br/>Number: ${numeral(price).format('0.000')}`;
      },
      label: {
        backgroundColor: '#19191A',
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
      {echartsData?.keys?.length > 0 ? (
        <div
          style={{
            height: '220px',
            width: '60%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '90%' }}
          />
        </div>
      ) : (
        <JactionEmpty showEmptyIcon />
      )}
    </>
  );
}
