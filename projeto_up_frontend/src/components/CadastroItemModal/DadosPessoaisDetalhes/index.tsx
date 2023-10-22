import { DadosPessoais, Familia } from "@/@types/Familia";

export default function DadosPessoaisDetalhes({dados_pessoais}: {dados_pessoais: DadosPessoais}){
    return(
        <div>
            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Nome:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.nome ? dados_pessoais.nome : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Idade:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.idade ? dados_pessoais.idade : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Bairro:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.bairro ? dados_pessoais.bairro : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Rua:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.endereco ? dados_pessoais.endereco : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Número:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.numero ? dados_pessoais.numero : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Ponto de referência:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.ponto_de_referencia ? dados_pessoais.ponto_de_referencia : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Telefone 1:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.telefone_1 ? dados_pessoais.telefone_1 : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Telefone 2:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.telefone_2 ? dados_pessoais.telefone_2 : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">E-mail:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.email ? dados_pessoais.email : 'Não informado'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Estado civil:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.estado_civil ? dados_pessoais.estado_civil : 'Não informado'}</p>
            </span> 

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Nome social:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.nome_social ? dados_pessoais.nome_social : 'Não informado'}</p>
            </span> 
            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold  w-32">Sexo:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_pessoais.sexo ? dados_pessoais.sexo : 'Não informado'}</p>
            </span> 

            
        </div>
    )
}