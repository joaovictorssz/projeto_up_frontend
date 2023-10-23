'use client'

import Link from "next/link";
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation";
import Image from "next/image";
import  logo from '@/assets/logo.png'
type LoginFormType = {
    email: string,
    password: string
}

export default function Login(){
    const {push} = useRouter()
    const {register, handleSubmit} = useForm<LoginFormType>()

    const handleForm = async (data: LoginFormType)=>{
        await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, data)
        .then(res => {
            if(res.status === 200){
                toast.success("Bem-vindo(a)!")
                sessionStorage.setItem("token", JSON.stringify(res.data))
                push('/')
            }
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
            return
        })
    }

    return(
        <div className="w-full h-full flex bg-sky-800 justify-center items-center">
            <section className="bg-white h-3/4 sm:px-24 px-12  flex flex-col items-center">
                <span className="mt-6 h-1/5 flex flex-col justify-end items-center">
                   
                    <Image width={120} src={logo} alt="logo"/>
                    <p className="text-slate-500">Bem-vindo de volta!</p>
                </span>

                

                <form onSubmit={handleSubmit(handleForm)} className="flex flex-col h-3/5 justify-center">
                    <input {...register('email')} required placeholder="E-mail" className="w-72 bg-slate-200 border border-slate-400 rounded px-4 py-3 focus:outline-none my-2"/>
                    <input {...register('password')} required placeholder="Senha" type="password" className="w-72 bg-slate-200 border border-slate-400 rounded px-4 py-3 my-2 focus:outline-none"/>
                    <button type="submit" className="rounded mt-6 hover:bg-sky-900 transition-colors bg-sky-800 text-white font-semibold py-3">Entrar</button>
                </form>

                <footer className="h-1/5">
                    <span>Ainda não tem conta? <Link  className={"font-semibold text-sky-800"} href={'/create'}>Clique aqui</Link></span>
                </footer>
            </section>
        </div>
    )
}