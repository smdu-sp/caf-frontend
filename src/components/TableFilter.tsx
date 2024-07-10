import React, { useState, useEffect } from 'react';
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
import DownloadService from '@/services/Download'
import CompleteTableRow from '@/interface/CompletTableRow';

// Obter dados de teste e colunas
const rows = Service.get_data_test();
const columns = Service.get_column();

interface Filter {
    column: string;
    value: string;
}

interface Select {
    value: string;
}

export default function TableFilter() {
    const [filters, setFilters] = useState<Filter[]>([{ column: '', value: '' }]);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [downloadSelect, setDownloadSelect] = useState<string>('CSV');
    const [graficData, setGraficData] = useState<CompleteTableRow[]>(rows);
    const [filteredRows, setFilteredRows] = useState<CompleteTableRow[]>(rows);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 7; // Número de linhas por página

    // Manipula a mudança de valor em um filtro específico
    const handleFilterChange = (index: number, field: 'column' | 'value', value: string) => {
        const updatedFilters = [...filters];
        updatedFilters[index] = { ...updatedFilters[index], [field]: value };
        setFilters(updatedFilters);
    };

    // Atualiza a coluna selecionada para o filtro
    const handleColumnSelectChange = (event: React.ChangeEvent<{ value: unknown }>, value: unknown) => {
        const selectedValue = value as string;
        setSelectedColumn(selectedValue);

        // Atualiza o filtro mais recente com a nova coluna selecionada
        const updatedFilters = filters.map((filter, index) => {
            if (index === filters.length - 1) {
                return { ...filter, column: selectedValue };
            }
            return filter;
        });
        setFilters(updatedFilters);
    };

    // Função para lidar com a mudança no Select
    const handleDownloadSelectChange = (event: React.ChangeEvent<{ value: unknown }>, value: unknown) => {
        const selectedValue = value as string;
        setDownloadSelect(selectedValue);
    };

    // Adiciona um novo filtro
    const addNewFilter = () => {
        setFilters([...filters, { column: selectedColumn, value: '' }]);
    };

    // Remove o último filtro
    const removeLastFilter = () => {
        if (filters.length > 1) {
            setFilters(filters.slice(0, -1));
        }
    };

    // Filtra as linhas com base nos filtros aplicados
    useEffect(() => {
        let updatedFilteredRows = rows;

        filters.forEach((filter) => {
            if (filter.column && filter.value) {
                updatedFilteredRows = Service.filter_rows(updatedFilteredRows, filter.column, filter.value);
            }
        });

        setFilteredRows(updatedFilteredRows);
        setCurrentPage(1);
        setGraficData(Service.format_filter_rows(updatedFilteredRows))
    }, [filters]);

    // Formata o valor em moeda BRL
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Calcula o índice inicial e final das linhas da página atual
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

    // Manipula a mudança de página
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    // Função para lidar com o clique no botão de download
    const handleDownloadClick = () => {
        // Formate os dados filtrados para o tipo correto (Row[])
        const formattedRows = Service.format_filter_rows(filteredRows);

        if (downloadSelect === 'CSV') {
            DownloadService.downloadCSV(formattedRows, columns, 'tabela_filtrada_pagamentos.csv');
        } else if (downloadSelect === 'XLSX') {
            DownloadService.downloadXLSX(formattedRows, 'tabela_filtrada_pagamentos.xlsx');
        }
    };


    // Função para calcular a porcentagem de pagos
    const calculatePaidPercentage = (): number => {
        const total = graficData.length;
        if (total === 0) return 0;

        const paidCount = graficData.filter(item => item.possuidorDeficiencia).length;
        return (paidCount / total) * 100;
    };

    // Função para calcular a porcentagem de não pagos
    const calculateUnpaidPercentage = (): number => {
        const total = graficData.length;
        if (total === 0) return 0;

        const unpaidCount = graficData.filter(item => !item.possuidorDeficiencia).length;
        return (unpaidCount / total) * 100;
    };

    return (
        <Card sx={{ p: 2, borderRadius: 'sm', boxShadow: 'md' }}>
            <div className={style.header}>
                <h2>Filtro</h2>

                <div className={style.download_select}>
                    <Button  id="download-button" sx={{ ml: 1 }} type="submit" onClick={handleDownloadClick}>
                        Download
                    </Button>
                    <Select 
                        defaultValue='CSV' 
                        onChange={handleDownloadSelectChange}
                    >
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
                                    <Option key={idx} value={col}>{col}</Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <Input
                                className={style.select_input}
                                id={`value-input-${index}`}
                                placeholder="Valor"
                                value={filter.value}
                                onChange={(event) => {
                                    const { value } = event.target as HTMLInputElement;
                                    handleFilterChange(index, 'value', value);
                                }}
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
                    <Sheet className={style.table} sx={{ mt: 2 }}>
                        <Table aria-label="filtered table">
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>Nome Completo</th>
                                    <th style={{ width: '10%' }}>Registro Funcional</th>
                                    <th style={{ width: '16%' }}>CPF</th>
                                    <th style={{ width: '10%' }}>Sexo</th>
                                    <th style={{ width: '8%' }}>Raça/Cor</th>
                                    <th style={{ width: '10%' }}>Data de Nascimento</th>
                                    <th style={{ width: '10%' }}>País</th>
                                    <th style={{ width: '8%' }}>Possui Deficiência</th>
                                    <th style={{ width: '8%' }}>UF</th>
                                    <th style={{ width: '10%' }}>Cidade</th>
                                    <th style={{ width: '10%' }}>Estado Civil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.nomeCompleto}</td>
                                        <td>{row.registroFuncional}</td>
                                        <td>{row.cpf}</td>
                                        <td>{row.sexo}</td>
                                        <td>{row.racaCor}</td>
                                        <td>{row.dataNascimento}</td>
                                        <td>{row.pais}</td>
                                        <td>{row.possuidorDeficiencia ? 'Sim' : 'Não'}</td>
                                        <td>{row.uf}</td>
                                        <td>{row.cidade}</td>
                                        <td>{row.estadoCivil}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>

                    <Pagination
                        count={Math.ceil(filteredRows.length / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                    />
                </TabPanel>
                <TabPanel value={1}>
                    <PieChart
                        colors={['purple', 'blue']}
                        series={[
                            {
                                data: [
                                    { id: 0, value: calculatePaidPercentage(), label: 'Possui Deficiência' },
                                    { id: 1, value: calculateUnpaidPercentage(), label: 'Não Possui Deficiência' }
                                ],
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                cx: 150,
                                cy: 150,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </TabPanel>
            </Tabs>

        </Card>
    );
}
