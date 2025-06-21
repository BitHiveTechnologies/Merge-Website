import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      domains: ['media.licdn.com','upload.wikimedia.org'],
    },
  };
export default nextConfig;
