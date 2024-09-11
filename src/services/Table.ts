import Column from '@/interface/Column';
import CompleteTableRow from '@/interface/CompletTableRow'; 
import * as XLSX from 'xlsx';
import * as path from 'path';
import { Row } from '@/interface/Row';

export default class Data {
    // Atualizando a função createData para usar CompleteTableRow
    static createData(
        registroFuncional: string,
        nome: string,	
        vínculo: string,
        espécie?: string,	
        início?: Date,	
        término?: Date,	
        cargo?: string,	
        nomecargo2?: string,	
        ref?: string,	
        unid?: number,	
        nomesetor2?: string,	
        rel_Jur_Adm?: string,
        tipo_evento?: string,	
        início_exerc?: Date,	
        titular?: string,	
        numvinc_tit?: string,	
        nomefunc_tit?: string,	
        início_rem?: Date,	
        fim_rem?: Date,	
        obs?: string,
        vaga?: Date,
    ): CompleteTableRow {
        return {
            registroFuncional,
            nome,
            vínculo,
            espécie,
            início,
            término,
            cargo,
            nomecargo2,
            ref,
            unid,
            nomesetor2,
            rel_Jur_Adm,
            tipo_evento,
            início_exerc,
            titular,
            numvinc_tit,
            nomefunc_tit,
            início_rem,
            fim_rem,
            obs,
            vaga
        };
    }

    static format_filter_rows(updatedFilteredRows: CompleteTableRow[]): Row[] {
        return updatedFilteredRows.map(row => ({
            nome: row.nome,
            registroFuncional: row.registroFuncional,
            vínculo: row.vínculo,
    }));
}
    
    static get_columns_test():Column[] {
        return [
            { header: 'Nome Social', accessor: 'nomeSocial', type: 'text'},
            { header: 'Registro Funcional', accessor: 'registroFuncional', type: 'text'},
            { header: 'Nome', accessor: 'nomeCompleto', type: 'text'},
            { header: 'Registro Funcional 2', accessor: 'registroFuncional', type: 'text'},
            { header: 'Substituto (sem dados)', accessor: 'uf', type: 'text'},
            { header: 'Cargo', accessor: 'cargoComissao', type: 'text'},
            { header: 'Referência', accessor: 'referenciaCargoComissao', type: 'text'},
            { header: 'Mês de Referência', accessor: 'dataExoneracaoCargoFuncao', type: 'date'},
            { header: 'Início', accessor: 'dataInicioCargoComissao', type: 'date'},
            { header: 'Fim', accessor: 'dataTerminoCargoComissao', type: 'date'},
            { header: 'Motivo (sem dados)', accessor: 'uf', type: 'text'},
            { header: 'Documento (sem dados)', accessor: 'uf', type: 'text'},
            { header: 'Conferência (sem dados)', accessor: 'uf', type: 'text'},
            { header: 'Observação (sem dados)', accessor: 'uf', type: 'text' }
        ];
    };

    // Atualizando filter_rows para usar CompleteTableRow
    static filter_rows = (rows: CompleteTableRow[], column: string, value: string, dateRange?: [Date | null, Date | null]): CompleteTableRow[] => {
        if (dateRange) {
            return this.filterRowsByDate(rows, column, dateRange);
        } else {
            // Filtro de texto
            return rows.filter(row => {
                const cellValue = (row as any)[column];
                return cellValue && cellValue.toString().includes(value);
            });
        }
    };
    
    static filterRowsByDate = (rows: CompleteTableRow[], column: string, dateRange: [Date | null, Date | null]): CompleteTableRow[] => {
        const [startDate, endDate] = dateRange;
        
        return rows.filter(row => {
            const cellValue = new Date((row as any)[column]);
            return (!startDate || cellValue >= startDate) && (!endDate || cellValue <= endDate);
        });
    };
    
    static formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    static get_data() {
        return false
    }

