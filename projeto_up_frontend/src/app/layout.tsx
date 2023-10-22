'use client'

import { usePathname } from 'next/navigation'
import './globals.css'
import { checkIsPublicRoute } from '@/functions/check-is-public-route'
import { PrivateRoute } from '@/components/Private'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import Template from '@/components/Template'
import { UserProvider } from '@/contexts/UserContext'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const isPublicPage = checkIsPublicRoute(pathname!)
  console.log(isPublicPage)
  return (
    <html lang="en">
      <body>
      <UserProvider>
        <Toaster/>
        {isPublicPage && children}
        {!isPublicPage &&
        
          <PrivateRoute>
          <main className='w-screen h-screen flex'>
            <div className='h-full w-2/12'>
              <Sidebar/>
            </div>
            <div className='w-full h-full flex flex-col'>
              <Topbar/>
              <Template>
              {children}
              </Template>
            </div>
          
          </main>
        </PrivateRoute>
        
        }
        </UserProvider>
      </body>
    </html>
  )
}
