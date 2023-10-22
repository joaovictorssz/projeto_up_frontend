"use client"

import { Familia } from '@/@types/Familia'
import CadastroItem from '@/components/CadastroItem'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext' 
import NotAllowed from '@/components/NotAllowed'

export default function Home(){
  const {user} = useUser()
  const [familias, setFamilias] = useState<Familia[]>([])
  

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API}/family/list`)

    .then((res)=>{
      if(res.status === 200){
        setFamilias(res.data)
      }
    })
  }, [])

  return(
    <div>
      {user?.auditor === false && <NotAllowed/>}
      {user?.auditor 
      && <>
      <header>
      <h1>{familias.length === 0 ? 'Ainda não há cadastros para serem mostrados' : `Essas são os endereços cadastrados: (${familias.length})`}</h1>

    </header>

    <main>
      
      {familias.map((familia, index)=>{
        return <CadastroItem familia={familia} id={index} key={index}/>
      })}
    </main>
    </>}
    </div>
  )
}