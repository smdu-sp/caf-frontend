import CompleteTableRow from '@/interface/CompletTableRow'; 

export default class Data {
    // Atualizando a função createData para usar CompleteTableRow
    static createData(
        nomeCompleto: string,
        registroFuncional: string,
        cpf: string,
        nomeSocial: string,
        sexo: string,
        racaCor: string,
        grupoSanguineo: string,
        dataNascimento: string,
        pais: string,
        possuidorDeficiencia: boolean,
        tipoDeficiencia: string,
        uf: string,
        cidade: string,
        estadoCivil: string,
        escolaridade: string,
        nacionalidade: string,
        numIdentidadeProfissional: string,
        conselhoIdentidadeProfissional: string,
        profissaoIdentidadeProfissional: string,
        dataExpedicaoIdentidadeProfissional: string,
        especificacaoFormacao: string,
        anoChegadaBrasil: number,
        anoPrimeiroEmprego: number,
        existenciaCadastroCertidoes: string,
        endereco: string,
        cargoFuncao: string,
        referenciaCargoFuncao: string,
        provimentoCargoFuncao: string,
        dataInicioCargoFuncao: string,
        dataExoneracaoCargoFuncao: string,
        codigoUnidadeSIMPROC: string,
        codigoUnidadeSEI: string,
        cargoComissao: string,
        referenciaCargoComissao: string,
        dataInicioCargoComissao: string,
        dataTerminoCargoComissao: string,
        unidadeLotacaoCargoComissao: string,
        departamentoCoordenadoriaCargoComissao: string,
        provimentoCargas: string,
        cargosLivresOcupados: string,
        impedimentosLegais: string,
        dataInicioImpedimentosLegais: string,
        dataTerminoImpedimentosLegais: string
    ): CompleteTableRow {
        return {
            nomeCompleto,
            registroFuncional,
            cpf,
            nomeSocial,
            sexo,
            racaCor,
            grupoSanguineo,
            dataNascimento,
            pais,
            possuidorDeficiencia,
            tipoDeficiencia,
            uf,
            cidade,
            estadoCivil,
            escolaridade,
            nacionalidade,
            numIdentidadeProfissional,
            conselhoIdentidadeProfissional,
            profissaoIdentidadeProfissional,
            dataExpedicaoIdentidadeProfissional,
            especificacaoFormacao,
            anoChegadaBrasil,
            anoPrimeiroEmprego,
            existenciaCadastroCertidoes,
            endereco,
            cargoFuncao,
            referenciaCargoFuncao,
            provimentoCargoFuncao,
            dataInicioCargoFuncao,
            dataExoneracaoCargoFuncao,
            codigoUnidadeSIMPROC,
            codigoUnidadeSEI,
            cargoComissao,
            referenciaCargoComissao,
            dataInicioCargoComissao,
            dataTerminoCargoComissao,
            unidadeLotacaoCargoComissao,
            departamentoCoordenadoriaCargoComissao,
            provimentoCargas,
            cargosLivresOcupados,
            impedimentosLegais,
            dataInicioImpedimentosLegais,
            dataTerminoImpedimentosLegais
        };
    }

