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
    price: 'N/A', // Si hay un precio disponible, puedes ajustarlo aquí
  }));
}

export const getDurationUnit = (number) => {
  const unitObj = DURATION_OPTIONS.find((item) => item.value === number);
  console.log(unitObj, number);
  return unitObj ? unitObj.label : 'Unknown';
};
