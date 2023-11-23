'use client'

import { ComposicaoFamiliar, DadosMoradia, DadosPessoais, Familia, SituacaoEconomicaFamilair } from "@/@types/Familia"
import { useUser } from "@/contexts/UserContext";
import { useState } from "react"
import { BsTrashFill } from 'react-icons/bs'
import {useForm} from 'react-hook-form'
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormType = {
    dados_pessoais: DadosPessoais,
    dados_moradia: DadosMoradia,
    situacao_economica_familiar: SituacaoEconomicaFamilair,
    observacoes: string
}

export default function AddFamily(){

    const { register, handleSubmit }  = useForm<FormType>()
    const dataDeHoje = new Date();
    const { user, setUser } = useUser()

    const { push } = useRouter()

    const dia = String(dataDeHoje.getDate()).padStart(2, '0');
    const mes = String(dataDeHoje.getMonth() + 1).padStart(2, '0'); // Lembre-se de adicionar +1, pois os meses são baseados em zero (janeiro é 0)
    const ano = dataDeHoje.getFullYear();
    
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const [tipoDeMoradia, setTipoDeMoradia] = useState<string>('')
    const [familyMembers, setFamilyMembers] = useState<ComposicaoFamiliar[]>([])
    const [member, setMember] = useState<ComposicaoFamiliar>({})
    const addFamilyMember = () =>{
        
        let array = [...familyMembers, member]
        setFamilyMembers(array)
    }

    const removeFammilyMMember = (id: number)=>{
        let array = familyMembers.slice(0, id).concat(familyMembers.slice(id + 1));
        setFamilyMembers(array)
    }

    const handleSubmitForm = async (data: FormType) =>{
        console.log(data)
        console.log(tipoDeMoradia)


        axios.post(`${process.env.NEXT_PUBLIC_API}/family/register`, {...data, composicao_familiar: familyMembers, cadastrado_por: user?.username, data_de_cadastro: dataFormatada,  id_voluntario: user?._id, cestas_entregues: []})
        .then(res=>{
            console.log(res)
            toast.success("Cadastro realizado com sucesso")
            axios.put(`${process.env.NEXT_PUBLIC_API}/users/update/${user?._id}`, {qtd_cadastros: user?.qtd_cadastros! + 1})
            setUser({_id: user?._id!, auditor: user?.auditor!, email: user?.email!, password: user?.password!, qtd_cadastros: user?.qtd_cadastros! + 1, username: user?.username!})
            push('/')
        })
        .catch(erro => {
            if(erro.response.data.message === 'Endereco já cadastrado'){
                toast.error("Esse endereço já foi cadastrado")
            }
        })


        
        
    
    }

    return(
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Novo cadastro</h1>

            <section className="border my-4 border-slate-200 p-4 rounded flex flex-col">

                <h1 className="font-semibold my-4">Dados pessoais</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <section className="flex flex-col">
                        <span>Nome:</span>
                        <input required {...register('dados_pessoais.nome')} type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                    </section>

                    <section className="flex flex-col">
                        <span>CPF:</span>
                        <input required  {...register('dados_pessoais.cpf')} type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <section className="flex flex-col">
                        <span>Sexo:</span>
                        <select  {...register('dados_pessoais.sexo')} className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3">
                            <option value="Masculino">Masculino</option>
                            <option value={'Feminino'}>Feminino</option>
                        </select>
                    </section>

                    <section className="flex flex-col">
                        <span>Idade:</span>
                        <input  {...register('dados_pessoais.idade')} type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                    </section>

                    <section className="flex flex-col">
                        <span>Data de nascimento:</span>
                        <input  {...register('dados_pessoais.data_nascimento')} type="date" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <section className="flex flex-col">
                        <span>Estado civil:</span>
                        <select  {...register('dados_pessoais.estado_civil')} className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3">
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="União Estável">União Estável</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                        <option value="Outro">Outro</option>
                        </select>
                    </section>

                    <section className="flex flex-col">
                        <span>Natural de:</span>
                        <input  {...register('dados_pessoais.natural_de')} type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <section className="flex flex-col">
                        <span>Rua:</span>
                        <input required {...register('dados_pessoais.endereco')} type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                    </section>

                    <section className="flex flex-col">
                        <span>Bairro:</span>
                        <input required  {...register('dados_pessoais.bairro')} type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                    </section>

                    <section className="flex flex-col">
                        <span>Número:</span>
                        <input required {...register('dados_pessoais.numero')} type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <section className="flex flex-col">
                        <span>Ponto de referência:</span>
                        <input  {...register('dados_pessoais.ponto_de_referencia')} type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                    </section>

                    <section className="flex flex-col">
                        <span>Telefone 1:</span>
                        <input required {...register('dados_pessoais.telefone_1')} type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                </div>

            </section>

            <section  className="border my-4 border-slate-200 p-4 rounded flex flex-col">
                <h1 className="font-semibold my-4">Dados da moradia</h1>

                <div className="grid grid-cols-2 gap-4">
                    <section className="flex flex-col">
                        <span>Tipo de moradia:</span>
                        <select  {...register('dados_moradia.tipo_de_moradia')} onChange={(e)=>setTipoDeMoradia(e.target.value)} className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3">
                            <option value="Própria">Própria</option>
                            <option value="Alugada">Alugada</option>
                            <option value="Cedida">Cedida</option>
                            <option value="Financiada">Financiada</option>
                        </select>
                    </section>

                    <section className="flex flex-col">
                        <span>Tipo de construção:</span>
                        <select {...register('dados_moradia.tipo_de_construcao')} className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3">
                            <option value="Própria">Alvenaria</option>
                            <option value="Alugada">Madeira</option>
                            <option value="União Estável">Mista</option>
                            <option value="Financiada">Outra</option>
                        </select>
                    </section>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    

                    {tipoDeMoradia === 'Cedida' ?
                    
                    <section className="flex flex-col">
                        <span>Por quem:</span>
                        <input {...register('dados_moradia.cedida_por_quem')} type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                    :
                    <section className="flex flex-col">
                        <span>Por quem:</span>
                        <input disabled {...register('dados_moradia.cedida_por_quem')} type="text" className="rounded cursor-not-allowed  bg-neutral-300 focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                    }

                    {
                        tipoDeMoradia === 'Financiada' ?
                        <section className="flex flex-col">
                        <span>Valor do financiamento:</span>
                        <input {...register('dados_moradia.valor_do_financiamento')} type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                    </section>
                    :
                    <section className="flex flex-col">
                        <span>Valor do financiamento:</span>
                        <input disabled {...register('dados_moradia.valor_do_financiamento')} type="text" className="rounded focus:outline-none focus:border-sky-800  cursor-not-allowed  bg-neutral-300 border border-slate-200 p-3" />
                    </section>
                    }
                </div>

                <div className="grid grid-cols-1 gap-4">
                    

                    <section className="flex flex-col">
                        <span>Número de cômodos:</span>
                        <input {...register('dados_moradia.numero_de_comodos')} type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
           
                    </section>

                    
                </div>
                
            </section>

            <section  className="border my-4 border-slate-200 p-4 rounded flex flex-col">
                <h1 className="font-semibold my-4">Situação econônomica:</h1>

                <div className="grid grid-cols-2 gap-4">
                    <section className="flex flex-col">
                        <span>Atividade remunerada:</span>
                        <select {...register('situacao_economica_familiar.atividade_remunerada')} className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3">
                            <option value="Estágio/Bolsa">Estágio/Bolsa</option>
                            <option value="Empresa Privada">Empresa Privada</option>
                            <option value="Trabalho autônomo">Trabalho autônomo</option>
                            <option value="Serviço Público Efetivo">Serviço Público Efetivo</option>
                            <option value="Serviço Público Temporário">Serviço Público Temporário</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </section>

                    <section className="flex flex-col">
                        <span>Profissão:</span>
                        <input {...register('situacao_economica_familiar.profissao')} type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />

                    </section>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <section className="flex flex-col">
                        <span>No caso de exercer atividade remunerada, qual a renda mensal:</span>
                        <select {...register('situacao_economica_familiar.renda_recebida')} className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3">
                            <option value="Até R$300,00">Até R$300,00</option>
                            <option value="De R$301,00 até R$500,00">De R$301,00 até R$500,00</option>
                            <option value="De R$501,00 até R$937,00">De R$501,00 até R$937,00</option>
                            <option value="De R$938,00 até 1,405,50">De R$938,00 até R$1.405,50</option>
                            <option value="De R$1.406,50 até R$1.874,00">De R$1.406,50 até R$1.874,00</option>
                            <option value="De R$1.875,00 a R$2.342,50">De R$1.875,00 até R$2.342,50</option>
                            <option value="De R$2.343,50 até R$2.811,00">De R$2.343,50 até R$2.811,00</option>
                            <option value="De R$1.872.812,00 até R$4.685,00">De R$1.872.812,00 até R$4.685,00</option>
                            <option value="Acima de R$4.685,00">Acima de R$4.685,00</option>
                        </select>
                    </section>

                </div>

                <div className="grid grid-cols-1 gap-4">
                    <section className="flex flex-col">
                        <span>Recebe algum auxílio do governo? Se sim, qual?</span>
                        <input {...register('situacao_economica_familiar.auxilio_do_governo')} type="text" className="rounded focus:outline-none focus:border-sky-800  bg-neutral-200 border border-slate-200 p-3" />

                    </section>

                </div>
                
            </section>

            <section  className="border my-4 border-slate-200 p-4 rounded flex flex-col">
                <h1 className="font-semibold my-4">Composição familiar</h1>

                <div className="w-full h-full flex flex-col md:flex-row lg:flex-row">
                <aside className="w-full md:w-3/5 lg:w-3/5">
                    <div className="grid grid-cols-2 gap-4">
                        <section className="flex flex-col">
                            <span>Nome:</span>
                            <input onChange={(e)=>setMember({...member, nome: e.target.value})}  type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                        </section>

                        <section className="flex flex-col">
                            <span>Idade:</span>
                            <input  onChange={(e)=>setMember({...member, idade: e.target.value})} type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                        </section>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <section className="flex flex-col">
                            <span>CPF:</span>
                            <input onChange={(e)=>setMember({...member, cpf: e.target.value})}  type="text" className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3" />
                        </section>
                    </div>

                    

                    <div className="grid grid-cols-2 gap-4">
                        <section className="flex flex-col">
                            <span>Sexo:</span>
                            <select  onChange={(e)=>setMember({...member, sexo: e.target.value})}   className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3">
                                <option value={''}>Escolher</option>
                                <option value={'Feminino'}>Feminino</option>
                                <option value={'Masculino'}>Masculino</option>
                        </select>                        
                        </section>

                        <section className="flex flex-col">
                            <span>Parentesco:</span>
                            <input  onChange={(e)=>setMember({...member,parentesco: e.target.value})}   type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                        </section>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <section className="flex flex-col">
                            <span>Ocupação:</span>
                            <input  onChange={(e)=>setMember({...member, ocupacao: e.target.value})}   type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                       </section>

                        <section className="flex flex-col">
                            <span>Renda mensal:</span>
                            <input  onChange={(e)=>setMember({...member, renda_mensal: e.target.value})}   type="text" className="rounded focus:outline-none focus:border-sky-800 bg-neutral-200 border border-slate-200 p-3" />
                        </section>
                    </div>

                    <button type="button" onClick={addFamilyMember} className="my-4 bg-sky-800 rounded px-2 py-3 text-white font-semibold">Adicionar</button>

                    {familyMembers.length === 0 && <p>Nenhum familiar cadastrado</p>}
                    {familyMembers.map((family_member, index)=>{
                        return (
                            <div key={index} className="bg-slate-50 p-3 relative my-4">
                                <button type="button" onClick={()=>removeFammilyMMember(index)} className="absolute top-2 right-2 hover:text-red-500 transition-colors"><BsTrashFill/></button>
                                <div className="flex flex-col">
                                <section className="flex">
                                    <span className="font-semibold">Nome: </span>
                                    <span>{family_member.nome}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Idade: </span>
                                    <span>{family_member.idade}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Sexo: </span>
                                    <span>{family_member.sexo}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Parentesco: </span>
                                    <span>{family_member.parentesco}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Ocupação: </span>
                                    <span>{family_member.ocupacao}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Renda mensal: </span>
                                    <span>{family_member.renda_mensal}</span>
                                </section>
                                </div>
                            </div>
                        )
                    })}
                </aside> 
                <aside  className="hidden md:block w-2/5 lg:block h-full border border-slate-200 p-4 rounded mx-4 max-h-96 overflow-y-auto">
                    {familyMembers.length === 0 && <p>Nenhum familiar cadastrado</p>}
                    {familyMembers.map((family_member, index)=>{
                        return (
                            <div key={index} className="bg-slate-50 p-3 relative my-4">
                                <button type="button" onClick={()=>removeFammilyMMember(index)} className="absolute top-2 right-2 hover:text-red-500 transition-colors"><BsTrashFill/></button>
                                <div className="flex flex-col">
                                <section className="flex">
                                    <span className="font-semibold">Nome: </span>
                                    <span>{family_member.nome}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Idade: </span>
                                    <span>{family_member.idade}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Sexo: </span>
                                    <span>{family_member.sexo}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Parentesco: </span>
                                    <span>{family_member.parentesco}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Ocupação: </span>
                                    <span>{family_member.ocupacao}</span>
                                </section>

                                <section className="flex">
                                    <span className="font-semibold">Renda mensal: </span>
                                    <span>{family_member.renda_mensal}</span>
                                </section>
                                </div>
                            </div>
                        )
                    })}
                </aside>
                </div>
            </section>

            <section  className="border my-4 border-slate-200 p-4 rounded flex flex-col">
                <h1 className="font-semibold my-4">Observaçoes:</h1>

                <textarea {...register('observacoes')} className="rounded focus:outline-none focus:border-sky-800    bg-neutral-200 border border-slate-200 p-3"></textarea>

                
            </section>

            <section  className="border my-4 border-slate-200 p-4 rounded flex flex-col">
                <h1 className="font-semibold my-4">Confirmação:</h1>

                <p>Os dados repassados são confidenciais e não serão disponibilizados de forma pública nos termos da Lei nº 13.709 (Lei Geral  de Proteção de Dados - LGPD)</p>

                <p className="my-4">Declaro que as informações acima prestadas são  verdadeiras.</p>

                <p>Manaus (AM), {dataFormatada}</p>

                <span className="my-4">Nome do voluntário: {user?.username}</span>
                
               
            </section>
            <button type="submit" className="bg-green-100 px-4 py-2 font-semibold border-2 border-green-800 rounded text-green-800">Cadastrar</button>
        </form>
    )
}