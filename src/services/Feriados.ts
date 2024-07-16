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

export interface IFeriadoPaginado {
    data: IFeriado[];
    total: number;
    pagina: number;
    limite: number;
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

async function buscarFeriadosInativos(){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}feriados/feriados-inativos`, {
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

async function buscarFeriadosRecorrentes() {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}feriados/recorrentes`, {
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

async function buscar(status: string, pagina: number, limite: number, busca: string): Promise<IFeriadoPaginado> {
    const session = await getServerSession(authOptions);
    const subprefeituras = await fetch(`http://localhost:3003/feriados/buscarTudo?status=${status}&pagina=${pagina}&limite=${limite}&busca=${busca}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return subprefeituras;
}

export {
    buscarPorAno,
    buscarData,
    buscarPeriodo,
    buscarTudo,
    buscarFeriadosInativos,
    buscarFeriadosRecorrentes,
    buscar
}