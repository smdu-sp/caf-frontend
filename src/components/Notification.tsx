import React, { useState } from 'react';
import {
    Button,
    Card,
    Box
} from '@mui/joy';
import FilterableTableNoCard from '@/components/FilterTableNoCard';
import CompleteTableRow from '@/interface/CompletTableRow';
import Column from '@/interface/Column';
import Service from '@/services/Table';
import Style from '@/app/(rotas-auth)/notifica/style.module.css'

export default function Notification() {
    const [showTable, setShowTable] = useState(false);

    const rows: CompleteTableRow[] = Service.get_data();
    const columns_substitute: Column[] = Service.get_columns_substitute();

    const handleButtonClick = () => {
        setShowTable(true);
    };

    const handleBackClick = () => {
        setShowTable(false);
    };

    return (
        <Card>
            {showTable ? (
                <Box>
                    <Button variant="soft" onClick={handleBackClick}>
                        Voltar
                    </Button>
                    <FilterableTableNoCard
                        title="Notificação"
                        columns={columns_substitute}
                        rows={rows}
                    />
                </Box>
            ) : (
                <Box>
                    <div className={Style.button_session}>
                        <Button className={Style.button} variant="soft" onClick={handleButtonClick}>
                            Notificação 1 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 2 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 3 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 4 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 5 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 6 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 7 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 8 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 9 | Número de casos: 1000
                        </Button>
                        <Button className={Style.button}variant="soft" onClick={handleButtonClick}>
                            Notificação 10 | Número de casos: 1000
                        </Button>
                    </div>
                </Box>
            )}
        </Card>
    );
}
