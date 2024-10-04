import { Permissao, Tipo_Usuario, UsuarioDto } from '@/interface/dto/usuario.dto';
import * as XLSX from 'xlsx';
import { Servidor } from '@/interface/dto/servidor.dto';
import { Cargo, Tipo_Cargo } from '@/interface/dto/cargo.dto';
import { CargoRef } from '@/interface/dto/cargo-ref.dto';
import { Especie } from '@/interface/dto/especie.dto';
import { ServidorCargo } from '@/interface/dto/servidor-cargo.dto';
import { TipoEvento } from '@/interface/dto/tipo-evento.dto';
import { UnidadeRepository } from '@/shared/repository/unidade';
import { UsuarioRepository } from '@/shared/repository/usuario';
import { CargoRepository } from '@/shared/repository/cargo';
import { CargoRefRepository } from '@/shared/repository/cargo-ref';
import { TipoEventoRepository } from '@/shared/repository/tipo-evento';
import { EspecieRepository } from '@/shared/repository/especie';
import { ServidorRepository } from '@/shared/repository/servidor';
import { ServidorCargoRepository } from '@/shared/repository/servidor-cargo';

export default class Default {
  // Função para converter números de datas do Excel para o formato ISO 8601
  static excelDateToISO(excelDate: number): string {
    // O Excel conta a partir de 30 de dezembro de 1899
    const excelStartDate = new Date(1899, 11, 30);
    const jsDate = new Date(excelStartDate.getTime() + excelDate * 24 * 60 * 60 * 1000);
    
    // Retornar a data em formato ISO 8601
    return jsDate.toISOString();
  }

  static async processFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      // Verifica se o arquivo é xlsx ou csv
      const isXlsx = file.name.endsWith('.xlsx');
      const isCsv = file.name.endsWith('.csv');
  
