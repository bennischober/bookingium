/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['postcss', 'postcss-preset-mantine', 'postcss-simple-vars']
  },
}

module.exports = nextConfig
