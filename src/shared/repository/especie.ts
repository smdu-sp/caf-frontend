import { Especie } from "@/interface/dto/especie.dto";
import { pegarSessaoUsuario } from "../services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class EspecieRepository {
    static token:string = "";

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            EspecieRepository.token = session.access_token;
        }
    }

    static async getEspecies() {
        await EspecieRepository.initializeToken();
        
        const response = await fetch(`${baseURL}especie`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${EspecieRepository.token}`
            }
        });

        const especie = await response.json();
        return especie;
    }

    static async postEspecie(especie: Especie) {
        await EspecieRepository.initializeToken();
    
        const response = await fetch(`${baseURL}especie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${EspecieRepository.token}`
            },
            body: JSON.stringify(especie) 
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const especieResponse = await response.json();
        return especieResponse.id;
    }

    static async deleteAllEspecies() {
        await EspecieRepository.initializeToken();

        const response = await fetch(`${baseURL}especie`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${EspecieRepository.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        return await response.json();
    }
}