import Column from "@/interface/Column";
import * as XLSX from 'xlsx';

export default class FrequencySheet {

    static getDaysOfMonth(date: Date): { [key: number]: string } {
        const daysOfWeek = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    
        // Pega o ano e o mês da data fornecida
        const year = date.getFullYear();
        const month = date.getMonth();
    
        // Pega o número de dias no mês (último dia do mês)
        const lastDay = new Date(year, month + 1, 0).getDate();
    
        // Cria o objeto que armazenará o dia e o dia da semana
        const daysOfMonth: { [key: number]: string } = {};
    
        // Itera pelos dias do mês e mapeia o dia da semana correspondente
        for (let day = 1; day <= lastDay; day++) {
            const currentDay = new Date(year, month, day);
            const dayOfWeek = currentDay.getDay(); // Pega o índice do dia da semana
            daysOfMonth[day] = daysOfWeek[dayOfWeek]; // Atribui o nome do dia da semana
        }
    
        return daysOfMonth;
    }

    static async createAttendanceSheet(date: Date) {
        let day_of_month = FrequencySheet.getDaysOfMonth(date)

        // Criar uma nova planilha
        const wb = XLSX.utils.book_new();
        const ws_data: any[][] = [];

        // Inicializar a planilha com células vazias e fundo branco
        for (let row = 0; row < 67; row++) {
            ws_data[row] = new Array(20).fill('');
        }

        // Preencher com os cabeçalhos e formatação específica
        ws_data[6][5] = '29 - SECRETARIA MUNICIPAL DE URBANISMO E LICENCIAMENTO';
        ws_data[8][2] = 'FOLHA DE FREQUÊNCIA INDIVIDUAL - F. F. I.';

        // Adicionar o cabeçalho
        const ws = XLSX.utils.aoa_to_sheet(ws_data);

        // Configurar as colunas
        ws['!cols'] = Array(20).fill({ width: 10 });

        // Mesclar células
        const merges: XLSX.Range[] = [
            { s: { r: 6, c: 5 }, e: { r: 6, c: 15 } }, // F7:P7
            { s: { r: 8, c: 2 }, e: { r: 9, c: 17 } }, // C9:R10
            { s: { r: 11, c: 2 }, e: { r: 11, c: 17 } }, // C12:R12
            { s: { r: 12, c: 2 }, e: { r: 12, c: 5 } }, // C13:F13
            { s: { r: 12, c: 6 }, e: { r: 12, c: 17 } }, // G13:R13
            { s: { r: 13, c: 2 }, e: { r: 13, c: 17 } }, // C14:R14
            { s: { r: 14, c: 2 }, e: { r: 14, c: 17 } }, // C15:R15
            { s: { r: 15, c: 2 }, e: { r: 15, c: 17 } }, // C16:R16
            { s: { r: 53, c: 2 }, e: { r: 53, c: 17 } }, // C54:R54
            { s: { r: 54, c: 2 }, e: { r: 54, c: 3 } }, // C55:D55
            { s: { r: 54, c: 4 }, e: { r: 54, c: 5 } }, // E55:F55
            { s: { r: 54, c: 6 }, e: { r: 54, c: 7 } }, // G55:H55
            { s: { r: 54, c: 8 }, e: { r: 54, c: 9 } }, // I55:J55
            { s: { r: 54, c: 10 }, e: { r: 54, c: 11 } }, // K55:L55
            { s: { r: 54, c: 12 }, e: { r: 54, c: 13 } }, // M55:N55
            { s: { r: 54, c: 14 }, e: { r: 54, c: 15 } }, // O55:P55
            { s: { r: 54, c: 16 }, e: { r: 54, c: 17 } }, // Q55:R55
            { s: { r: 18, c: 2 }, e: { r: 20, c: 3 } }, // C19:D21 (Dia)
            { s: { r: 19, c: 4 }, e: { r: 20, c: 5 } }, // E20:F21 (Entrada)
            { s: { r: 18, c: 4 }, e: { r: 18, c: 11 } }, // E19:L19 (Horário)
            { s: { r: 19, c: 6 }, e: { r: 19, c: 9 } }, // G20:J20 (Almoço)
            { s: { r: 20, c: 6 }, e: { r: 20, c: 7 } }, // G21:H21 (Saída)
            { s: { r: 20, c: 8 }, e: { r: 20, c: 9 } }, // I21:J21 (Entrada)
            { s: { r: 19, c: 10 }, e: { r: 20, c: 11 } }, // K20:L21 (Saída)
            { s: { r: 18, c: 12 }, e: { r: 20, c: 14 } }, // M19:O21 (Assinatura)
            { s: { r: 18, c: 15 }, e: { r: 20, c: 17 } }  // P19:R21 (Observações)
        ];

        // Adicionar as mesclagens à planilha
        ws['!merges'] = merges;

        // Estilo das células
        const cellStyle = {
            font: { bold: true, sz: 12 },
            fill: { fgColor: { rgb: 'FFFFFF' } },
            alignment: { vertical: 'center', horizontal: 'center' },
            border: { 
                top: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
            }
        };

        // Estilo das células cinza
        const grayCellStyle = {
            font: { bold: true, sz: 12 },
            fill: { fgColor: { rgb: '808080' } },
            alignment: { vertical: 'center', horizontal: 'center' },
            border: { 
                top: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
            }
        };

        // Adicionar valores e formatação para células específicas
        ws['C19'].v = 'Dia';
        ws['E20'].v = 'ENTRADA';
        ws['E19'].v = 'HORÁRIO';
        ws['G20'].v = 'ALMOÇO';
        ws['G21'].v = 'SAÍDA';
        ws['I21'].v = 'ENTRADA';
        ws['K20'].v = 'SAÍDA';
        ws['M19'].v = 'ASSINATURA';
        ws['P19'].v = 'OBSERVAÇÕES';

        // Aplicar estilo cinza e fonte negrito tamanho 12
        ws['C19'].s = grayCellStyle;
        ws['E20'].s = grayCellStyle;
        ws['E19'].s = grayCellStyle;
        ws['G20'].s = grayCellStyle;
        ws['G21'].s = grayCellStyle;
        ws['I21'].s = grayCellStyle;
        ws['K20'].s = grayCellStyle;
        ws['M19'].s = grayCellStyle;
        ws['P19'].s = grayCellStyle;

        // Definir os textos e formatações solicitados
        ws['C12'].v = 'NOME:';
        ws['C12'].s = {
            font: { bold: true, size: 12 },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };
        ws['C13'].v = 'RF:';
        ws['C13'].s = {
            font: { bold: true, size: 12 },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };
        ws['G13'].v = 'VÍNCULO:';
        ws['G13'].s = {
            font: { bold: true, size: 12 },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };
        ws['C14'].v = 'EH:';
        ws['C14'].s = {
            font: { bold: true, size: 12 },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };
        ws['C15'].v = 'UNIDADE:';
        ws['C15'].s = {
            font: { bold: true, size: 12 },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };
        ws['C16'].v = 'MÊS / ANO REFERÊNCIA:';
        ws['C16'].s = {
            font: { bold: true, size: 12 },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };

        // Adicionar cabeçalhos da linha 55 e bordas
        const labels = [
            { range: 'H17:N17', value: 'HORÁRIO: ____:____ ás ____:____' },
            { range: 'C54:R54', value: 'APONTAMENTO' },
            { range: 'C55:D55', value: 'EVENTO' },
            { range: 'E55:F55', value: 'INÍCIO' },
            { range: 'G55:H55', value: 'FINAL' },
            { range: 'I55:J55', value: 'QUANT.' },
            { range: 'K55:L55', value: 'EVENTO' },
            { range: 'M55:N55', value: 'INÍCIO' },
            { range: 'O55:P55', value: 'FINAL' },
            { range: 'Q55:R55', value: 'QUANT.' },
            { range: 'H63:M63', value: '______________________________________________' },
            { range: 'H64:M64', value: 'Carimbo e assinatura da Chefia Imediata' },
        ];

        labels.forEach(label => {
            const [start, end] = label.range.split(':');
            const cell = ws[start];
            cell.v = label.value;
            cell.s = grayCellStyle; // Aplicar estilo cinza para cabeçalhos
        });

        // Adicionar os dias do mês
        for (let day = 1; day <= Object.keys(day_of_month).length; day++) {
            const row = 21 + day;
            ws[`C${row}`] = { v: day.toString(), s: cellStyle };
        
            // Criar uma data para o dia atual
            const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        
            // Verificar se é sábado (6) ou domingo (0)
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 6 || dayOfWeek === 0) {
                ws[`C${row}`].s = grayCellStyle;
        
                // Mesclar as colunas de E até R e preencher com o valor "sábado" ou "domingo"
                merges.push({ s: { r: row - 1, c: 4 }, e: { r: row - 1, c: 17 } });
                ws[`E${row}`] = { v: dayOfWeek === 6 ? 'sábado' : 'domingo', s: grayCellStyle };
            }
        }

        // Salvar o arquivo
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const fileName = `folha_de_frequencia_${month}_${year}.xlsx`;
        
        XLSX.utils.book_append_sheet(wb, ws, 'Frequência');
        XLSX.writeFile(wb, fileName);
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