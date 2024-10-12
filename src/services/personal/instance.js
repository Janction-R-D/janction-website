import { request } from 'umi';

const baseUrl = '/v0';

export const fetchNodeList = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/list`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return [];
  }
};

export const fetchTerminal = async (params) => {
  try {
    const response = await request(`${baseUrl}/webshell/terminal.html`, {
      params,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return [];
  }
};
