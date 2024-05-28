import Papa from 'papaparse';
import { utils, write } from 'xlsx';

export function exportToCsv(data, columns) {
  const csv = Papa.unparse({
    fields: columns,
    data: data
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, 'export.csv');
}

export function exportToExcel(data, columns) {
  // Create a worksheet from the data
  const worksheet = utils.json_to_sheet(data, { header: columns });
  // Create a new workbook
  const workbook = utils.book_new();
  // Append the worksheet to the workbook
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Convert workbook to binary to create a Blob
  const wbout = write(workbook, { bookType: 'xlsx', type: 'binary' });
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

  downloadBlob(blob, 'export.xlsx');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
