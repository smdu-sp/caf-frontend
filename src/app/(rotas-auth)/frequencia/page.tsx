"use client";
import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Content from "@/components/Content";
import Calendar from "@/components/Calendar";
import FrequencySheet from "@/components/FrequencySheet"
import Service from "@/services/FrequencySheet"

export default function Frequencia() {
  const [tabValue, setTabValue] = React.useState(0);
  const [folhaValor, setFolhaValor] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  React.useEffect(() => {
    const criarFolha = async () => {
      try {
        await Service.createAttendanceSheet('./src/assets/Pasta.xlsx');
        setFolhaValor(1); 
      } catch (error) {
        console.error('Erro ao criar folha de ponto:', error);
        setFolhaValor(-1); 
      }
    };

    criarFolha();
  }, []);

  return (
    <Content titulo="Página de frequência" pagina="/frequencia">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Tabs de frequência">
          <Tab label="Calendário" />
          <Tab label="Folha de Frequência" />
        </Tabs>
      </Box>
      <Box>
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Calendar />
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <FrequencySheet />
            {folhaValor === 0 && <p>Criando folha de ponto...</p>}
            {folhaValor === 1 && <p>Folha de ponto criada com sucesso!</p>}
            {folhaValor === -1 && <p>Erro ao criar a folha de ponto.</p>}
          </Box>
        )}
      </Box>
    </Content>
  );
}
