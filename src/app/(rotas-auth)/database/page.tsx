"use client";
import Content from "@/components/Content";
import { Button } from '@mui/material';
import Default from '@/services/Database'; 
import { useState } from "react";

export default function Database() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Função para lidar com a seleção de arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Função para enviar o arquivo
  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        const jsonData = await Default.processFile(selectedFile);
        console.log("Dados em JSON:", jsonData);
      } catch (error) {
        console.error("Erro ao processar o arquivo:", error);
      }
    } else {
      console.log("Nenhum arquivo selecionado");
    }
  };

  return (
    <Content titulo="Página de Dados" pagina="/database">
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          hidden
          accept=".xlsx,.csv"  // Aceitar arquivos .xlsx ou .csv
          onChange={handleFileChange}
        />
      </Button>
      
      <Button
        variant="contained"
        onClick={handleSubmit}
      >
        Enviar
      </Button>
    </Content>
  );
}
