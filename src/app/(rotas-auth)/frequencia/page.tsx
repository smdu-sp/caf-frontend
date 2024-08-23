"use client";
import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Content from "@/components/Content";
import Calendar from "@/components/Calendar";
import FrequencySheet from "@/components/FrequencySheet"

export default function Frequencia() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
          </Box>
        )}
      </Box>
    </Content>
  );
}
