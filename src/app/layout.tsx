import '../../css/globals.css'
import { Providers } from '@/components/providers'
import ClickSound from '@/hooks/click'
import ContextMenuProvider from '@/components/contextMenu'
import localFont from 'next/font/local'

const pixelFont = localFont({
  src: '../../public/fonts/PixelMplus12-Regular.woff2',
})

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
        className={`${pixelFont.className} flex min-h-full bg-white antialiased dark:bg-black tracking-widest`}
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
