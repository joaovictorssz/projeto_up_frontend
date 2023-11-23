'use client'

import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@/contexts/UserContext';
import { Profile } from '@/@types/User';


export default function DeletarCadastro({_id, id_user}:{_id: string, id_user:string}){

    const [voluntario, setVoluntario] = useState<Profile>()
    console.log(id_user)
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/users/list/${id_user}`)
        .then((res)=>{
            setVoluntario(res.data)
        })
    }, [])
    const { setUser, user} = useUser()

const deletarCadastro = async (_id: string)=>{
    try{
        axios.delete(`${process.env.NEXT_PUBLIC_API}/family/delete/${_id}`)
        .then((res)=>{
            if(res.status === 204){
                axios.put(`${process.env.NEXT_PUBLIC_API}/users/update/${id_user}`, {qtd_cadastros: voluntario?.qtd_cadastros! - 1})
                setUser({_id: user?._id!, auditor: user?.auditor!, email: user?.email!, password: user?.password!, qtd_cadastros: user?.qtd_cadastros! + 1, username: user?.username!})
                sessionStorage.setItem('token', JSON.stringify(user))
                toast.success("Cadastro deletado")
                window.location.reload()
            }
        })
    }
    catch{
        toast.error("Não foi possível deletar o cadastro.")
    }
}


 return (
 <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
        <button className='bg-red-500 p-3 rounded text-white hover:bg-red-400 transition-colors'>Apagar</button>
        
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Deseja excluir esse cadastro?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
          Essa ação não pode ser revertida. Este cadastro será apagado do seu banco de dados.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={()=>deletarCadastro(_id)} className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Sim, excluir cadastro
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
 )
}
