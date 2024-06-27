import '../../css/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import ClickSound from '@/hooks/click'
import ContextMenuProvider from '@/components/contextMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Faye | Portfolio',
    template: '%s | Faye',
  },
  description:
    "Faye's personal portfolio website. A place to showcase my projects and skills.",
  keywords: [
    'faye',
    'fayevr',
    'fayevr.dev',
    'faye vr',
    'portfolio',
    'website',
    'personal',
    'personal website',
    'personal portfolio',
  ],
  openGraph: {
    title: 'Faye | Portfolio',
    description:
      "Faye's personal portfolio website. A place to showcase my projects and skills.",
    url: 'https://fayevr.dev',
    images: 'icon-512.png',
    type: 'website',
    locale: 'en_US',
  },
  metadataBase: new URL('https://fayevr.dev'),
}

export default function RootLayout({ children }) {
  return (
    <html className="h-full" suppressHydrationWarning>
    <body
      className={`${inter.className} flex min-h-full bg-white antialiased dark:bg-black`}
    >
    <Providers>
      <ContextMenuProvider>
        <div className="w-full">{children}</div>
      </ContextMenuProvider>
    </Providers>
    <ClickSound />
    </body>
    </html>
  )
}
