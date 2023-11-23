'use client'

import { Familia } from "@/@types/Familia"
import CadastroItem from "@/components/CadastroItem"
import { useUser } from "@/contexts/UserContext"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ListFamilies(){
    
    const [families, setFamilies] = useState<Familia[] | null>(null)
    const {user} = useUser()
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/family/list/user/${user?._id}`)
        .then((res)=>{
            setFamilies(res.data)
        })
        .catch((err)=>{
            toast.error("Erro ao buscar as famílias cadastradas")
            setFamilies([])
        })
    }, [])
    
    return(
        <div>
                <h1 className="mb-3 font-semibold">Estas são as famílias cadastradas por você</h1>
                {!families && 'Loading...'}
                {families?.length === 0 && 'Nenhuma  família cadastrada'}
                {families && families.map((family, index)=>{
                    return (
                
                            <CadastroItem familia={family} id={index} key={index}/>
                        
                    )
                })}
        </div>
    )
}