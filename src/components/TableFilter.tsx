import React from 'react';
import Service from '@/services/Table';
import FilterableTable from './FilterableTable';
import CompleteTableRow from '@/interface/CompletTableRow';

const rows: CompleteTableRow[] = Service.get_data_test();
const columns = Service.get_columns_test();

export default function TableFilter() {
    return (
        <FilterableTable
            title="Substitutos"
            description="Busca por substitutos."
            columns={columns}  
            rows={rows}
        />
    );
}
