'use client'

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import  logo from '@/assets/logo.png'

export default function Sidebar(){

    const [section, setSection] = useState('list')

    return(
        <aside className="w-full h-full flex flex-col px-5 border-r border-slate-200">

            <span className="flex p-7 justify-center items-center border-b border-slate-200">
            <Image width={80} src={logo} alt="logo"/>
            </span>

            <main className="flex flex-col font-semibold text-slate-600 py-10">
                <Link onClick={()=>setSection('list')} className={`px-2 py-2 rounded my-2 ${section == 'list' ? 'bg-sky-800 text-white' : 'bg-slate-200 '}`} href={'/'}>Listar cadastros</Link>
                <Link onClick={()=>setSection('novo_cadastro')} className={`px-2 py-2 rounded my-2 ${section == 'novo_cadastro' ? 'bg-sky-800 text-white' : 'bg-slate-200 '}`} href={'/add_family'}>Novo cadastro</Link>
                <Link onClick={()=>{setSection('users')}} className={`px-2 py-2 rounded my-2 ${section == 'users' ? 'bg-sky-800 text-white' : 'bg-slate-200 '}`} href={'/users'}>Listar voluntários</Link>
                <Link onClick={()=>{setSection('list_families')}} className={`px-2 py-2 rounded my-2 ${section == 'list_families' ? 'bg-sky-800 text-white' : 'bg-slate-200 '}`} href={'/list_families'}>Meus Cadastros</Link>

            </main>

        </aside>
    )

}