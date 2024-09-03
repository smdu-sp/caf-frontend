import Column from "@/interface/Column";
import * as fs from 'fs'
import * as XLSX from 'xlsx'

export default class FrequencySheet {

    static async createAttendanceSheet(filePath: string): Promise<void> {
        console.log('passou') 
        const workbook = XLSX.readFile('portal/src/services/Pasta.xlsx');
        console.log(workbook) 
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