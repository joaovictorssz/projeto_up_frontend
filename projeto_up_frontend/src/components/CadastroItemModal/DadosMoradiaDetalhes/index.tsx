import { DadosMoradia } from "@/@types/Familia";

export default function DadosMoradiaDetalhes({dados_moradia}: {dados_moradia: DadosMoradia}){
    return(
        <div>
            

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Tipo de construção:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_moradia.tipo_de_construcao ? dados_moradia.tipo_de_construcao : 'Vazio'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Nº de cômodos:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_moradia.numero_de_comodos ? dados_moradia.numero_de_comodos : 'Vazio'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Financiada:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_moradia.financiada ? dados_moradia.financiada : 'Vazio'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Valor do financiamento:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_moradia.valor_do_financiamento ? dados_moradia.valor_do_financiamento : 'Vazio'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Cedida:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_moradia.cedida ? dados_moradia.cedida : 'Vazio'}</p>
            </span>

            <span className="flex items-center my-4">
                <h3 className="mr-4 font-semibold w-32">Cedida por quem:</h3>
                <p className="p-2 border border-slate-200 w-full rounded">{dados_moradia.cedida_por_quem ? dados_moradia.cedida_por_quem : 'Vazio'}</p>
            </span>

        </div>
    )
}