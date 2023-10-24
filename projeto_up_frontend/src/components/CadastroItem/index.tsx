import { Familia } from "@/@types/Familia";
import { MdFamilyRestroom } from 'react-icons/md'
import CadastroItemModal from "../CadastroItemModal";
export default function CadastroItem({familia, id}:{familia: Familia, id: number}){

    return(
        <div className={`p-2 w-full flex items-center ${id % 2 == 0 ? 'bg-white border border-slate-100' : 'bg-slate-100'}`}>
            <span className="bg-sky-800 rounded flex justify-center items-center w-8 text-white h-8">
                <MdFamilyRestroom></MdFamilyRestroom>
            </span>

            
            <div className="flex justify-between w-full px-6">
            <h1 className="font-semibold">{familia.dados_pessoais.nome}</h1>
            <span className="hidden md:block lg:block w-1/4"><span className="italic">Bairro:</span> {familia.dados_pessoais.bairro}</span>
                <span className="hidden md:block lg:block w-1/4"><span className="italic">Endereço:</span> {familia.dados_pessoais.endereco}, {familia.dados_pessoais.numero}</span>
                <span className="hidden md:block lg:block w-1/4"><span className="italic">Cadastro em:</span> {familia.data_de_cadastro}</span>
                
            </div>

            <CadastroItemModal familia={familia}/>
        </div>
    )

}