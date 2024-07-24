import { Row } from './Row';

export class TableRow implements Row {
    nomeSocial: string;
    registroFuncional: string;
    nome: any;
    registroFuncional2: string;
    substituto: string;
    cargo: string;
    referencia: string;
    mesRef: Date;
    inicio: Date;
    fim: Date;
    motivo: string;
    doc: Date;
    conferencia: string;
    observaçao: string;
    
    constructor(
        nomeSocial: string,
        registroFuncional: string,
        nome: any,
        registroFuncional2: string,
        substituto: string,
        cargo: string,
        referencia: string,
        mesRef: Date,
        inicio: Date,
        fim: Date,
        motivo: string,
        doc: Date,
        conferencia: string,
        observaçao: string
    ) {
        this.registroFuncional2 = registroFuncional2;
        this.nome = nome;
        this.registroFuncional = registroFuncional;
        this.substituto = substituto;
        this.cargo = cargo;
        this.referencia = referencia;
        this.nomeSocial = nomeSocial
        this.mesRef = mesRef
        this.inicio = inicio
        this.fim = fim
        this.motivo = motivo
        this.doc = doc
        this.conferencia = conferencia
        this.observaçao = observaçao
    }
   
}
