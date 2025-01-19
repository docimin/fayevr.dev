/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      'cdn.discordapp.com',
      'cdn.discord.com',
      'dash.fayevr.dev',
    ],
  },
}

export default nextConfig
