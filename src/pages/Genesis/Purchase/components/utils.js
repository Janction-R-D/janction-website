import { DURATION_OPTIONS } from '@/constant';

export function getTableData(data) {
  return data?.map((node) => ({
    user_id: node?.user_id,
    id: node?.id ?? 'unknown',
    operatingSystem: node?.attr?.operating_system_str || 'unknown',
    architecture: node?.attr?.architechture_str || 'unknown',
    connectivity:
      node?.attr?.network_up !== undefined &&
      node?.attr?.network_down !== undefined
        ? `${node.attr.network_up} / ${node.attr.network_down} Mbps`
        : 'Unknown',
    attr: node?.attr,
    config: node?.node_config,
    internet: node?.status_str ?? 'unknown',
    location: node?.attr?.location ?? 'unknown',
    process: {
      name:
        node?.attr?.cpu_chip?.length > 0
          ? node.attr.cpu_chip?.[0] + '*' + node.attr.cpu_chip.length
          : 'Unknown',
      model:
        node?.attr?.cpu !== undefined ? `${node.attr.cpu} Cores` : 'Unknown',
    },
    price: 'N/A',
    config: node?.node_config,
    memory:
      node?.attr?.memory !== undefined ? `${node.attr.memory} GB` : 'Unknown',
    is_support_stripe: node?.is_support_stripe,
  }));
}

export const getDurationUnit = (number) => {
  const unitObj = DURATION_OPTIONS.find((item) => item.value === number);
  return unitObj ? unitObj.label : 'Unknown';
};
