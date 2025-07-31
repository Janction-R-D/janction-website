import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

/**
 * Webshell demo，websockt
 * @property {string} Query resource_id
 */
export const fetchTerminal = (params) => {
  return request(`${baseUrl}/webshell/terminal.html`, {
    params,
    loginAuth: true,
  });
};

/**
 * List rentable nodes
 */
export const fetchNodeList = () => {
  return request(`${baseUrl}/resource/dashboard`, {
    loginAuth: true,
  });
};

/**
 *
 *operation POST
 */
export const fetchNodeOperation = (params) => {
  return request(`${baseUrl}/resource/operate`, {
    method: 'POST',
    body: params,
    loginAuth: true,
  });
};

/**
 * Buyers */

export const fetchLessesData = () => {
  return request(`${baseUrl}/dashboard/tenant`, {
    loginAuth: true,
  });
};

/**
 * List the resources that have been rented.
 */
export const fetchResouceList = () => {
  return request(`${baseUrl}/resource/list`, {
    loginAuth: true,
  });
};

export const fetchCreateOrders = (data) => {
  return request(`${baseUrl}/market/create`, {
    method: 'POST',
    loginAuth: true,
    data: data,
  });
};
export const fetchPaymentOrder = (data) => {
  return request(`${baseUrl}/market/payment`, {
    method: 'POST',
    loginAuth: true,
    data: data,
  });
};

export const fetchMarketOrders = (data) => {
  return request(`${baseUrl}/market/orders`, {
    loginAuth: true,
    params: data,
  });
};

export const fetchMarketOrder = (params) => {
  return request(`${baseUrl}/market/order`, {
    loginAuth: true,
    params: params,
  });
};
/**
 * @property {string} Query resource_id
 */
export const fetchResouceLogs = (params) => {
  return request(`${baseUrl}/resource/logs`, {
    loginAuth: true,
  });
};

/**
 * Listen to real-time logs
 * @property {string} Query resource_id
 */
export const fetchResouceLogWatch = (params) => {
  return request(`${baseUrl}/resource/logwatch`, {
    loginAuth: true,
  });
};

/**
 * Get detail in Terminal Demo
 * @property {string} Query resource_id
 */
export const fetchResouceShell = (params) => {
  return request(`${baseUrl}/resource/shell`, {
    loginAuth: true,
  });
};
//user center data
export const fetchUserCenter = () => {
  return request(`${baseUrl}/user/center`, {
    loginAuth: true,
  });
};

//fetch all avatar
export const fetchUserAvatars = () => {
  return request(`${baseUrl}/user/avatars`, {
    loginAuth: true,
  });
};