      reader.onload = (event) => {
        if (isXlsx) {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
  
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
  
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const headers = jsonData[0];
          const rows = jsonData.slice(1);
  
          // Lista de cabeçalhos que devem ser convertidos para ISO 8601
          const dateColumns = ['Início', 'InícioExerc', 'InícioRem', 'Término', 'FimRem'];
  
          const result = rows.map((row: any[]) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              const formattedHeader = header.replace(/\.| /g, '');
              const cellValue = row[index];
  
              // Verificar se o cabeçalho está na lista de colunas de data
              if (dateColumns.includes(formattedHeader)) {
                // Remover o ponto e converter para número, se necessário
                const cleanedValue = typeof cellValue === 'number' ? cellValue : parseFloat(cellValue?.toString().replace(/\./g, '') || 'NaN');
                if (!isNaN(cleanedValue)) {
                  rowData[formattedHeader] = Default.excelDateToISO(cleanedValue);
                } else {
                  rowData[formattedHeader] = null; // Se não for um número válido, atribuir null
                }
              } else {
                rowData[formattedHeader] = cellValue || null;
              }
            });
            return rowData;
          });
          resolve(result);
        } else if (isCsv) {
          const csvData = new TextDecoder('ISO-8859-1').decode(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(csvData, { type: 'string' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const headers = jsonData[0];
          const rows = jsonData.slice(1);
  
          const dateColumns = ['Início', 'InícioExerc', 'InícioRem', 'Término', 'FimRem'];
  
          const result = rows.map((row: any[]) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              const formattedHeader = header.replace(/\.| /g, '');
              const cellValue = row[index];
  
              // Verificar se o cabeçalho está na lista de colunas de data
              if (dateColumns.includes(formattedHeader)) {
                // Remover o ponto e converter para número, se necessário
                const cleanedValue = typeof cellValue === 'number' ? cellValue : parseFloat(cellValue?.toString().replace(/\./g, '') || 'NaN');
                if (!isNaN(cleanedValue)) {
                  rowData[formattedHeader] = Default.excelDateToISO(cleanedValue);
                } else {
                  rowData[formattedHeader] = null; // Se não for um número válido, atribuir null
                }
              } else {
                rowData[formattedHeader] = cellValue || null;
              }
            });
            return rowData;
          });
          resolve(result);
        } else {
          reject(new Error('Formato de arquivo não suportado. Use .xlsx ou .csv.'));
        }
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      if (isXlsx) {
        reader.readAsArrayBuffer(file);
      } else if (isCsv) {
        reader.readAsArrayBuffer(file);
      }
    });
  }  

  static async processRows(data: any[]) {
    const unidades = await UnidadeRepository.getUnidades();
    // ...

    let usuario_id;
    let cargo_id;
    let cargo_ref_id;
    let servidor_id;
    let especie_id;
    let tipo_evento_id;
    
    // for (let index = 0; index < data.length; index++) {
    for (let index = 0; index < 1; index++) {
      try {        
        await ServidorCargoRepository.deleteAllServidorCargos()
        await UsuarioRepository.deleteAllUsuarios()
        await ServidorRepository.deleteAllServidores()
        await CargoRepository.deleteAllCargos()
        await CargoRefRepository.deleteAllCargosReferencias()
        await EspecieRepository.deleteAllEspecies()
        await TipoEventoRepository.deleteAllTiposEvento()
  
        let unidade_real = null;
  
        const row = data[index];
  
        for (const unidade of unidades) {
          if (unidade.codigo === String(row.Unid)) {
            unidade_real = unidade;
            break;
          }
        }
        
        const cargo: Cargo = new Cargo({
          nome: row.nomecargo2,
          codigo: String(row.Cargo),
          tipo: row.RelJurAdm === "EM COMISSAO" ? Tipo_Cargo.COMISSIONADO : Tipo_Cargo.EFETIVO,
          status: true
        });
        
        cargo_id = await CargoRepository.postCargos(cargo);
        
        const cargoRef: CargoRef = new CargoRef({
          nome: row.Ref
        });
        
        cargo_ref_id = await CargoRefRepository.postCargoRef(cargoRef);
        
        const tipoEvento: TipoEvento = new TipoEvento({
          nome: row.Ref
        });
  
        tipo_evento_id = await TipoEventoRepository.postTipoEvento(tipoEvento);
        
        const especie = new Especie({
          nome: row.Espécie
        });
        
        especie_id = await EspecieRepository.postEspecie(especie);
  
        const usuario: UsuarioDto = new UsuarioDto({
          tipo: Tipo_Usuario.SERVIDOR,
          nome: row.Nome,
          login: "loginTeste", // TO SEE
          email: "email@teste.com", // TO SEE
          criadoEm: new Date(),
          permissao: Permissao.USR,
          status: 1,
          ultimologin: new Date(),
          atualizadoEm: new Date(),
          unidade_id: unidade_real ? unidade_real.id : null
        });
  
        usuario_id = await UsuarioRepository.postUsuario(usuario);
        
        const servidor = new Servidor({
          usuario_id: String(usuario_id),
          rf: String(row.Número),
          cargos: [String(cargo_id)]
        });
        
        await ServidorRepository.postServidor(servidor);        
        servidor_id = usuario_id;
        
        const servidorCargo = new ServidorCargo({
          inicio: row.Início,
          termino: row.Término,
          inicio_exerc: row.InícioExerc,
          vinculo: row.Vínculo,
          inicio_rem: row.Inicio_rem,
          fim_rem: row.FimRem,
          observacao: row.Obs || null,
          vaga: row.Vaga,
          servidor_id: servidor_id,
          especie_id: especie_id,
          cargo_id: cargo_id,
          cargo_referencia_id: cargo_ref_id,
          tipo_evento_id: tipo_evento_id,
          unidade_id: unidade_real ? unidade_real.id : null,
          titular_rf: String(row.Número),
        });
  
        const result = await ServidorCargoRepository.postServidorCargo(servidorCargo);
      } catch (error) {
        console.log(data[index])
      }
    }
  }
}
