import { request } from 'umi';

const baseUrl = '/api/v1/node';

export const fetchRuningNodes = async (params) => {
  try {
    const response = await request(`${baseUrl}/runingNodes`, {
      params,
      loginAuth: true,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return {
      totalNodes: 2035454,
      liveNodes: 11294,
      totoalComputerHours: 121243,
    };
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchSystemInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/systemInfo`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return [
      { value: 800, name: 'A' },
      { value: 635, name: 'B' },
      { value: 580, name: 'C' },
      { value: 484, name: 'D' },
    ];
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchNodesList = async (params) => {
  try {
    const response = await request(`${baseUrl}/nodesList`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return {
      total: 100,
      list: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '4',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '5',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '6',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '7',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '8',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '9',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
        {
          key: '10',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          chipOrGpu: 'Geforce Rtx 3060 ti',
        },
      ],
    };
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};
