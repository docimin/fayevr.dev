'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.css';
import useClickSound from '../hooks/click';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
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
      <body className={inter.className} onMouseDown={handleMouseClick} onMouseUp={handleMouseClick}>
        {children}
      </body>
    </html>
  );
}