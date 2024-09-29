import Papa from 'papaparse';
// exportToCsv function is used to export data to csv file
const exportToCsv = (columns, data) => {
  const headers = columns.map((column) => column.title);

  const csvData = data.map((row) => {
    return columns.map((column) => row[column.dataIndex]);
  });

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
