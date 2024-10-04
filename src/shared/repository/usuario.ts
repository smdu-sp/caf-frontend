import { UsuarioDto } from "@/interface/dto/usuario.dto";
import { desativarAll, pegarSessaoUsuario } from "../services/usuario.services";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

export class UsuarioRepository {
    static token:string = "";
    static user:any;

    static async initializeToken() {
        const session = await pegarSessaoUsuario();
        if (session){
            UsuarioRepository.token = session.access_token;
        }
    }

    static async getUsuarios() {
        await UsuarioRepository.initializeToken();
        
        const response = await fetch(`${baseURL}usuarios/buscar-tudo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${UsuarioRepository.token}`
            }
        });

        const usuarios = await response.json();
        return usuarios;
    }

    static async postUsuario(usuario: UsuarioDto) {
        await UsuarioRepository.initializeToken();
    
        const response = await fetch(`${baseURL}usuarios/criar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${UsuarioRepository.token}`
            },
            body: JSON.stringify(usuario) 
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const usuarioResponse = await response.json();
        return usuarioResponse.id;
    }

    static async deleteAllUsuarios() {
        return desativarAll()
    }    
}