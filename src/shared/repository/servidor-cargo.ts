import { ServidorCargo } from "@/interface/dto/servidor-cargo.dto";
import { pegarSessaoUsuario } from "@/shared/services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class ServidorCargoRepository {
    static token:string = "";

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            ServidorCargoRepository.token = session.access_token;
        }
    }

    static async getServidorCargo() {
        await ServidorCargoRepository.initializeToken();
        
        const response = await fetch(`${baseURL}servidor-cargo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ServidorCargoRepository.token}`
            }
        });

        const servidorCargo = await response.json();
        return servidorCargo;
    }

    static async postServidorCargo(servidorCargo: ServidorCargo) {
        await ServidorCargoRepository.initializeToken();
    
        const response = await fetch(`${baseURL}servidor-cargo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ServidorCargoRepository.token}`
            },
            body: JSON.stringify(servidorCargo) 
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const sevidorCargoResponse = await response.json();
        return sevidorCargoResponse.id;
    }

    static async deleteAllServidorCargos() {
        await ServidorCargoRepository.initializeToken();

        const response = await fetch(`${baseURL}servidor-cargo`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ServidorCargoRepository.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        return await response.json();
    }
}