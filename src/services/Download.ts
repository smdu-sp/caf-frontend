// Importar bibliotecas necessárias
import { parse } from 'json2csv';
import * as XLSX from 'xlsx';
import Row from '@/interface/Row'

// Serviço de download
export default class DownloadService {
    // Função para converter dados para CSV
    static to_CSV(rows: Row[], campos: string[]): string {
        if (rows.length === 0) return '';

        const opts = {
            fields: campos
        };

        try {
            const csv = parse(rows, opts);
            return csv;
        } catch (err) {
            console.error('Erro ao converter para CSV:', err);
            return '';
        }
    }

    // Função para gerar o XLSX
    static to_XLSX(rows: Row[]): XLSX.WorkBook {
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        return wb;
    }

    // Função para baixar o CSV
    static downloadCSV(rows: Row[], campos: string[], filename: string): void {
        const csv = this.to_CSV(rows, campos);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Função para baixar o XLSX
    static downloadXLSX(rows: Row[], filename: string): void {
        const wb = this.to_XLSX(rows);
        XLSX.writeFile(wb, filename);
        console.log(wb)
    }
}
