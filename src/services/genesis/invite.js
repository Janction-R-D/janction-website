import { request } from 'umi';

const baseUrl = 'https://janction.fdkevin.cloud:8443/v0';

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
