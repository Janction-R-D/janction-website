import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

/**
 * Webshell demo，websockt
 * @property {string} Query resource_id
 */
export const fetchTerminal = async (params) => {
  try {
    const response = await request(`${baseUrl}/webshell/terminal.html`, {
      params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 * List rentable nodes
 */
export const fetchNodeList = async () => {
  try {
    const response = await request(`${baseUrl}/resource/dashboard`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 *
 *operation POST
 */
export const fetchNodeOperation = async (params) => {
  console.log(params);
  try {
    const response = await request(`${baseUrl}/resource/operate`, {
      method: 'POST',
      body: params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 * Buyers */

export const fetchLessesData = async () => {
  try {
    const response = await request(`${baseUrl}/dashboard/tenant`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 * List the resources that have been rented.
 */
export const fetchResouceList = async () => {
  try {
    const response = await request(`${baseUrl}/resource/list`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

export const fetchMarketOrders = async () => {
  try {
    const response = await request(`${baseUrl}/market/orders`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
/**
 * @property {string} Query resource_id
 */
export const fetchResouceLogs = async (params) => {
  try {
    const response = await request(`${baseUrl}/resource/logs`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 * Listen to real-time logs
 * @property {string} Query resource_id
 */
export const fetchResouceLogWatch = async (params) => {
  try {
    const response = await request(`${baseUrl}/resource/logwatch`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 * Get detail in Terminal Demo
 * @property {string} Query resource_id
 */
export const fetchResouceShell = async (params) => {
  try {
    const response = await request(`${baseUrl}/resource/shell`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
//user center data
export const fetchUserCenter = async () => {
  try {
    const response = await request(`${baseUrl}/user/center`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
export const fetchUserKeys = async () => {
  try {
    const response = await request(`${baseUrl}/user/securities`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};
export const deleteKeysUserCenter = async (data) => {
  const { id } = data;
  try {
    const response = await request(`${baseUrl}/user/security?id=${id}`, {
      method: 'DELETE',
      loginAuth: true,
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
export const sendImageToServer = async (params) => {
  try {
    const response = await request(`${baseUrl}/user/update`, {
      loginAuth: true,
      method: 'POST',
      data: params,
    });

    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
export const postImageToServer = async (formData) => {
  try {
    const response = await request(`${baseUrl}/user/upload/avatar`, {
      loginAuth: true,
      method: 'POST',
      body: formData,
    });

    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
export const fetchImageToServer = async (address) => {
  try {
    const response = await request(`${baseUrl}/user/avatar/${address}`, {
      loginAuth: true,
    });

    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
// Function to post data to user center
export const postKeyUserData = async (data) => {
  try {
    const response = await request(`${baseUrl}/user/security`, {
      method: 'POST',
      loginAuth: true,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

// Function to set monthly goal
export const MonthlyGoal = async (data) => {
  try {
    const response = await request(`${baseUrl}/user/config`, {
      method: 'PUT',
      loginAuth: true,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

//fetch ConfigInfo
export const fetchNodesConfigInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/config`, {
      loginAuth: true,
      params,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
// fetchPost ConfigInfo
export const fetchNodesConfigUpdate = async (data) => {
  try {
    const response = await request(`${baseUrl}/node/config`, {
      loginAuth: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};
export const fetchNodesConfigDelete = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/config`, {
      method: 'DELETE',
      data: params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};
// List rent records
export const fetchMarketList = async () => {
  try {
    const response = await request(`${baseUrl}/market/list`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 * @property {string} node_id example: 984e1423-c41e-4761-9723-eea678416d1e
 */
export const fetchMarketRent = async (params) => {
  try {
    const response = await request(`${baseUrl}/market/rent`, {
      method: 'POST',
      data: params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

/**
 * @property {string} node_id example: 984e1423-c41e-4761-9723-eea678416d1e
 */
export const fetchMarketRelease = async (params) => {
  try {
    const response = await request(`${baseUrl}/market/release`, {
      method: 'DELETE',
      body: params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

// Create Payment
export const fetchBillingPayment = async (params) => {
  try {
    const response = await request(`${baseUrl}/billing/payment`, {
      method: 'POST',
      body: params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

// List bills
export const fetchBillingList = async (params) => {
  try {
    const response = await request(`${baseUrl}/billing/list`, {
      params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

export const fetchNodesRegister = async (data) => {
  try {
    const response = await request(`${baseUrl}/node/register`, {
      method: 'POST',
      data,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};

export const fetchNodesInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/info`, {
      params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};
// market info , my wallet
export const fetchMarketInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/market/income`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};

export const fetchNodesList = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/list`, {
      params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};

export const fetchNodesRefresh = async (data) => {
  try {
    const response = await request(`${baseUrl}/node/refresh`, {
      method: 'POST',
      data,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};

export const fetchNodesDelete = async (data) => {
  try {
    const response = await request(`${baseUrl}/node/detach`, {
      method: 'DELETE',
      data,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};

export const fetchNodeProcessers = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/processers`, {
      params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};
export const fetchNft = async (id) => {
  console.log(id);
  try {
    const response = await request(
      `https://pub-da89859eb37b4af0ab4fbec6b5247ec5.r2.dev/${id}`,
    );

    return response;
  } catch (error) {
    console.log('『error』', error);
    throw new Error(`failed, ${error.message}`);
  }
};
