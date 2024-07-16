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
    // const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
    const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
    const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
    const [status, setStatus] = useState(searchParams.get('status') ? Number(searchParams.get('status')) : '0');
    const [busca, setBusca] = useState(searchParams.get('busca') || '');
    const [filtro, setFiltro] = useState(1);
    const [values, setValues] = useState<IFeriado[]>([])
    const [ano, setAno] = useState<number>(parseInt(new Date().getFullYear().toString()))
    const [tipo, setTipo] = useState(1);
    const [inicio, setInicio] = useState<Date>(new Date())
    const [fim, setFim] = useState<Date>(new Date())
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        buscaFeriados(ano);
    }, []);

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

    const buscaSubprefeitura = async () => {
        FeriadoService.buscar("1", pagina, limite, busca)
          .then((response: IFeriadoPaginado) => {
            setTotal(response.total);
            setPagina(response.pagina);
            setLimite(response.limite);
            setValues(response.data);
          });
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

    const buscaFeriados = async (ano: number) => {
        FeriadoService.buscarPorAno(ano.toString())
            .then((response) => {
                setValues(response)
            })
    }

    const buscaData = async (data1: string) => {
        FeriadoService.buscarData(data1)
            .then((response) => {
                setValues(response)
            })
    }
    const buscaTudo = async () => {
        FeriadoService.buscarTudo()
            .then((response) => {
                setValues(response)
            })
    }

    const buscaPeriodo = async (data1: string, data2?: string) => {
        FeriadoService.buscarPeriodo(data1, data2 ? data2 : "")
            .then((response) => {
                setValues(response)
            })
    }

    const buscarFeriadosInativos = async () => {
        FeriadoService.buscarFeriadosInativos()
            .then((response) => {
                setValues(response)
            })
    }

    const buscarFeriadosRecorrentes = async () => {
        FeriadoService.buscarFeriadosRecorrentes()
            .then((response) => {
                setValues(response)
            })
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
                <IconButton size='sm' onClick={() => { }}><Refresh /></IconButton>
                <IconButton size='sm' onClick={() => { setFiltro(1); buscaFeriados(new Date().getFullYear()) }}><Clear /></IconButton>
                { tipo === 1 &&
                    <FormControl size="sm">
                        <FormLabel>Filtro: </FormLabel>
                        <Select
                            size="sm"
                            value={filtro}
                            onChange={(_, v) => { setFiltro(v ? v : 0); }}
                        >
                            <Option value={1}>Ano</Option>
                            <Option value={2}>Período</Option>
                            <Option value={3}>Data</Option>
                            <Option value={4} onClick={() => { buscarFeriadosInativos() }}>Inativos</Option>
                            <Option value={5} onClick={() => { buscaSubprefeitura() }}>Tudo</Option>
                        </Select>
                    </FormControl>
                }
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
                        <Option value={1} onClick={() => (setFiltro(1))}>Feriados</Option>
                        <Option value={2} onClick={() => {setFiltro(0); buscarFeriadosRecorrentes()}}>Recorrentes</Option>
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
                            <td><IconButton color={feriado.status === 1 ? 'success' : 'danger'} variant="soft">
                                {feriado.status === 1 ? <Check /> : <Cancel />}
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