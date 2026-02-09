/**
 * Tevau Hooks统一导出
 * 职责：统一导出所有Tevau相关的Hooks
 *
 * 艹，方便导入使用
 * import { useCardList, useKYCVerification } from '@/hooks/tevau';
 */

export { default as useCardList } from './useCardList';
export { default as useCardApplication } from './useCardApplication';
export { default as useCardUpgrade } from './useCardUpgrade';
export { default as useKYCVerification } from './useKYCVerification';
export { default as useCardDetail } from './useCardDetail';

export default {
  // 可以在这里添加组合Hook或其他辅助函数
};
