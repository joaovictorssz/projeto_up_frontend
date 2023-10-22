'use client'



import { APP_ROUTES } from "@/constants/app-routes"
import { checkUserAuthenticated } from "@/functions/check-user-authenticated"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { useUser } from "@/contexts/UserContext"

export const PrivateRoute = ({children}: {children: ReactNode}) => {

    const {push} = useRouter()
    const [isAuth, setIsAuth] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const { setUser } = useUser()


    useEffect(()=>{
        const isUserAuthenticated = checkUserAuthenticated()

        setIsAuth(isUserAuthenticated!)
        setIsCheck(true)
        setUser(JSON.parse(sessionStorage.getItem('token')!))
        if(!isUserAuthenticated){
            push(APP_ROUTES.public.login)
            
        }
    }, [push])
    return(
        <>
        {!isCheck && null}
        {isAuth ? children : null}
        </>
    )
}