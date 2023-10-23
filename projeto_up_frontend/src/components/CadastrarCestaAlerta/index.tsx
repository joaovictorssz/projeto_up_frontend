'use client'

import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@/contexts/UserContext';
import { Profile } from '@/@types/User';
import { CestasEntregues } from '@/@types/Familia';


export default function CadastrarCestaAlerta({cestas_cadastradas, _id}:{cestas_cadastradas: CestasEntregues[], _id: string}){
    const dataDeHoje = new Date();
    const dia = String(dataDeHoje.getDate()).padStart(2, '0');
    const mes = String(dataDeHoje.getMonth() + 1).padStart(2, '0'); // Lembre-se de adicionar +1, pois os meses são baseados em zero (janeiro é 0)
    const ano = dataDeHoje.getFullYear();
    
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const { user } =  useUser()

    const atualizarCestasCadastradas = ()=>{
        let array = cestas_cadastradas
        array.push({data_de_entrega: dataFormatada, voluntario: user?.username!})

        axios.put(`${process.env.NEXT_PUBLIC_API}/family/update/${_id}`, {cestas_entregues: array})
        .then((res)=>{
            window.location.reload()
        })
    }


 return (
 <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
    <button className="bg-sky-800 px-3 py-2 rounded text-white font-semibold hover:bg-sky-700 transition-colors">Registrar entrega de cesta</button>
        
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Cadastrar entrega de cesta
        </AlertDialog.Title>
        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
          Você, {user?.username}, deseja cadastrar uma entrega de cesta no dia {dataFormatada}?
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={()=>atualizarCestasCadastradas()} className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Sim, desejo
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
 )
}
