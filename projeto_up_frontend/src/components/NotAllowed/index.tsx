import { AiFillLock } from 'react-icons/ai'

export default function NotAllowed(){
    return(
        <div className="w-full h-full bg-neutral-100 rounded p-10 flex flex-col justify-center items-center">
            <AiFillLock/>
            <h1>Esta área é exclusiva para auditores.</h1>
            <p>Se você é um auditor e precisa ter acesso, entre em contato com um administrador.</p>

        </div>
    )
}