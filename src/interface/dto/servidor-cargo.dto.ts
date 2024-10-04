export class ServidorCargo {
    inicio: string;                     
    termino: string;                    
    inicio_exerc: string;               
    vinculo: number;                  
    inicio_rem: string;                 
    fim_rem: string;                    
    observacao: string | null;        
    vaga: number;                     
    servidor_id: string;              
    especie_id: string;               
    cargo_id: string;                 
    cargo_referencia_id: string;      
    tipo_evento_id: string;           
    unidade_id: string;               
    titular_rf: string;               

    constructor({
        inicio,
        termino,
        inicio_exerc,
        vinculo,
        inicio_rem,
        fim_rem,
        observacao = null, 
        vaga,
        servidor_id,
        especie_id,
        cargo_id,
        cargo_referencia_id,
        tipo_evento_id,
        unidade_id,
        titular_rf,
    }: {
        inicio: string;               
        termino: string;              
        inicio_exerc: string;         
        vinculo: number;              
        inicio_rem: string;           
        fim_rem: string;              
        observacao?: string | null;   
        vaga: number;                 
        servidor_id: string;          
        especie_id: string;           
        cargo_id: string;             
        cargo_referencia_id: string;  
        tipo_evento_id: string;       
        unidade_id: string;           
        titular_rf: string;           
    }) {
        this.inicio = inicio;
        this.termino = termino;
        this.inicio_exerc = inicio_exerc;
        this.vinculo = vinculo;
        this.inicio_rem = inicio_rem;
        this.fim_rem = fim_rem;
        this.observacao = observacao;
        this.vaga = vaga;
        this.servidor_id = servidor_id;
        this.especie_id = especie_id;
        this.cargo_id = cargo_id;
        this.cargo_referencia_id = cargo_referencia_id;
        this.tipo_evento_id = tipo_evento_id;
        this.unidade_id = unidade_id;
        this.titular_rf = titular_rf;
    }
}
