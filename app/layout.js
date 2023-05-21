'use client';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.css';
import useClickSound from '../hooks/click';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: 'Faye | Portfolio',
  description: 'Faye\'s personal portfolio website. A place to showcase my projects and skills.',
  url: 'https://fayevr.dev',
  image: 'icon-512.png',
  icon: 'icon-512.png',
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
  theme: '#ff4f00',
};

export default function RootLayout({ children }) {
  const [handleMouseClick] = useClickSound();

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <meta name="theme-color" content={metadata.theme} />
        <meta name="image" content={metadata.image} />
        <meta name="icon" content={metadata.icon} />
      </head>
      <body className={`${inter.className}`} onMouseDown={handleMouseClick} onMouseUp={handleMouseClick}>
        {children}
      </body>
    </html>
  );
}