'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.css';
import useClickSound from '../hooks/click';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: 'Faye',
  description: 'Faye\'s personal portfolio website.',
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
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <meta name="theme-color" content={metadata.theme} />
        <meta name="image" content={metadata.image} />
        <meta name="icon" content={metadata.icon} />
      </Head>
      <body className={`${inter.className}`} onMouseDown={handleMouseClick} onMouseUp={handleMouseClick}>
        {children}
      </body>
    </html>
  );
}