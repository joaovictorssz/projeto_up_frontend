'use client'

import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function DeletarUsuario({_id}:{_id: string}){

const deletarCadastro = async (_id: string)=>{
    try{
        axios.delete(`${process.env.NEXT_PUBLIC_API}/users/delete/${_id}`)
        .then((res)=>{
            if(res.status === 204){
                toast.success("Usuário deletado")
                window.location.reload()
            }
        })
    }
    catch{
        toast.error("Não foi possível deletar o voluntário.")
    }
}


 return (
 <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
        <button className='bg-red-200 border-2 ml-4 p-3 rounded text-red-800 font-semibold hover:bg-red-300 transition-colors'>Apagar</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Deseja excluir esse voluntário?
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
              Sim, excluir voluntário
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
 )
}
