export default interface CompleteTableRow {
    registroFuncional: string;
    nome: string;	
    vínculo: string;
    espécie?: string;	
    início?: Date;	
    término?: Date;	
    cargo?: string;	
    nomecargo2?: string;	
    ref?: string;	
    unid?: number;	
    nomesetor2?: string;	
    rel_Jur_Adm?: string;
    tipo_evento?: string;	
    início_exerc?: Date;	
    titular?: string;	
    numvinc_tit?: string;	
    nomefunc_tit?: string;	
    início_rem?: Date;	
    fim_rem?: Date;	
    obs?: string;
    vaga?: Date;
    [key: string]: any;
}




