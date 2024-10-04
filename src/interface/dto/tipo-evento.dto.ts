export class TipoEvento {
    nome: string;    

    constructor({
        nome,
    }: {
        nome: string;
    }) {
        this.nome = nome;
    }
}
