import Column from "@/interface/Column";
import * as fs from 'fs'
import * as XLSX from 'xlsx'

export default class FrequencySheet {

    static async createAttendanceSheet(filePath: string): Promise<void> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(await fs.openAsBlob('services/Pasta.xlsx'));
        fileReader.onload = async (e) => {
            if (e && e.target) {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, {
                    type: "buffer"
                });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                console.log(data);
            } else {
                console.log('Erro ao ler o arquivo');
            }
        }
      }

    static getColumns(): Column[] {
        return [
            { header: 'RF', accessor: 'registroFuncional', type: 'text' },
            { header: 'Nome', accessor: 'nome', type: 'text' },
            { header: 'Vínculo', accessor: 'vínculo', type: 'text' },
            { header: 'EH', accessor: 'unid', type: 'text' },
            { header: 'Unidade', accessor: 'unid', type: 'text' },
            { header: 'Referência', accessor: 'ref', type: 'text' },
        ] as Column[];
    }
}