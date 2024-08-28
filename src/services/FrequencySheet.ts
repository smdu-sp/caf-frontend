import Column from "@/interface/Column";

export default class FrequencySheet {


    static getColumns(): Column[] {
        return [
            { header: 'RF', accessor: 'registroFuncional', type: 'text' },
            { header: 'Nome', accessor: 'nome', type: 'text' },
            { header: 'Vínculo', accessor: 'vínculo', type: 'text' },
            { header: 'EH', accessor: 'cargo', type: 'text' },
            { header: 'Unidade', accessor: 'unid', type: 'text' },
            { header: 'Referência', accessor: 'ref', type: 'text' },
        ] as Column[];
    }
}