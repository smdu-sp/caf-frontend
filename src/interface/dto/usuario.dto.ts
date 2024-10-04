export enum Tipo_Usuario {
    SERVIDOR = 'SERVIDOR',
    TEMPORARIO = 'TEMPORARIO',
    ESTAGIARIO = 'ESTAGIARIO',
}
  
export enum Permissao {
    DEV = "DEV",
    ADM = "ADM",
    ELO = "ELO",
    USR = "USR"
}
  
export class UsuarioDto {
    tipo: Tipo_Usuario;
    nome: string;
    login: string;
    email: string;
    permissao: Permissao;
    status: number;
    ultimologin: Date;
    criadoEm: Date;
    atualizadoEm: Date;
    unidade_id?: string;
  
    constructor({
        tipo,
        nome,
        login,
        email,
        criadoEm,
        permissao = Permissao.USR, // Valor padrão
        status = 1,                // Valor padrão
        ultimologin = new Date(),
        atualizadoEm = new Date(),
        unidade_id
    }: Partial<UsuarioDto> & { tipo: Tipo_Usuario; nome: string; login: string; email: string; criadoEm: Date }) {
        this.tipo = tipo;
        this.nome = nome;
        this.login = login;
        this.email = email;
        this.permissao = permissao;
        this.status = status;
        this.ultimologin = ultimologin;
        this.criadoEm = criadoEm;
        this.atualizadoEm = atualizadoEm;
        this.unidade_id = unidade_id;
    }
}
  