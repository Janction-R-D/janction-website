import Papa from 'papaparse';
// exportToCsv function is used to export data to csv file
const exportToCsv = (columns, data) => {
  // Crear un array para las cabeceras basado en las columnas
  const headers = columns.map((column) => column.title);

  // Crear un array para los datos basado en las columnas y filas
  const csvData = data.map((row) => {
    return columns.map((column) => row[column.dataIndex]);
  });

  // Incluir las cabeceras al principio del array de datos
  csvData.unshift(headers);

  const tsv = Papa.unparse(csvData, {
    delimiter: '--',
  });
  const blob = new Blob([tsv], {
    type: 'text/tab-separated-values;charset=utf-8;',
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', 'table-data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
