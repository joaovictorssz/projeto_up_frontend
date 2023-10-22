'use client'

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import {BsFillInfoSquareFill} from 'react-icons/bs'
import { Familia } from '@/@types/Familia';
import DadosPessoaisDetalhes from './DadosPessoaisDetalhes';
import { GrNext, GrPrevious } from 'react-icons/gr'
import DadosMoradiaDetalhes from './DadosMoradiaDetalhes';
import SituacaoEconomicaFamiliarDetalhes from './SituacaoEconomicaDetalhes';
import ComposicaoFamiliarDetalhes from './ComposicaoFamiliar';
import DeletarCadastro from '../DeletarCadastroAlerta';

export default function CadastroItemModal({familia}:{familia: Familia}){ 

  const [currentSection, setCurrentSection] = useState<number>(0)
  console.log(familia)
  return(
    <Dialog.Root>
    <Dialog.Trigger asChild>
    <button className="text-sky-800"><BsFillInfoSquareFill></BsFillInfoSquareFill></button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="overflow-y-auto data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[850px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="my-4 text-mauve12 m-0 text-[17px] font-medium flex items-center">
          <span>
            {currentSection === 0 && 'Dados pessoais'}
            {currentSection === 1 && 'Dados da moradia'}
            {currentSection === 2 && 'Situação econômica familiar'}
            {currentSection === 3 && 'Composição familiar'}
          </span>
          <section>
            {currentSection !== 0 && <button className='mx-4' onClick={()=>{if(currentSection !== 0){setCurrentSection(currentSection-1)}}}><GrPrevious/></button>}
            <button onClick={()=>{if(currentSection !== 3){setCurrentSection(currentSection+1)}}} className='mx-4'><GrNext className=""/></button>
          </section>
        </Dialog.Title>
        
        {currentSection === 0 && <DadosPessoaisDetalhes dados_pessoais={familia.dados_pessoais}/>}
        {currentSection === 1 && <DadosMoradiaDetalhes dados_moradia={familia.dados_moradia}/>}
        {currentSection === 2 && <SituacaoEconomicaFamiliarDetalhes situacao_economica_familiar={familia.situacao_economica_familiar}/>}
        {currentSection === 3 && <ComposicaoFamiliarDetalhes composicao_familiar={familia.composicao_familiar}/>}
        <div className="mt-[25px] flex justify-end">

        </div>
        <footer className='w-full justify-between'>
          <DeletarCadastro _id={familia._id} id_user={familia.id_voluntario}/>
          
        </footer>
        <span className='mt-4 text-slate-600'>Cadastrado por: {familia.cadastrado_por}</span>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
;}

