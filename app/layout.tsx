import type { Metadata } from 'next'
import {  Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({weight:['400','500','600','700'], subsets: ['latin'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: 'Eventscape',
  description: 'Eventscape is a platform for event management',
  icons: {
    icon: "/assets/images/eventscape-logo.svg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}
