import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { Option, Select, Textarea } from '@mui/joy';

interface Modal {
    titulo: string;
    subTitulo: string;
    open: boolean;
    setOpen: any;
}

export default function BasicModalDialog(props: Modal) {
  return (
    <React.Fragment>
      <Modal open={props.open} onClose={() => props.setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{props.titulo}</DialogTitle>
          <DialogContent>{props.subTitulo}</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type='text' required />
              </FormControl>
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input type="date" required />
              </FormControl>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <Select>
                  <Option value={0}>Feriado</Option>
                  <Option value={1}>Ponto Facutativo</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Nivel</FormLabel>
                <Select>
                  <Option value={0}>Nacional</Option>
                  <Option value={1}>Estadual</Option>
                  <Option value={2}>Municipal</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select>
                  <Option value={0}>Ativo</Option>
                  <Option value={1}>Inativo</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Modo</FormLabel>
                <Select>
                  <Option value={0}>Não recorrente</Option>
                  <Option value={1}>Recorrente</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea minRows={3} maxRows={5} />
              </FormControl>
              <Button type="submit" onClick={() => props.setOpen(false)}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
