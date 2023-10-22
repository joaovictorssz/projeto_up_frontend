'use client'

import Link from "next/link";
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation";

type CreateFormType = {
    username:string,
    email: string,
    password: string,
    password_repeated: string
}

export default function Create(){
    const {push} = useRouter()
    const {register, handleSubmit} = useForm<CreateFormType>()

    const handleForm = async (data: CreateFormType)=>{
        if(data.password !== data.password_repeated){
            toast.error("As senhas devem ser iguais")
            return
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register`, {...data, auditor: false, qtd_cadastros: 0})
        .then(res => {
            if(res.status === 200){
                toast.success("Cadastrado com sucesso!")
                sessionStorage.setItem("token", JSON.stringify(res.data))
                push('/login')
            }
            if(res.status === 400){
                toast.error("Esse email já foi cadastrado")
            }
        })
        .catch((err)=>{
            if(err.response.status === 400){
                toast.error("Email já cadastrado")
                return
            }
        })
    }

    return(
        <div className="w-full h-full flex bg-sky-800 justify-center items-center">
            <section className="bg-white h-3/4 sm:px-24 px-12  flex flex-col items-center">
                <span className="h-1/5 flex mb-4 flex-col justify-end items-center">
                   
                    <h1 className="text-2xl font-semibold">Preencha seus dados</h1>

                </span>

                

                <form onSubmit={handleSubmit(handleForm)} className="flex flex-col h-3/5 justify-center">
                    <input {...register('username')} required placeholder="Nome" className="w-72 bg-slate-200 border border-slate-400 rounded px-4 py-3 focus:outline-none my-2"/>
                    <input {...register('email')} required placeholder="E-mail" className="w-72 bg-slate-200 border border-slate-400 rounded px-4 py-3 focus:outline-none my-2"/>

                    <input {...register('password')} required placeholder="Senha" type="password" className="w-72 bg-slate-200 border border-slate-400 rounded px-4 py-3 my-2 focus:outline-none"/>
                    <input {...register('password_repeated')} required placeholder="Repita sua senha" type="password" className="w-72 bg-slate-200 border border-slate-400 rounded px-4 py-3 my-2 focus:outline-none"/>

                    <button type="submit" className="rounded mt-6 hover:bg-sky-900 transition-colors bg-sky-800 text-white font-semibold py-3">Cadastrar</button>
                </form>
           
            </section>
        </div>
    )
}