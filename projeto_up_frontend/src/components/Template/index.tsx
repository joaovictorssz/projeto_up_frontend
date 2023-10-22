export default function Template({children}: {children: React.ReactNode}){

    return(
        <div className="w-full h-full bg-neutral-200 overflow-hidden p-6">
            <div className="w-full h-full rounded bg-white overflow-y-auto p-6">
                {children}
            </div>
        </div>
    )

}