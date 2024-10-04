export enum Tipo_Cargo {
    EFETIVO = "EFETIVO",
    COMISSIONADO = "COMISSIONADO"
}

export class Cargo {
    nome: string;    
    codigo: string;  
    tipo: Tipo_Cargo;
    status: boolean; 

    constructor({
        nome,
        codigo,
        tipo,
        status = true, 
    }: {
        nome: string;
        codigo: string;
        tipo: Tipo_Cargo; 
        status?: boolean; 
    }) {
        this.nome = nome;
        this.codigo = codigo;
        this.tipo = tipo;
        this.status = status;
    }
}
