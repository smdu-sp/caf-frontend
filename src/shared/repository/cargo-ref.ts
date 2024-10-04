import { CargoRef } from "@/interface/dto/cargo-ref.dto";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";
import { pegarSessaoUsuario } from "../services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class CargoRefRepository {
    static token:string = "";

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            CargoRefRepository.token = session.access_token;
        }
    }
    static async getCargosRef() {
        await CargoRefRepository.initializeToken();
        
        const response = await fetch(`${baseURL}cargos-referencias`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CargoRefRepository.token}`
            }
        });

        const cargosRef = await response.json();
        return cargosRef;
    }

    static async postCargoRef(cargoRef: CargoRef) {
        await CargoRefRepository.initializeToken();
    
        const response = await fetch(`${baseURL}cargos-referencias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CargoRefRepository.token}`
            },
            body: JSON.stringify(cargoRef) 
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const cargorefResponse = await response.json();
        return cargorefResponse.id;
    }

    static async deleteAllCargosReferencias() {
        await CargoRefRepository.initializeToken();

        const response = await fetch(`${baseURL}cargos-referencias`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CargoRefRepository.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        return await response.json();
    }
}