import { DadosMoradia, SituacaoEconomicaFamilair } from "@/@types/Familia";

export default function SituacaoEconomicaFamiliarDetalhes({situacao_economica_familiar}: {situacao_economica_familiar: SituacaoEconomicaFamilair}){
    return(
        <div>
            

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Atividade remunerada:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{situacao_economica_familiar.atividade_remunerada ? situacao_economica_familiar.atividade_remunerada : 'Vazio'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Profissão:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{situacao_economica_familiar.profissao ? situacao_economica_familiar.profissao : 'Vazio'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Renda recebida:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{situacao_economica_familiar.renda_recebida ? situacao_economica_familiar.renda_recebida : 'Vazio'}</p>
            </span>

           
        </div>
    )
}