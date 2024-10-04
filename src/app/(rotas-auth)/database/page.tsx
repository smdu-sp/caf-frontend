"use client";
import Content from "@/components/Content";
import { Button } from '@mui/material';
import Default from '@/services/Database'; 
import { useState } from "react";
import style from '@/app/(rotas-auth)/database/database.module.css';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Database() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadFile, setLoadFile] = useState<boolean>(false);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Função para lidar com a seleção de arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Função para enviar o arquivo
  const handleSubmit = () => {
    setLoadFile(true);
    
    if (selectedFile) {
      const jsonData = Default.processFile(selectedFile).then((responseFile) => {
        return Default.processRows(responseFile).then((responseRow) => {
          return responseRow
        })
      })
      console.log(jsonData)
    } else {
      console.log("Nenhum arquivo selecionado");
    }
    setLoadFile(false);
  };

  return (
    <Content titulo="Página de Dados" pagina="/database">
      <div className={style.buttons}>
        <Button
          className={style.button_upload}
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          {selectedFile ? selectedFile.name : 'Upload File'}
          <input
            type="file"
            hidden
            accept=".xlsx,.csv" 
            onChange={handleFileChange}
          />
        </Button>
        
        <Button
          className={style.button_submit}
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedFile || loadFile}
        >
          Enviar
        </Button>

        {loadFile && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </Content>
  );
}
