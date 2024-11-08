import { request } from 'umi';

const baseUrl = '/v0/';

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
    const response = await request(`${baseUrl}resource/operate`, {
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
    const response = await request(`${baseUrl}market/orders`, {
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
    const response = await request(`${baseUrl}user/center`, {
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
    const response = await request(`${baseUrl}user/securities`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
export const deleteKeysUserCenter = async (data) => {
  const { id } = data;
  try {
    const response = await request(`${baseUrl}user/security?id=${id}`, {
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

//fetch ConfigInfo
export const fetchConfigInfo = async (data) => {
  const id = data;

  try {
    const response = await request(`${baseUrl}node/config?node_id=${id}`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
// fetchPost ConfigInfo
export const postConfigInfo = async (data) => {
  try {
    const response = await request(`${baseUrl}node/config`, {
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
    return null;
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
