import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

export const fetchNTFClaimJasmy = () => {
  return request(`${baseUrl}/nft/claim_jasmy`, {
    loginAuth: true,
  });
};

export const fetchNTFClaimJasmyUpdate = (data) => {
  return request(`${baseUrl}/nft/claim_jasmy`, {
    method: 'POST',
    loginAuth: true,
    data,
  });
};
