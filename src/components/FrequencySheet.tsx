import * as React from "react";
import { useState } from "react";
import { Button, Input } from "@mui/joy";
import style from '@/app/(rotas-auth)/frequencia/calendar.module.css';
import serviceTable from '@/services/Table';
import CompleteTableRow from "@/interface/CompletTableRow";
import Column from "@/interface/Column";

export default function FrequencySheet() {
    const [searchId, setSearchId] = useState<string>('');
    const [employee, setEmployee] = useState<CompleteTableRow | undefined>();
    const rows: CompleteTableRow[] = serviceTable.get_data();
    const columns_substitute: Column[] = serviceTable.get_sheet();

    // Função para lidar com a mudança no campo de pesquisa
    const handleSearchIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchId(event.target.value);
    };

    // Função para buscar o funcionário pelo registro funcional (RF)
    const handleSearch = () => {
        const foundEmployee = rows.find(row => row.registroFuncional === searchId);
        console.log(rows)
        if (foundEmployee) {
            setEmployee(foundEmployee);
        } else {
            setEmployee(undefined);
        }
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
        </div>
    );
}
