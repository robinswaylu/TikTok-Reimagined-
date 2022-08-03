/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['selectext.app', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
