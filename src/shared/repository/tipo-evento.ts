import { TipoEvento } from "@/interface/dto/tipo-evento.dto";
import { pegarSessaoUsuario } from "../services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class TipoEventoRepository {
    static token:string = "";

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            TipoEventoRepository.token = session.access_token;
        }
    }

    static async getTiposEventos() {
        await TipoEventoRepository.initializeToken();
        
        const response = await fetch(`${baseURL}tipo-evento`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TipoEventoRepository.token}`
            }
        });

        const tiposEventos = await response.json();
        return tiposEventos;
    }

    static async postTipoEvento(tipoEvento: TipoEvento) {
        await TipoEventoRepository.initializeToken();
    
        const response = await fetch(`${baseURL}tipo-evento`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TipoEventoRepository.token}`
            },
            body: JSON.stringify(tipoEvento) 
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const tipoEventoResponse = await response.json();
        return tipoEventoResponse.id;
    }

    static async deleteAllTiposEvento() {
        await TipoEventoRepository.initializeToken();

        const response = await fetch(`${baseURL}tipo-evento`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TipoEventoRepository.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        return await response.json();
    }
}