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

interface ModalProps {
    titulo: string;
    subTitulo: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    id?: string
}

export default function BasicModalDialog(props: ModalProps) {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [tipo, setTipo] = useState<number>(0);
  const [nivel, setNivel] = useState<number>(0);
  const [status, setStatus] = useState<number>(0);
  const [modo, setModo] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>('');

  function cadastrarFeriado(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, date, tipo, nivel, status, modo, descricao });
  }

  // React.useEffect(() => {
  //   if (props.id) {
  //     FerriadosServices.
  //   }
  // }, [])

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
                <Input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} required />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input type="date" name='date' value={date} onChange={(e) => setDate(e.target.value)} required />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <Select name='tipo' value={tipo} onChange={(_, v) => setTipo(v ? v : 0)}>
                  <Option value={0}>Feriado</Option>
                  <Option value={1}>Ponto Facultativo</Option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Nivel</FormLabel>
                <Select name='nivel' value={nivel} onChange={(_, v) => setNivel(v ? v : 0)}>
                  <Option value={0}>Nacional</Option>
                  <Option value={1}>Estadual</Option>
                  <Option value={2}>Municipal</Option>
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
                  <Option value={0}>Não recorrente</Option>
                  <Option value={1}>Recorrente</Option>
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
