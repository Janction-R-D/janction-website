import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

/**
 *Generate invite link
 */
export const fetchInviteLink = (body) => {
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
export const fetchInviteAccept = (data) => {
  return request(`${baseUrl}/affv2/invitation/accept`, {
    method: 'POST',
    body: JSON.stringify(data),
    loginAuth: true,
  });
};
export const fetchInviteVerify = (code) => {
  return request(`${baseUrl}/affv2/invitation?code=${code}`);
};

export const fetchPaymentUpdate = (data) => {
  return request(`${baseUrl}/affv2/payment_record`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
