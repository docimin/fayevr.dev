import { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discord.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dash.fayevr.dev',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
