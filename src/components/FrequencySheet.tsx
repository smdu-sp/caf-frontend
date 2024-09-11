import * as React from "react";
import { useState } from "react";
import { Button, Input, Switch } from "@mui/joy";
import style from '@/app/(rotas-auth)/frequencia/calendar.module.css';
import serviceTable from '@/services/Table';
import CompleteTableRow from "@/interface/CompletTableRow";
import Column from "@/interface/Column";
import Service from "@/services/FrequencySheet";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

export default function FrequencySheet() {
    const [searchId, setSearchId] = useState<string>('');
    const [employee, setEmployee] = useState<CompleteTableRow | undefined>();
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [date2, setDate2] = useState<Dayjs | null>(dayjs());
    const [checked, setChecked] = React.useState<boolean>(false);
    const columns_substitute: Column[] = serviceTable.get_sheet();

    // Função para lidar com a mudança no campo de pesquisa
    const handleSearchIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchId(event.target.value);
    };

    // Função para calcular o intervalo de meses
    const getMonthsBetweenDates = (start: Dayjs, end: Dayjs) => {
        const months = [];
        let current = start.startOf('month');

        while (current.isBefore(end.startOf('month').add(1, 'month'))) {
            months.push(current);
            current = current.add(1, 'month');
        }

        return months;
    };

    // Função para criar a folha de ponto
    const createAttendanceSheets = async () => {
        try {
            if (date) {
                if (checked && date2) {
                    const months = getMonthsBetweenDates(date, date2);
                    for (const month of months) {
                        await Service.createAttendanceSheet(month.toDate());
                    }
                } else {
                    await Service.createAttendanceSheet(date.toDate());
                }
                setStatusMessage('Tabelas alteradas com sucesso!');
            }
        } catch (error) {
            console.error(error);
            setStatusMessage('Falha ao alterar as tabelas.');
        }
    };

    // Função para buscar o funcionário pelo registro funcional (RF)
    const handleSearch = () => {
    };

    return (
        <div>
            <h3>Pesquisar Funcionário por RF:</h3>
            <div className={style.search}>
                <Input
                    type="text"
                    placeholder="Digite o RF do funcionário"
                    value={searchId}
                    onChange={handleSearchIdChange}
                    className={style.input}
                />
                <Button className={style.s_button} onClick={handleSearch}>Pesquisar</Button>
            </div>
            {employee && (
                <div>
                    <h4>Servidor Selecionado: {employee.nomeCompleto}</h4>
                </div>
            )}
            <div className={style.paper_content}>
                <h4>Escolha a data para a folha de ponto.</h4>
                <div className={style.paper}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            views={['month', 'year']}
                            value={date}  
                            onChange={(newValue) => {
                                setDate(newValue); 
                            }} 
                        />
                        <DatePicker 
                            views={['month', 'year']}
                            value={date2}  
                            onChange={(newValue) => {
                                setDate2(newValue);  
                            }} 
                            disabled={!checked}
                        />
                        <Switch
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                        />
                    </LocalizationProvider>
                    <Button onClick={createAttendanceSheets}>Criar Folha de Ponto</Button>
                </div>
            </div>
        </div>
    );
}
