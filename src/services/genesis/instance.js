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
