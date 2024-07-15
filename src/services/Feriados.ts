'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

export interface IFeriado {
    id: string;
    nome: string;
    data: Date;
    tipo: string;
    nivel: string;
    status: number;
    modo: number;
    descricao?: String;
}

export interface ICriarFeriado extends Partial<IFeriado> {}

export interface IAtualizarFerido extends Partial<ICriarFeriado> {}

const baseURL = 'http://10.75.32.170:3030/';


async function buscarPorAno(ano: string){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}feriados/ano/${ano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return reunoes;
}

async function buscarData(data: string){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}feriados/data/${data}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return reunoes;
}

async function buscarPeriodo(data1: string, data2: string){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}feriados/data/${data1}/${data2}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return reunoes;
}

async function buscarTudo(){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}feriados/buscar`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return reunoes;
}

export {
    buscarPorAno,
    buscarData,
    buscarPeriodo,
    buscarTudo
}