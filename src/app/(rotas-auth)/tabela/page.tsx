'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab } from '@mui/material';
import Content from '@/components/Content';
import FilterableTable from '@/components/FilterableTable';
import { ServidorCargoRepository } from '@/shared/repository/servidor-cargo';
import CompleteTableRow from '@/interface/CompletTableRow';
import { UsuarioRepository } from '@/shared/repository/usuario';

export default function Tabela() {
  const [tabValue, setTabValue] = React.useState(0);
  const [rows, setRows] = React.useState<CompleteTableRow[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await ServidorCargoRepository.getServidorCargo();
      console.log(await UsuarioRepository.getUsuarios())

      // Mapear a resposta para o formato que a tabela espera
      const mappedRows = response.map((item: { inicio: string | number | Date; vinculo: any; inicio_exerc: string | number | Date; observacao: any; vaga: any; }) => ({
        inicio: new Date(item.inicio).toLocaleDateString(), 
        vinculo: item.vinculo,
        inicioExerc: new Date(item.inicio_exerc).toLocaleDateString(),
        observacao: item.observacao,
        vaga: item.vaga,
      }));

      setRows(mappedRows);
    };

    fetchData();
  }, []);

  const columns = [
    { header: 'Vínculo', accessor: 'vinculo' },
    { header: 'Vaga', accessor: 'vaga' },
    { header: 'Data Início', accessor: 'inicio' },
    { header: 'Data Início Exercício', accessor: 'inicioExerc' },
    { header: 'Observação', accessor: 'observacao' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Content>
      <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Pagamentos" />
          <Tab label="Outro" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <FilterableTable
          title="Tabela de Pagamentos"
          description="Filtre e visualize os pagamentos dos servidores."
          columns={columns}
          rows={rows}
        />
      )}

      {tabValue === 1 && (
        <div>
          <h2>Conteúdo da segunda aba</h2>
        </div>
      )}
    </Content>
  );
}
