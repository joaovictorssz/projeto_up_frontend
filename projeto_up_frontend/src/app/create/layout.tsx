import React from "react";
import { ReactNode } from "react";

export default function CreateLayout({children}: {children: ReactNode}){
    return(
        <div className="w-screen h-screen">{children}</div>
    )
}