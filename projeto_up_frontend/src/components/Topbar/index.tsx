'use client'

import { useUser } from "@/contexts/UserContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiLogOut } from 'react-icons/fi'
export default function Topbar(){
    const {push} = useRouter()
    const { user } = useUser()
    const logout = () =>{
        sessionStorage.removeItem('token')
        push('/login')
    }

    return(
        <header className="w-full p-7 flex justify-between border-b border-slate-200">
            <h1 className="invisible"> Ok</h1>

            <span className="sm:block flex md:hidden lg:hidden">
                <Link className="bg-slate-100 p-2 rounded border-2 font-semibold mx-2 text-sm text-sky-800 border-sky-800" href={'/add_family'}>Novo</Link>
                <Link className="bg-slate-100 p-2 rounded border-2 font-semibold mx-2 text-sm text-sky-800 border-sky-800" href={'/'}>Cadastros</Link>
               <Link className="bg-slate-100 p-2 rounded border-2 font-semibold mx-2 text-sm text-sky-800 border-sky-800" href={'/users'}>Usuários</Link> 
               <Link className="bg-slate-100 p-2 rounded border-2 font-semibold mx-2 text-sm text-sky-800 border-sky-800" href={'/list_families'}>Meus cadastros</Link>
            </span>

            <span className="font-semibold text-sky-800 rounded flex items-center">
                
                <span className="hidden md:block lg:block">Olá, {user?.username }</span>
                <div className="w-0 py-4 border mx-4 border-slate-200"></div>
                <button onClick={logout} className="hidden md:block lg:block bg-red-100 border-2 border-red-400 text-red-400 font-semibold px-2 py-1 rounded hover:bg-red-400 hover:text-white transition-colors">Fazer logout</button>
                <button onClick={logout} className="sm:block md:hidden lg:hidden bg-red-100 border-2 border-red-400 text-red-400 font-semibold px-2 py-1 rounded hover:bg-red-400 hover:text-white transition-colors"><FiLogOut/></button>

            </span>
        </header>
    )
}