export const fetchUserKeys = () => {
  return request(`${baseUrl}/user/securities`, {
    loginAuth: true,
  });
};
export const deleteKeysUserCenter = (data) => {
  const { id } = data;

  return request(`${baseUrl}/user/security?id=${id}`, {
    method: 'DELETE',
    loginAuth: true,
    body: JSON.stringify(data),
  });
};
export const sendImageToServer = (params) => {
  return request(`${baseUrl}/user/update`, {
    loginAuth: true,
    method: 'POST',
    data: params,
  });
};
export const postImageToServer = (formData) => {
  return request(`${baseUrl}/user/upload/avatar`, {
    loginAuth: true,
    method: 'POST',
    body: formData,
  });
};
export const fetchImageToServer = (address) => {
  return request(`${baseUrl}/user/avatar/${address}`, {
    loginAuth: true,
  });
};
// Function to post data to user center
export const postKeyUserData = (data) => {
  return request(`${baseUrl}/user/security`, {
    method: 'POST',
    loginAuth: true,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Function to set monthly goal
export const MonthlyGoal = (data) => {
  return request(`${baseUrl}/user/config`, {
    method: 'PUT',
    loginAuth: true,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
// Fetch user config
export const fetchUserConfig = (params) => {
  return request(`${baseUrl}/user/config`, {
    loginAuth: true,
    params,
  });
};
export const changeUserConfig = (data) => {
  return request(`${baseUrl}/user/config`, {
    method: 'PUT',
    loginAuth: true,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const updateUserConfig = (data) => {
  return request(`${baseUrl}/user/config`, {
    method: 'PATCH',
    loginAuth: true,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

//fetch ConfigInfo
export const fetchNodesConfigInfo = (params) => {
  return request(`${baseUrl}/node/config`, {
    loginAuth: true,
    params,
  });
};
export const fetchNodesPrice = (data) => {
  return request(`${baseUrl}/market/price`, {
    loginAuth: true,
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// fetchPost ConfigInfo
export const fetchNodesConfigUpdate = (data) => {
  return request(`${baseUrl}/node/config`, {
    loginAuth: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
export const fetchNodesConfigDelete = (params) => {
  return request(`${baseUrl}/node/config`, {
    method: 'DELETE',
    data: params,
    loginAuth: true,
  });
};
// List rent records
export const fetchMarketList = () => {
  return request(`${baseUrl}/market/list`, {
    loginAuth: true,
  });
};

/**
 * @property {string} node_id example: 984e1423-c41e-4761-9723-eea678416d1e
 */
export const fetchMarketRent = (params) => {
  return request(`${baseUrl}/market/rent`, {
    method: 'POST',
    data: params,
    loginAuth: true,
  });
};

/**
 * @property {string} node_id example: 984e1423-c41e-4761-9723-eea678416d1e
 */
export const fetchMarketRelease = (params) => {
  return request(`${baseUrl}/market/release`, {
    method: 'DELETE',
    body: params,
    loginAuth: true,
  });
};

// Create Payment
export const fetchBillingPayment = (params) => {
  return request(`${baseUrl}/billing/payment`, {
    method: 'POST',
    body: params,
    loginAuth: true,
  });
};

// List bills
export const fetchBillingList = (params) => {
  return request(`${baseUrl}/billing/list`, {
    params,
    loginAuth: true,
  });
};
export const fetchNodePoints = (params) => {
  return request(`${baseUrl}/user/profit`, {
    params,
    loginAuth: true,
  });
};

export const fetchNodesRegister = (data) => {
  return request(`${baseUrl}/node/register`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

export const fetchNodesInfo = (params) => {
  return request(`${baseUrl}/node/info`, {
    params,
    loginAuth: true,
  });
};
// market info , my wallet
export const fetchMarketInfo = (params) => {
  return request(`${baseUrl}/market/income`, {
    loginAuth: true,
  });
};

export const fetchNodesList = (params) => {
  return request(`${baseUrl}/node/list`, {
    params,
    loginAuth: true,
  });
};

export const fetchNodesRefresh = (data) => {
  return request(`${baseUrl}/node/refresh`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

export const fetchNodesDelete = (data) => {
  return request(`${baseUrl}/node/detach`, {
    method: 'DELETE',
    data,
    loginAuth: true,
  });
};

export const fetchNodeProcessers = (params) => {
  return request(`${baseUrl}/node/processers`, {
    params,
    loginAuth: true,
  });
};
export const fetchNft = (id) => {
  return request(`${process.env.ASSETS_URL}/${id}`);
};

export const fetchStopRentParams = (data) => {
  return request(`${baseUrl}/market/stop`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

export const fetchListFilter = (data) => {
  return request(`${baseUrl}/node/filter/list`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
export const fetchListOptions = (data) => {
  return request(`${baseUrl}/node/filter/options`, {
    method: 'GET',
    data,
    loginAuth: true,
  });
};

//ssh fecth api
export const fetchSshInsert = (data) => {
  return request(`${baseUrl}/resource/ssh/insert`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
export const fetchSshList = (data) => {
  return request(`${baseUrl}/resource/ssh`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
//ssh fecth api
export const fetchResource = (params) => {
  return request(`${baseUrl}/resource/routes`, {
    params,
    loginAuth: true,
  });
};
export const fetchResourceTunnel = (params) => {
  return request(`${baseUrl}/resource/tunnel/status`, {
    params,
    loginAuth: true,
  });
};
export const PostResourceTunnel = (data) => {
  return request(`${baseUrl}/resource/tunnel/update`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

//statistic resource data
export const fetchStatistic = (data) => {
  return request(`${baseUrl}/resource/statistics`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
//get templates

export const fetchTemplates = async (params) => {
  try {
    return await request(`${baseUrl}/resource/template/list`, {
      params,
      loginAuth: true,
    });
  } catch (error) {
    return error;
  }
};

export const fetchSingleResource = (params) => {
  return request(`${baseUrl}/resource/detail`, {
    params,
    loginAuth: true,
  });
};
export const fetchAgentStatus = (id) => {
  return request(`${baseUrl}/agent/kb/${id}`, {
    loginAuth: true,
  });
};
export const taskList = (id) => {
  return request(`${baseUrl}/task/list`, {
    loginAuth: true,
  });
};
export const fetchAgentDelete = (id) => {
  return request(`${baseUrl}/agent/agents/${id}`, {
    method: 'DELETE',
    loginAuth: true,
  });
};

//node tag data
export const fetchNodeTag = (data) => {
  return request(`${baseUrl}/node/name`, {
    method: 'PUT',
    data,
    loginAuth: true,
  });
};
