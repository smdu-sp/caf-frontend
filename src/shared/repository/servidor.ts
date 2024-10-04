import { Servidor } from "@/interface/dto/servidor.dto";
import { pegarSessaoUsuario } from "../services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class ServidorRepository {
    static token:string = "";

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            ServidorRepository.token = session.access_token;
        }
    }

    static async getServidores() {
        await ServidorRepository.initializeToken();
        
        const response = await fetch(`${baseURL}servidores`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ServidorRepository.token}`
            }
        });

        const servidores = await response.json();
        return servidores;
    }

    static async postServidor(servidor: Servidor) {
        await ServidorRepository.initializeToken();
    
        const response = await fetch(`${baseURL}servidores`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ServidorRepository.token}`
            },
            body: JSON.stringify(servidor) 
        });
        
        console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const sevidorResponse = await response.json();
        return sevidorResponse;
    }

    static async deleteAllServidores() {
        await ServidorRepository.initializeToken();
    
        const response = await fetch(`${baseURL}servidores`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ServidorRepository.token}`
            }
        });
    
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
    
        return await response.json();
    }
}
