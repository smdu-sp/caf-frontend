'use client'

import Content from "@/components/Content"
import { AlertsContext } from "@/providers/alertsProvider";
import { Add, Cancel, Check, Clear, Refresh, Search } from "@mui/icons-material";
import { Box, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Table, Tooltip, Typography, useTheme } from "@mui/joy";
import { TablePagination } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { OverridableStringUnion } from '@mui/types';
import ModalFeriado from "@/components/ModalFeriado";

export default function Feriados() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    // const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
    const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
    const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
    const [status, setStatus] = useState(searchParams.get('status') ? Number(searchParams.get('status')) : 1);
    const [busca, setBusca] = useState(searchParams.get('busca') || '');
    const [filtro, setFiltro] = useState(searchParams.get('filtro') || '');
    const [tipo, setTipo] = useState('');
    const [open, setOpen] = useState(false);

    const confirmaVazio: {
        aberto: boolean,
        confirmaOperacao: () => void,
        titulo: string,
        pergunta: string,
        color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>
    } = {
        aberto: false,
        confirmaOperacao: () => { },
        titulo: '',
        pergunta: '',
        color: 'primary'
    }
    const [confirma, setConfirma] = useState(confirmaVazio);
    const { setAlert } = useContext(AlertsContext);

    const theme = useTheme();
    const router = useRouter();

    const buscaUsuarios = () => {

    }

    const limpaFitros = () => {

    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString();
        },
        [searchParams]
    );

    const mudaPagina = (
        _: React.MouseEvent<HTMLButtonElement> | null, novaPagina: number,
    ) => {
        router.push(pathname + '?' + createQueryString('pagina', String(novaPagina + 1)));
        setPagina(novaPagina + 1);
    };

    const mudaLimite = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        router.push(pathname + '?' + createQueryString('limite', String(event.target.value)));
        setLimite(parseInt(event.target.value, 10));
        setPagina(1);
    };


    return (
        <Content
            breadcrumbs={[
                { label: 'Feriados', href: '/feriados' }
            ]}
            titulo='Feriados'
            pagina='feriados'
        >
            <Snackbar
                variant="solid"
                color={confirma.color}
                size="lg"
                invertedColors
                open={confirma.aberto}
                onClose={() => setConfirma({ ...confirma, aberto: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ maxWidth: 360 }}
            >
                <div>
                    <Typography level="title-lg">{confirma.titulo}</Typography>
                    <Typography sx={{ mt: 1, mb: 2 }} level="title-md">{confirma.pergunta}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant="solid" color="primary" onClick={() => confirma.confirmaOperacao()}>
                            Sim
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setConfirma(confirmaVazio)}
                        >
                            Não
                        </Button>
                    </Stack>
                </div>
            </Snackbar>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                    alignItems: 'end',
                }}
            >
                <IconButton size='sm' onClick={buscaUsuarios}><Refresh /></IconButton>
                <IconButton size='sm' onClick={limpaFitros}><Clear /></IconButton>
                <FormControl size="sm">
                    <FormLabel>Filtro: </FormLabel>
                    <Select
                        size="sm"
                        value={filtro}
                        onChange={(_, newValue) => {
                            router.push(pathname + '?' + createQueryString('filtro', newValue! || ''));
                            setFiltro(newValue! || '');
                        }}
                    >
                        <Option value={1}>Ano</Option>
                        <Option value={2}>Período</Option>
                        <Option value={3}>Inativos</Option>
                        <Option value={4}>Tudo</Option>
                    </Select>
                </FormControl>
                <FormControl size="sm">
                    <FormLabel>Tipo: </FormLabel>
                    <Select
                        size="sm"
                        value={tipo}
                        onChange={(_, newValue) => {
                            router.push(pathname + '?' + createQueryString('tipo', newValue! || ''));
                            setTipo(newValue! || '');
                        }}
                    >
                        <Option value={1}>Feriados</Option>
                        <Option value={2}>Recorrentes</Option>
                    </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Buscar: </FormLabel>
                    <Input
                        startDecorator={<Search fontSize='small' />}
                        value={busca}
                        onChange={(event) => setBusca(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                router.push(pathname + '?' + createQueryString('busca', busca));
                                buscaUsuarios();
                            }
                        }}
                    />
                </FormControl>
            </Box>
            <Table hoverRow sx={{ tableLayout: 'auto' }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Nível</th>
                        <th>Modo</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}></th>
                    </tr>
                </thead>
                <tbody>
                    <td>Natal</td>
                    <td>25/12/2024</td>
                    <td>Feriado</td>
                    <td>Nacional</td>
                    <td>Recorrente</td>
                    <td>Teste</td>
                    <td><Chip color="success">Ativo</Chip></td>
                    <td><IconButton variant="soft" size="sm" color="success"><Check /></IconButton></td>
                </tbody>
            </Table>
            {(total && total > 0) ? <TablePagination
                component="div"
                count={total}
                page={(pagina - 1)}
                onPageChange={mudaPagina}
                rowsPerPage={limite}
                onRowsPerPageChange={mudaLimite}
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage="Registros por página"
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
            /> : null}
            <IconButton onClick={() => setOpen(true)} color='primary' variant='soft' size='lg' sx={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
            }}><Add /></IconButton>
            <ModalFeriado
                open={open}
                titulo="Criar Feriado"
                subTitulo="Preencha os dados abaixo:"
                setOpen={() => setOpen(!open)}
            />
        </Content>
    )
}