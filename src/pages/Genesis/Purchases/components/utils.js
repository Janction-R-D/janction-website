export function getTableData(data) {
  return data?.map((node) => ({
    id: node?.id ?? 'unknown',
    operatingSystem: node?.attr?.operating_system_str ?? 'Unknown',
    architecture: node?.attr?.architechture_str ?? 'Unknown',
    connectivity:
      node?.attr?.network_up !== undefined &&
      node?.attr?.network_down !== undefined
        ? `${node.attr.network_up} / ${node.attr.network_down} Mbps`
        : 'Unknown',
    internet: node?.status_str ?? 'Unknown',
    location: node?.attr?.location ?? 'Unknown',
    process: {
      name:
        node?.attr?.cpu_chip?.length > 0
          ? node.attr.cpu_chip.join(', ')
          : 'Unknown',
      model:
        node?.attr?.cpu !== undefined ? `${node.attr.cpu} Cores` : 'Unknown',
    },
    price: 'N/A', // Si hay un precio disponible, puedes ajustarlo aquí
  }));
}