    // Atualizando get_data_test para usar CompleteTableRow e a nova função createData
    static get_data_test(): CompleteTableRow[] {
        const rows: CompleteTableRow[] = [
            Data.createData('Lucas', 'RF123', '123.456.789-00', '', 'Masculino', 'Branco', 'A-', '01/01/1980', 'Brasil', true, 'autismo', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('João', 'RF123', '123.111.789-00', '', 'Masculino', 'Preto', 'B+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Fundamental', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Marta', 'RF123', '123.222.789-00', '', 'Feminino', 'Preto', 'O-', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Casado', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Gabriela', 'RF123', '123.333.789-00', '', 'Feminino', 'Pardo', 'AB+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Lucas', 'RF123', '123.456.789-00', '', 'Masculino', 'Branco', 'A-', '01/01/1980', 'Brasil', true, 'autismo', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('João', 'RF123', '123.111.789-00', '', 'Masculino', 'Preto', 'B+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Fundamental', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Marta', 'RF123', '123.222.789-00', '', 'Feminino', 'Preto', 'O-', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Casado', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Gabriela', 'RF123', '123.333.789-00', '', 'Feminino', 'Pardo', 'AB+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Lucas', 'RF123', '123.456.789-00', '', 'Masculino', 'Branco', 'A-', '01/01/1980', 'Brasil', true, 'autismo', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('João', 'RF123', '123.111.789-00', '', 'Masculino', 'Preto', 'B+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Fundamental', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Marta', 'RF123', '123.222.789-00', '', 'Feminino', 'Preto', 'O-', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Casado', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Gabriela', 'RF123', '123.333.789-00', '', 'Feminino', 'Pardo', 'AB+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Lucas', 'RF123', '123.456.789-00', '', 'Masculino', 'Branco', 'A-', '01/01/1980', 'Brasil', true, 'autismo', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('João', 'RF123', '123.111.789-00', '', 'Masculino', 'Preto', 'B+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Fundamental', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Marta', 'RF123', '123.222.789-00', '', 'Feminino', 'Preto', 'O-', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Casado', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Gabriela', 'RF123', '123.333.789-00', '', 'Feminino', 'Pardo', 'AB+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Lucas', 'RF123', '123.456.789-00', '', 'Masculino', 'Branco', 'A-', '01/01/1980', 'Brasil', true, 'autismo', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('João', 'RF123', '123.111.789-00', '', 'Masculino', 'Preto', 'B+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Fundamental', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Marta', 'RF123', '123.222.789-00', '', 'Feminino', 'Preto', 'O-', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Casado', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Gabriela', 'RF123', '123.333.789-00', '', 'Feminino', 'Pardo', 'AB+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Lucas', 'RF123', '123.456.789-00', '', 'Masculino', 'Branco', 'A-', '01/01/1980', 'Brasil', true, 'autismo', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('João', 'RF123', '123.111.789-00', '', 'Masculino', 'Preto', 'B+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Fundamental', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Marta', 'RF123', '123.222.789-00', '', 'Feminino', 'Preto', 'O-', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Casado', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            Data.createData('Gabriela', 'RF123', '123.333.789-00', '', 'Feminino', 'Pardo', 'AB+', '01/01/1980', 'Brasil', false, '', 'SP', 'São Paulo', 'Solteiro', 'Superior', 'Brasileira', '', '', '', '', '', 2000, 2010, '', 'Centro, São Paulo, SP', 'Engenheiro', 'A1', 'Concurso', '01/01/2010', '', '001', '002', 'Não', '', '', '', '', '', '', '','','',''),
            // Adicione mais linhas conforme necessário...
        ].sort((a, b) => (a.nomeCompleto < b.nomeCompleto ? -1 : 1));

        return rows;
    }

    // Atualizando get_column para retornar os nomes das colunas da nova interface CompleteTableRow
    static get_column(): string[] {
        return [
            'nomeCompleto',
            'registroFuncional',
            'cpf',
            'nomeSocial',
            'sexo',
            'racaCor',
            'grupoSanguineo',
            'dataNascimento',
            'pais',
            'possuidorDeficiencia',
            'tipoDeficiencia',
            'uf',
            'cidade',
            'estadoCivil',
            'escolaridade',
            'nacionalidade',
            'numIdentidadeProfissional',
            'conselhoIdentidadeProfissional',
            'profissaoIdentidadeProfissional',
            'dataExpedicaoIdentidadeProfissional',
            'especificacaoFormacao',
            'anoChegadaBrasil',
            'anoPrimeiroEmprego',
            'existenciaCadastroCertidoes',
            'endereco',
            'cargoFuncao',
            'referenciaCargoFuncao',
            'provimentoCargoFuncao',
            'dataInicioCargoFuncao',
            'dataExoneracaoCargoFuncao',
            'codigoUnidadeSIMPROC',
            'codigoUnidadeSEI',
            'cargoComissao',
            'referenciaCargoComissao',
            'dataInicioCargoComissao',
            'dataTerminoCargoComissao',
            'unidadeLotacaoCargoComissao',
            'departamentoCoordenadoriaCargoComissao',
            'provimentoCargas',
            'cargosLivresOcupados',
            'impedimentosLegais',
            'dataInicioImpedimentosLegais',
            'dataTerminoImpedimentosLegais'
        ];
    }

    // Atualizando filter_rows para usar CompleteTableRow
    static filter_rows(rows: CompleteTableRow[], column: string, value: string): CompleteTableRow[] {
        return rows.filter(row => {
            const cellValue = row[column as keyof CompleteTableRow];
            if (typeof cellValue === 'string') {
                return cellValue.toLowerCase().includes(value.toLowerCase());
            } else if (typeof cellValue === 'number') {
                return cellValue.toString().includes(value);
            }
            return false;
        });
    }

    // Atualizando format_filter_rows para usar CompleteTableRow
    static format_filter_rows(rows: CompleteTableRow[]): CompleteTableRow[] {
        return rows.map(row => ({
            ...row,
            pago: row.possuidorDeficiencia ? true : false,  // Exemplo de conversão para o campo 'pago'
            valor: 0,  // Ajuste conforme necessário
        }));
    }    
}
