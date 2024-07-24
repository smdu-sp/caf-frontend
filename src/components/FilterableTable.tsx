import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Sheet,
    Table,
    FormControl,
    Select,
    Option,
    Input,
    Button,
    Box,
    Card,
    TabPanel
} from '@mui/joy';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import { PieChart } from '@mui/x-charts/PieChart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Pagination from '@mui/material/Pagination';
import style from '@/app/(rotas-auth)/pagamento/style.module.css';
import Service from '@/services/Table';
import DownloadService from '@/services/Download';
import CompleteTableRow from '@/interface/CompletTableRow';

interface Column {
    header: string;
    accessor: string;
}

interface Filter {
    column: string;
    value: string;
}

interface FilterableTableProps {
    title: string;
    description: string;
    columns: Column[];
    rows: CompleteTableRow[];
}

const FilterableTable = ({ title, description, columns, rows }: FilterableTableProps) => {
    const [filters, setFilters] = useState<Filter[]>([{ column: '', value: '' }]);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [downloadSelect, setDownloadSelect] = useState<string>('CSV');
    const [graficData, setGraficData] = useState<CompleteTableRow[]>(rows);
    const [filteredRows, setFilteredRows] = useState<CompleteTableRow[]>(rows);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 7;

    const handleFilterChange = (index: number, field: 'column' | 'value', value: string) => {
        setFilters(filters => {
            const updatedFilters = [...filters];
            updatedFilters[index] = { ...updatedFilters[index], [field]: value };
            return updatedFilters;
        });
    };

    const handleColumnSelectChange = (event: React.ChangeEvent<{ value: unknown }>, value: unknown) => {
        const selectedValue = value as string;
        setSelectedColumn(selectedValue);

        setFilters(filters => filters.map((filter, index) => (
            index === filters.length - 1
                ? { ...filter, column: selectedValue }
                : filter
        )));
    };

    const handleDownloadSelectChange = (event: React.ChangeEvent<{ value: unknown }>, value: unknown) => {
        setDownloadSelect(value as string);
    };

    const addNewFilter = () => {
        setFilters(filters => [...filters, { column: selectedColumn, value: '' }]);
    };

    const removeLastFilter = () => {
        setFilters(filters => filters.length > 1 ? filters.slice(0, -1) : filters);
    };

    useEffect(() => {
        let updatedFilteredRows = rows;

        filters.forEach((filter) => {
            if (filter.column && filter.value) {
                updatedFilteredRows = Service.filter_rows(updatedFilteredRows, filter.column, filter.value);
            }
        });

        setFilteredRows(updatedFilteredRows);
        setCurrentPage(1);
        setGraficData(Service.format_filter_rows(updatedFilteredRows));
    }, [filters, rows]);

    const formatCurrency = (value: number): string => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = useMemo(() => filteredRows.slice(indexOfFirstRow, indexOfLastRow), [filteredRows, indexOfFirstRow, indexOfLastRow]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDownloadClick = () => {
        const formattedRows = Service.format_filter_rows(filteredRows);

        if (downloadSelect === 'CSV') {
            DownloadService.downloadCSV(formattedRows, columns.map(col => col.header), 'tabela_filtrada_pagamentos.csv');
        } else if (downloadSelect === 'XLSX') {
            DownloadService.downloadXLSX(formattedRows, 'tabela_filtrada_pagamentos.xlsx');
        }
    };

    const calculatePercentage = (condition: (item: CompleteTableRow) => boolean): number => {
        const total = graficData.length;
        if (total === 0) return 0;

        const count = graficData.filter(condition).length;
        return (count / total) * 100;
    };

    const calculatePaidPercentage = useCallback(() => calculatePercentage(item => item.possuidorDeficiencia), [graficData]);
    const calculateUnpaidPercentage = useCallback(() => calculatePercentage(item => !item.possuidorDeficiencia), [graficData]);

    return (
        <Card sx={{ p: 2, borderRadius: 'sm', boxShadow: 'md' }}>
            <div className={style.header}>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className={style.download_select}>
                    <Button id="download-button" sx={{ ml: 1 }} type="submit" onClick={handleDownloadClick}>
                        Download
                    </Button>
                    <Select defaultValue='CSV' onChange={handleDownloadSelectChange}>
                        <Option value='CSV'>.CSV</Option>
                        <Option value='XLSX'>.XLSX</Option>
                    </Select>
                </div>
            </div>

            <div className={style.filterContainer}>
                {filters.map((filter, index) => (
                    <Box key={index} className={style.filterContent} display="flex" gap={1}>
                        <FormControl>
                            <Select
                                className={style.select_column}
                                id={`column-select-${index}`}
                                placeholder='Coluna'
                                value={filter.column}
                                onChange={handleColumnSelectChange}
                            >
                                {columns.map((col, idx) => (
                                    <Option key={idx} value={col.accessor}>{col.header}</Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <Input
                                className={style.select_input}
                                id={`value-input-${index}`}
                                placeholder="Valor"
                                value={filter.value}
                                onChange={(event) => handleFilterChange(index, 'value', event.target.value)}
                            />
                        </FormControl>

                        {index === filters.length - 1 && (
                            <Button onClick={addNewFilter} className={style.button} variant="outlined">
                                <AddIcon />
                            </Button>
                        )}
                    </Box>
                ))}

                <div className={style.removeButtonContainer}>
                    <Button onClick={removeLastFilter} variant="outlined">
                        <RemoveIcon />
                    </Button>
                </div>
            </div>

            <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList>
                    <Tab>Tabela</Tab>
                    <Tab>Gráficos</Tab>
                </TabList>
                <TabPanel value={0}>
                    <div className={style.tableContainer}>

                    <Sheet className={style.table} sx={{ mt: 2 }}>
                        <Table aria-label="filtered table">
                            <thead>
                                <tr>
                                    {columns.map((col, idx) => (
                                        <th key={idx} style={{ width: `${100 / columns.length}%` }}>
                                            {col.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((row, index) => (
                                    <tr key={index}>
                                        {columns.map((col, idx) => (
                                            <td key={idx}>
                                                {typeof (row as any)[col.accessor] === 'object'
                                                    ? JSON.stringify((row as any)[col.accessor])
                                                    : (row as any)[col.accessor]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>
                    </div>

                    <Pagination
                        count={Math.ceil(filteredRows.length / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                    />
                </TabPanel>
                <TabPanel value={1}>
                    
                </TabPanel>
            </Tabs>
        </Card>
    );
};

export default FilterableTable;
