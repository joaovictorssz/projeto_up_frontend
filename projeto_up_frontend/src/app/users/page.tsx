'use client'

import { Profile } from "@/@types/User"
import DeletarUsuario from "@/components/DeletarUsuarioAlerta"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BiSolidUser } from 'react-icons/bi'
import { useUser } from '@/contexts/UserContext' 
import NotAllowed from "@/components/NotAllowed"

export default function Users(){

    const { user } = useUser()

    const [profiles, setProfiles] = useState<Profile[]>([])

    const tornarAuditor = async (_id: string)=>{
        try{
            axios.put(`${process.env.NEXT_PUBLIC_API}/users/update/${_id}`, {auditor: true})
            .then((res)=>{
                toast.success("Usuário atualizado")
                window.location.reload()
            })
        }
        catch{
            toast.error("Erro ao atualizar usuário")
        }
    }

    const removerAuditor = async (_id: string)=>{
        try{
            axios.put(`${process.env.NEXT_PUBLIC_API}/users/update/${_id}`, {auditor: false})
            .then((res)=>{
                toast.success("Usuário atualizado")
                window.location.reload()
            })
        }
        catch{
            toast.error("Erro ao atualizar usuário")
        }
    }

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/users/list`)
        .then((res)=>{
            setProfiles(res.data)
        })
    }, [])

    return(
        <>

            {user?.auditor === false && <NotAllowed/>}
            {user?.auditor &&
            
            <div>
      <header>
        <h1>{profiles.length === 0 ? 'Ainda não há voluntários para serem mostrados' : 'Esses são os voluntários cadastrados:'}</h1>
      </header>

      <main>
        
        {profiles.map((profile, id)=>{
            return (
                <div key={id} className="shadow p-4 flex items-center">
                    <span className="bg-sky-800 text-white p-4 rounded">{<BiSolidUser/>}</span>
                    <section className="grid grid-rows-1 grid-cols-3 w-3/4  items-center">
                    
                        <span className="ml-10">Nome: {profile.username}</span>
                        <span className="ml-20">Email: {profile.email}</span>
                        <span className="ml-20">Quantidade de cadastros: {profile.qtd_cadastros ? profile.qtd_cadastros : 0}</span>
                    </section>

                    {profile.auditor ? <button onClick={()=>removerAuditor(profile._id)} className="bg-yellow-100 p-3 rounded text-yellow-800 font-semibold hover:bg-yellow-200 transition-colors">Remover auditor</button> : <button onClick={()=>tornarAuditor(profile._id)} className="bg-green-200 border-2 text-green-900 font-semibold rounded p-3">Tornar auditor</button>}
                <DeletarUsuario _id={profile._id}/>
                </div>
            )
        })}
        
      </main>
    </div>

            }
        
        </>
    )
}