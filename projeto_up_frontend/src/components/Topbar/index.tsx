'use client'

import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"

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

            <span className="font-semibold text-sky-800 rounded flex items-center">
                Olá, {user?.username }
                <div className="w-0 py-4 border mx-4 border-slate-200"></div>
                <button onClick={logout} className="bg-red-100 border-2 border-red-400 text-red-400 font-semibold px-2 py-1 rounded hover:bg-red-400 hover:text-white transition-colors">Fazer logout</button>
            </span>
        </header>
    )
}