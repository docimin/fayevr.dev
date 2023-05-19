import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Faye',
  description: 'Faye\'s personal portfolio website.',
  url: 'https://fayevr.dev',
  favicon: 'http://localhost:3000/favicon.svg',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
