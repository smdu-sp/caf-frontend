'use client'

import Content from "@/components/Content"
import { AlertsContext } from "@/providers/alertsProvider";
import { Add, Cancel, Check, Clear, Refresh, Search } from "@mui/icons-material";
import { Box, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Table, Tooltip, Typography, useTheme } from "@mui/joy";
import { TablePagination } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { use, useCallback, useContext, useEffect, useState } from "react";
import { OverridableStringUnion } from '@mui/types';
import ModalFeriado from "@/components/ModalFeriado";
import * as FeriadoService from "@/services/Feriados";
import { IFeriado, IFeriadoPaginado } from "@/services/Feriados"

export default function Feriados() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [pagina, setPagina] = useState(1);
    const [limite, setLimite] = useState(10);
    const [total, setTotal] = useState(1);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState(1);
    const [values, setValues] = useState<IFeriado[]>([])
    const [ano, setAno] = useState<number>(parseInt(new Date().getFullYear().toString()))
    const [tipo, setTipo] = useState(1);
    const [inicio, setInicio] = useState<Date>(new Date())
    const [fim, setFim] = useState<Date>(new Date())
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(0)
    const [id, setId] = useState('');
    const [openComfirm, setOpenComfirm] = useState(false);


    useEffect(() => {
        buscaFeriados(ano);
    }, []);

    useEffect(() => {
        tipo === 2 && buscarFeriadosRecorrentes()
    }, [status]);


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

    const router = useRouter();

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

    const buscaFeriados = async (ano: number) => {
        FeriadoService.buscarPorAno(ano.toString(), pagina, limite, busca, status)
            .then((response: IFeriadoPaginado) => {
                setTotal(response.total);
                setPagina(response.pagina);
                setLimite(response.limite);
                setValues(response.data);
            });
    }

    const buscaData = async (data1: string) => {
        FeriadoService.buscarData(data1, pagina, limite, total)
            .then((response: IFeriadoPaginado) => {
                setTotal(response.total);
                setPagina(response.pagina);
                setLimite(response.limite);
                setValues(response.data);
            });
    }
    const buscaTudo = async (status: number) => {
        FeriadoService.buscarTudo(pagina, limite, busca, status)
            .then((response: IFeriadoPaginado) => {
                setTotal(response.total);
                setPagina(response.pagina);
                setLimite(response.limite);
                setValues(response.data);
            });
    }

    const buscaPeriodo = async (data1: string, data2?: string) => {
        FeriadoService.buscarPeriodo(data1, data2 ? data2 : "", pagina, limite, busca)
            .then((response: IFeriadoPaginado) => {
                setTotal(response.total);
                setPagina(response.pagina);
                setLimite(response.limite);
                setValues(response.data);
            });
    }

    const buscarFeriadosInativos = async () => {
        FeriadoService.buscarFeriadosInativos()
            .then((response: IFeriadoPaginado) => {
                setTotal(response.total);
                setPagina(response.pagina);
                setLimite(response.limite);
                setValues(response.data);
            });
    }

    const buscarFeriadosRecorrentes = async () => {
        FeriadoService.buscarFeriadosRecorrentes(pagina, limite, busca, status)
            .then((response: IFeriadoPaginado) => {
                setTotal(response.total);
                setPagina(response.pagina);
                setLimite(response.limite);
                setValues(response.data);
            });
    }

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
                color={'warning'}
                size="lg"
                invertedColors
                open={openComfirm}
                onClose={() => setOpenComfirm(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ maxWidth: 360 }}
            >
                <div>
                    <Typography level="title-lg">Alterar status feriado.</Typography>
                    <Typography sx={{ mt: 1, mb: 2 }} level="title-md">Deseja alterar este feriado?</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant="solid" color="primary" onClick={() => {
                            tipo === 1 ? FeriadoService.alterarFeriado(id) : FeriadoService.alterarFeriadoRecorrente(id); 
                            tipo === 1 ? buscaFeriados(ano) : buscarFeriadosRecorrentes();
                        setOpenComfirm(false)}}>
                            Sim
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpenComfirm(false)}
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
                <IconButton size='sm' onClick={() => { }}><Refresh /></IconButton>
                <IconButton size='sm' onClick={() => { setFiltro(1); buscaFeriados(new Date().getFullYear()) }}><Clear /></IconButton>
                <FormControl size="sm">
                    <FormLabel>Filtro: </FormLabel>
                    <Select
                        size="sm"
                        value={filtro}
                        onChange={(_, v) => { setFiltro(v ? v : 0); }}
                    >
                        {tipo === 1 ?
                            <>
                                <Option value={1}>Ano</Option>
                                <Option value={2}>Período</Option>
                                {/* <Option value={3}>Data</Option> */}
                                <Option value={5} onClick={() => { buscaTudo(0) }}>Tudo</Option>
                            </>
                            : <Option value={6} onClick={() => { setStatus(0); }}>Ativos</Option>
                        }
                        <Option value={4} onClick={() => { tipo === 1 ? buscaTudo(1) : setStatus(1); }}>Inativos</Option>
                    </Select>
                </FormControl>

                {filtro === 1 ?
                    <FormControl sx={{ flex: 0.1 }} size="sm">
                        <FormLabel>Ano: </FormLabel>
                        <Input
                            startDecorator={
                                <IconButton onClick={() => buscaFeriados(ano)}>
                                    <Search fontSize='small' />
                                </IconButton>
                            }
                            onChange={(event) => setAno(parseInt(event.target.value))}
                            type="number"
                            value={ano}
                            slotProps={{
                                input: {
                                    min: 1000,
                                    minLength: 4
                                }
                            }}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    buscaFeriados(ano)
                                }
                            }}
                        />
                    </FormControl>

                    : null
                }
                {filtro === 2 || filtro === 3 ?
                    <>
                        <FormControl sx={{ flex: 0.1 }} size="sm">
                            <FormLabel>Inicio: </FormLabel>
                            <Input
                                startDecorator={filtro === 3 &&
                                    <IconButton onClick={() => buscaData(inicio.toISOString().split('T')[0])}>
                                        <Search fontSize='small' />
                                    </IconButton>
                                }
                                type="date"
                                value={inicio.toISOString().split('T')[0]}
                                onChange={(event) => setInicio(new Date(event.target.value))}
                                onKeyDown={event => {
                                    if (event.key === 'Enter' && filtro === 3) {
                                        buscaData(inicio.toISOString().split('T')[0])
                                    }
                                }}
                            />
                        </FormControl>
                        {filtro === 2 &&
                            <FormControl sx={{ flex: 0.1 }} size="sm">
                                <FormLabel>Fim: </FormLabel>
                                <Input
                                    startDecorator={filtro === 2 &&
                                        <IconButton onClick={() => buscaPeriodo(inicio.toISOString().split('T')[0], fim.toISOString().split('T')[0])}>
                                            <Search fontSize='small' />
                                        </IconButton>
                                    }
                                    type="date"
                                    value={fim.toISOString().split('T')[0]}
                                    onChange={(event) => setFim(new Date(event.target.value))}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter') {
                                            buscaPeriodo(inicio.toISOString().split('T')[0], fim.toISOString().split('T')[0])
                                        }
                                    }}
                                />
                            </FormControl>
                        }
                    </>

                    : null
                }

                <FormControl size="sm">
                    <FormLabel>Tipo: </FormLabel>
                    <Select
                        size="sm"
                        value={tipo}
                        onChange={(_, v) => setTipo(v ? v : 0)}
                    >
                        <Option value={1} onClick={() => { setFiltro(1); buscaFeriados(ano) }}>Feriados</Option>
                        <Option value={2} onClick={() => { setFiltro(0); buscarFeriadosRecorrentes() }}>Recorrentes</Option>
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
                        <th style={{ textAlign: 'right' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {values && values.length > 0 ? values.map((feriado) => (
                        <tr key={feriado.id}>
                            <td>{feriado.nome}</td>
                            <td>{new Date(feriado.data).toISOString().split("T")[0].split("-").reverse().join("/")}</td>
                            <td>{feriado.tipo}</td>
                            <td>{feriado.nivel}</td>
                            <td>{feriado.modo === 1 ? "Não Recorrente" : "Recorrente"}</td>
                            <td>{feriado.descricao}</td>
                            <td>
                                <IconButton color={feriado.status === 0 ? 'success' : 'danger'} onClick={() => {setOpenComfirm(true); setId(feriado.id)}} variant="soft">
                                    {feriado.status === 0 ? <Check /> : <Cancel />}
                                </IconButton>
                            </td>
                        </tr>
                    )) : <tr><td colSpan={4}>Nenhum Feriado encontrado</td></tr>}
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
            <IconButton onClick={() => { setOpen(true) }} color='primary' variant='soft' size='lg' sx={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
            }}><Add /></IconButton>
            <ModalFeriado
                open={open}
                titulo="Criar Feriado"
                subTitulo="Preencha os dados abaixo:"
                setOpen={() => setOpen(!open)}
                buscaFeriado={() => buscaFeriados(ano)}
            />
        </Content>
    )
}