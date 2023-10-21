'use client'

import { usePathname } from 'next/navigation'
import './globals.css'
import { checkIsPublicRoute } from '@/functions/check-is-public-route'
import { PrivateRoute } from '@/components/Private'
import { Toaster } from 'react-hot-toast'
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
        <Toaster/>
        {isPublicPage && children}
        {!isPublicPage &&
        <PrivateRoute>
          {children}
        </PrivateRoute>
        }
      </body>
    </html>
  )
}
