/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cdn.discordapp.com', 'dash.fayevr.dev'],
  },
}

export default nextConfig
