import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Grid from '@mui/joy/Grid';
import { Option, Select, Textarea } from '@mui/joy';
import * as FerriadosServices from '@/services/Feriados'
import { useState } from 'react';
import * as FeriadoService from "@/services/Feriados";
import { AlertsContext } from '@/providers/alertsProvider';
import { Check } from '@mui/icons-material';

interface ModalProps {
  titulo: string;
  subTitulo: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: string;
  buscaFeriado: any;
  modo: number;
}

export default function BasicModalDialog(props: ModalProps) {

  const [nome, setNome] = useState<string>('');
  const [data, setData] = useState<Date>(new Date());
  const [tipo, setTipo] = useState("");
  const [nivel, setNivel] = useState("");
  const [status, setStatus] = useState<number>(0);
  const [modo, setModo] = useState<number>(0);
  const [descricao, setDescricao] = useState('');
  const { setAlert } = React.useContext(AlertsContext);
  const id = props.id;

  React.useEffect(() => {
    if (id) {
      FeriadoService.buscarUnico(id, props.modo)
      .then((response) => {
        setNome(response.nome)
        setData(data)
        setTipo(response.tipo)
        setNivel(response.nivel)
        setStatus(response.status)
        setModo(response.modo)
        setDescricao(response.descricao || "")
      })
    }
  }, [id]) 

  function cadastrarFeriado(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id) {
      FeriadoService.verica(data.toISOString())
      .then((response) => {
        if (response === true) {
          setAlert('Data Indisponivel', `Esta data já esta relacioanda a outro feriado`, 'danger', 3000, Check);
          props.setOpen(true);
          return;
        } else {
          FeriadoService.criar(nome, data, tipo, nivel, status, modo, descricao);
          props.buscaFeriado();
          props.setOpen(false);
          setAlert('Feriado Criado!', `${tipo} registrado com sucesso`, 'success', 3000, Check);
        }
      })
    } else {
      FeriadoService.atualizar(id ? id : "", nome, data, tipo, nivel, status, modo, descricao, props.modo)
      .then((response) => {
        if (response) {
          props.buscaFeriado();
          props.setOpen(false);
          setAlert('Feriado Atualizado!', `${nome} atualizado com sucesso`, 'success', 3000, Check);
        }
      })
    }
  }

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <DialogTitle>{props.titulo}</DialogTitle>
        <DialogContent>{props.subTitulo}</DialogContent>
        <form onSubmit={cadastrarFeriado}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type='text' name='name' value={nome} onChange={(e) => setNome(e.target.value)} required />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input type="date" name='date' value={data.toISOString().split("T")[0]} onChange={(e) => setData(new Date(e.target.value))} required />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <Select name='tipo' value={tipo} onChange={(_, v) => setTipo(v ? v : "")}>
                  <Option value="Feriado">Feriado</Option>
                  <Option value="Ponto Facultativo">Ponto Facultativo</Option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Nivel</FormLabel>
                <Select name='nivel' value={nivel} onChange={(_, v) => setNivel(v ? v : "")}>
                  <Option value="Nacional">Nacional</Option>
                  <Option value="Estadual">Estadual</Option>
                  <Option value="Municipal">Municipal</Option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select name='status' value={status} onChange={(_, v) => setStatus(v ? v : 0)}>
                  <Option value={0}>Ativo</Option>
                  <Option value={1}>Inativo</Option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Modo</FormLabel>
                <Select name='modo' value={modo} onChange={(_, v) => setModo(v ? v : 0)}>
                  <Option value={1}>Não recorrente</Option>
                  <Option value={0}>Recorrente</Option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea minRows={3} maxRows={5} name='descricao' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Button type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </ModalDialog>
    </Modal>
  );
}
