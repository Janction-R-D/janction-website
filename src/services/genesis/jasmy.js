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

/**
 * JCT签名接口
 * @param {Object} data - 请求数据
 * @param {number} data.jct - JCT数量
 * @returns {Promise} 返回签名结果
 */
export const fetchJctSign = (data) => {
  return request(`${baseUrl}/user/jct/sign`, {
    method: 'POST',
    loginAuth: true,
    data,
  });
};

/**
 * 查询可领的空投
 * @returns {Promise} 返回空投信息
 */
export const fetchJctAirdrop = () => {
  return request(`${baseUrl}/user/jct/airdrop`, {
    loginAuth: true,
  });
};
