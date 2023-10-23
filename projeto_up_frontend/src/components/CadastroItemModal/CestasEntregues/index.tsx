import { CestasEntregues } from "@/@types/Familia";
import CadastrarCestaAlerta from "@/components/CadastrarCestaAlerta";
import {BsFillBagHeartFill} from 'react-icons/bs'
export default function CestasEntreguesDetalhes({cestas_entregues, _id}: {cestas_entregues: CestasEntregues[], _id: string}){
    return(
        <div>
            {cestas_entregues.length === 0 && <p className="py-10">Essa família ainda não recebeu nenhuma cesta.</p>}
            {cestas_entregues.length > 0 && 
            
            <div>
                {cestas_entregues.map((cesta_entregue, id)=>{
                    return (
                    <section key={id} className="flex items-center bg-neutral-100 px-4 py-4 border border-slate-200 rounded my-2">
                    <span>
                        <div className="p-3 bg-sky-800 rounded text-white">
                            <BsFillBagHeartFill/>
                        </div>
                        
                    </span>

                    <span className="ml-6">
                    
                        <h1>Entregue por: {cesta_entregue.voluntario}</h1>
                        <p>Data: {cesta_entregue.data_de_entrega}</p>

                    </span>    
                    </section>)
                })}
            </div>
            
            }

            <section className="w-full flex justify-end mt-6">
                <CadastrarCestaAlerta _id={_id} cestas_cadastradas={cestas_entregues}/>
            </section>
        </div>
    )
}