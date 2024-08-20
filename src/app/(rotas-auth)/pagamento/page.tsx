'use client'

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Tabs, Tab, Typography } from '@mui/material';
import Service from '@/services/Table';
import FilterableTable from '@/components/FilterableTable';
import CompleteTableRow from '@/interface/CompletTableRow';
import Column from '@/interface/Column';
import Content from '@/components/Content';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const rows: CompleteTableRow[] = Service.get_data_test();
const columns_substitute: Column[] = Service.get_columns_substitute();
const columns_license: Column[] = Service.get_columns_license();
const columns_promotion: Column[] = Service.get_columns_promotion();

export default function Pagamento() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Content titulo='Página Pagamento' pagina='pagamento'>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="navigation tabs">
          <Tab label="Substituição" />
          <Tab label="Licença Saúde" />
          <Tab label="Promoção" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {value === 0 && (
            <FilterableTable
              title="Substituição"
              description="Busca por substitutos."
              columns={columns_substitute}  
              rows={rows}
            />
          )}
          {value === 1 && (
            <FilterableTable
              title="Licença Saúde"
              description="Dados de funcionários com licença saúde."
              columns={columns_license}  
              rows={rows}
            />
          )}
          {value === 2 && (
            <FilterableTable
              title="Promoção"
              description="Dados de funcionários que foram promovidos."
              columns={columns_promotion}  
              rows={rows}
            />
          )}
        </Box>
      </Box>
    </Content>
  );
}
