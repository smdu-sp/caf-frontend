import * as XLSX from 'xlsx';

export default class Default {
  // Função para processar o arquivo (xlsx ou csv) e transformá-lo em JSON
  static async processFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Verifica se o arquivo é xlsx ou csv
      const isXlsx = file.name.endsWith('.xlsx');
      const isCsv = file.name.endsWith('.csv');

      reader.onload = (event) => {
        if (isXlsx) {
          // Para arquivos .xlsx
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Tipar jsonData corretamente como qualquer tipo de array
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const headers = jsonData[0]; // Cabeçalhos
          const rows = jsonData.slice(1); // Dados

          // Mapear os dados corretamente
          const result = rows.map((row: any[]) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              rowData[header] = row[index] || null;
            });
            return rowData;
          });
          resolve(result);
        } else if (isCsv) {
          // Para arquivos .csv
          const csvData = event.target?.result as string;
          const workbook = XLSX.read(csvData, { type: 'string' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];

          // Tipar jsonData corretamente como qualquer tipo de array
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const headers = jsonData[0]; // Cabeçalhos
          const rows = jsonData.slice(1); // Dados

          const result = rows.map((row: any[]) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              rowData[header] = row[index] || null;
            });
            return rowData;
          });
          resolve(result);
        } else {
          reject(new Error('Formato de arquivo não suportado. Use .xlsx ou .csv.'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      if (isXlsx) {
        reader.readAsArrayBuffer(file);
      } else if (isCsv) {
        reader.readAsText(file);
      }
    });
  }
}