    static get_columns_substitute():Column[] {
        const column: Column[] = [
            { header: 'Nome Social', accessor: 'nome', type: 'text' },
            { header: 'Registro Funcional', accessor: 'registroFuncional', type: 'text' },
            { header: 'Vínculo', accessor: 'vínculo', type: 'text' }, 
            { header: 'Espécie', accessor: 'espécie', type: 'text' },
            { header: 'Cargo', accessor: 'cargo', type: 'text' }, 
            { header: 'Referência', accessor: 'ref', type: 'text' }, 
            { header: 'Início', accessor: 'início', type: 'date' }, 
            { header: 'Fim', accessor: 'término', type: 'date' }, 
            { header: 'Vaga', accessor: 'vaga', type: 'text' },
            { header: 'Observação', accessor: 'obs', type: 'text' }
        ] as Column[]

        return column
    }

    static get_columns_license():Column[] {
        const column: Column[] = [
            { header: 'Nome Social', accessor: 'nome', type: 'text' },
            { header: 'Registro Funcional', accessor: 'registroFuncional', type: 'text' },
            { header: 'Vínculo', accessor: 'vínculo', type: 'text' }, 
            { header: 'Espécie', accessor: 'espécie', type: 'text' },
            { header: 'Cargo', accessor: 'cargo', type: 'text' }, 
            { header: 'Referência', accessor: 'ref', type: 'text' }, 
            { header: 'Início', accessor: 'início', type: 'date' }, 
            { header: 'Fim', accessor: 'término', type: 'date' }, 
            { header: 'Vaga', accessor: 'vaga', type: 'text' },
            { header: 'Observação', accessor: 'obs', type: 'text' }
        ] as Column[]

        return column
    }

    static get_columns_promotion():Column[] {
        const column: Column[] = [
            { header: 'Nome Social', accessor: 'nome', type: 'text' },
            { header: 'Registro Funcional', accessor: 'registroFuncional', type: 'text' },
            { header: 'Vínculo', accessor: 'vínculo', type: 'text' }, 
            { header: 'Espécie', accessor: 'espécie', type: 'text' },
            { header: 'Cargo', accessor: 'cargo', type: 'text' }, 
            { header: 'Referência', accessor: 'ref', type: 'text' }, 
            { header: 'Início', accessor: 'início', type: 'date' }, 
            { header: 'Fim', accessor: 'término', type: 'date' }, 
            { header: 'Vaga', accessor: 'vaga', type: 'text' },
            { header: 'Observação', accessor: 'obs', type: 'text' }
        ] as Column[]

        return column
    }

    static get_columns_promot():Column[] {
        const column: Column[] = [
            { header: 'Nome Social', accessor: 'nome', type: 'text' },
            { header: 'Registro Funcional', accessor: 'registroFuncional', type: 'text' },
            { header: 'Vínculo', accessor: 'vínculo', type: 'text' }, 
            { header: 'Espécie', accessor: 'espécie', type: 'text' },
            { header: 'Cargo', accessor: 'cargo', type: 'text' }, 
            { header: 'Referência', accessor: 'ref', type: 'text' }, 
            { header: 'Início', accessor: 'início', type: 'date' }, 
            { header: 'Fim', accessor: 'término', type: 'date' }, 
            { header: 'Vaga', accessor: 'vaga', type: 'text' },
            { header: 'Observação', accessor: 'obs', type: 'text' }
        ] as Column[]

        return column
    }

    static get_sheet():Column[] {
        const column: Column[] = [
            { header: 'Nome Social', accessor: 'nome', type: 'text' },
            { header: 'Registro Funcional', accessor: 'registroFuncional', type: 'text' },
            { header: 'Vínculo', accessor: 'vínculo', type: 'text' }, 
            { header: 'Espécie', accessor: 'espécie', type: 'text' },
            { header: 'Cargo', accessor: 'cargo', type: 'text' }, 
            { header: 'Referência', accessor: 'ref', type: 'text' }, 
            { header: 'Início', accessor: 'início', type: 'date' }, 
            { header: 'Fim', accessor: 'término', type: 'date' }, 
            { header: 'Vaga', accessor: 'vaga', type: 'text' },
            { header: 'Observação', accessor: 'obs', type: 'text' }
        ] as Column[]

        return column
    }
}
