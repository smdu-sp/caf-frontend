import { pegarSessaoUsuario } from "../services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class UnidadeRepository {
    static token:string = "";

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            UnidadeRepository.token = session.access_token;
        }
    }

    static async getUnidades() {
        await UnidadeRepository.initializeToken();

        const response = await fetch(`${baseURL}unidade/buscar-tudo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${UnidadeRepository.token}`
            }
        });

        const unidades = await response.json();
        return unidades;
    }
}