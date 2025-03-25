/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  server: {
    hostname: '0.0.0.0',
    port: 3000
  },
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
