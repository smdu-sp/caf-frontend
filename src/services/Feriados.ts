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

export interface IFeriadoCriar {
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

export interface ICriarFeriado extends Partial<IFeriado> { }

export interface IAtualizarFerido extends Partial<ICriarFeriado> { }

const baseURL = 'http://localhost:3000/feriado/';


async function buscarPorAno(ano: string, pagina: number, limite: number, buscar: string, status: number) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}ano/${ano}?pagina=${pagina}&limite=${limite}&buscra=${buscar}&status=${status}`, {
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

async function buscarData(data: string, pagina: number, limite: number, total: number) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}data/${data}?pagina=${pagina}&limite=${limite}&status=${status}`, {
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

async function buscarPeriodo(data1: string, data2: string, pagina: number, limite: number, buscar: string) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}data/${data1}/${data2}?pagina=${pagina}&limite=${limite}&buscra=${buscar}`, {
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

async function buscarTudo(pagina: number, limite: number, buscar?: string, status?: number) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}buscar/feriados?pagina=${pagina}&limite=${limite}&buscra=${buscar}&status=${status}`, {
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

async function alterarFeriado(id: string) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}status/${id}`, {
        method: "PATCH",
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

async function alterarFeriadoRecorrente(id: string) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}recorrente/status/${id}`, {
        method: "PATCH",
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

async function buscarFeriadosInativos() {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}feriados-inativos`, {
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

async function buscarFeriadosRecorrentes(pagina: number, limite: number, buscar?: string, status?: number) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}recorrentes?pagina=${pagina}&limite=${limite}&buscra=${buscar}&status=${status}`, {
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

async function verica(data: string) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}data/${data}`, {
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
    const subprefeituras = await fetch(`${baseURL}buscarTudo?status=${status}&pagina=${pagina}&limite=${limite}&busca=${busca}`, {
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

async function criar(nome: string, data: Date, tipo: string, nivel: string, status: number, modo: number, descricao?: string): Promise<IFeriadoCriar> {
    const session = await getServerSession(authOptions);
    const subprefeituras = await fetch(`${baseURL}criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
        nome, data, tipo, nivel, status, modo, descricao
        })
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
    buscar,
    criar,
    alterarFeriado,
    alterarFeriadoRecorrente,
    verica
}