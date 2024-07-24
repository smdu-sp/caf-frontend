"use client"
import Content from "@/components/Content";
import * as React from 'react';
import Calendar from "@/components/Calendar";
import { TextField } from "@mui/material";

export default function Frequencia (){
  return (
    <>
      <Content
        titulo='Página de frequência'
        pagina='/frequencia'
      >
        <Calendar></Calendar>
      </Content>
    </>
  );
};

