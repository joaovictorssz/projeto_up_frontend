import { ComposicaoFamiliar } from "@/@types/Familia";

export default function ComposicaoFamiliarDetalhes({composicao_familiar}:{composicao_familiar: ComposicaoFamiliar[]}){
    return(
        <div>
            {composicao_familiar.map((familiar, id)=>{
                return (
                <div key={id} className="flex flex-col bg-neutral-200 p-4 rounded my-4">

                    <span>  Nome: {familiar.nome ? familiar.nome : 'Não informado'}</span>
                    <span>Idade: {familiar.idade ? familiar.idade : 'Não informado'}</span>
                    <span>Sexo: {familiar.sexo ? familiar.sexo : 'Não informado'}</span>
                    <span>Ocupação: {familiar.ocupacao ? familiar.ocupacao : 'Não informado'}</span>
                    <span>Renda: {familiar.renda_mensal ? familiar.renda_mensal : 'Não informado'}</span>
                    <span>Parentesco: {familiar.parentesco ? familiar.parentesco : 'Não informado'}</span>
                    

                </div>
                )
            })}
        </div>
    )
}