export interface DadosPessoais {
    nome: string;
    cpf: string;
    sexo?: string;
    data_nascimento?: string;
    idade?: number;
    natural_de?: string;
    estado_civil?: string;
    endereco: string;
    ponto_de_referencia?: string;
    numero: string;
    bairro: string;
    telefone_1: string;
    telefone_2?: string;
    email: string;
}

export interface DadosMoradia {
    tipo_de_moradia?: string;
    tipo_de_construcao?: string;
    cedida?: string;
    cedida_por_quem?: string;
    financiada?: string;
    valor_do_financiamento?: string;
    numero_de_comodos?: string;
}

export interface SituacaoEconomicaFamilair {
    atividade_remunerada?: string;
    profissao?: string;
    renda_recebida?: string;
    auxilio_do_governo?: string;
}

export interface ComposicaoFamiliar {
    nome?: string;
    idade?: string;
    sexo?: string;
    parentesco?: string;
    ocupacao?: string;
    renda_mensal?: string;
    cpf?: string;
}

export interface CestasEntregues {
    data_de_entrega: string,
    voluntario: string
}

export interface Familia{
    _id: string,
    dados_pessoais: DadosPessoais,
    dados_moradia: DadosMoradia,
    situacao_economica_familiar: SituacaoEconomicaFamilair,
    composicao_familiar: ComposicaoFamiliar[],
    cadastrado_por: string,
    data_de_cadastro: string,
    id_voluntario: string,
    cestas_entregues: CestasEntregues[],
    observacoes: string
}