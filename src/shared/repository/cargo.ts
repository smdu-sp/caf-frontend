import { Cargo } from "@/interface/dto/cargo.dto";
import { pegarSessaoUsuario } from "../services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class CargoRepository {
    static token:string = "";

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            CargoRepository.token = session.access_token;
        }
    }

    static async getCargos() {
        await CargoRepository.initializeToken();
        
        const response = await fetch(`${baseURL}cargo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CargoRepository.token}`
            }
        });

        const cargos = await response.json();
        return cargos;
    }

    static async postCargos(cargo: Cargo) {
        await CargoRepository.initializeToken();
    
        const response = await fetch(`${baseURL}cargo/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CargoRepository.token}`
            },
            body: JSON.stringify(cargo) 
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const cargoResponse = await response.json();
        return cargoResponse.id;
    }

    static async deleteAllCargos() {
        await CargoRepository.initializeToken();

        const response = await fetch(`${baseURL}cargo`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CargoRepository.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        return await response.json();
    }
}