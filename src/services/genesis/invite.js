import { request } from 'umi';

const baseUrl = '/v0';

/**
 *Generate invite link
 */
export const fetchInviteLink = async (body) => {
  return request(`${baseUrl}/aff/generate`, {
    method: 'POST',
    body,
    loginAuth: true,
  });
};

/**
 *Generate invite link
 * @property {string} Query email
 */
export const fetchInviteSend = (data) => {
  return request(`${baseUrl}/aff/send`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

/**
 *accept invite link
 * @property {string} Query email
 */
// export const fetchInviteAccept = (data) => {
//   return request(`${baseUrl}/affv2/invitation/accept`, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     loginAuth: true,
//   });
// };

export const fetchInviteAccept = async (data) => {
  try {
    const response = await request(`${baseUrl}/affv2/invitation/accept`, {
      method: 'POST',
      body: JSON.stringify(data),
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return error;
  }
};
export const fetchInviteVerify = async (code) => {
  try {
    const response = await request(`${baseUrl}/affv2/invitation?code=${code}`);
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};
