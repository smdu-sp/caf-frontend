export class Servidor {
    usuario_id: string; 
    rf: string;         
    cargos: string[];  

    constructor({
        usuario_id,
        rf,
        cargos = [] 
    }: { 
        usuario_id: string; 
        rf: string; 
        cargos?: string[];
    }) {
        this.usuario_id = usuario_id;
        this.rf = rf;
        this.cargos = cargos;
    }
}
