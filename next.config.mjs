import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      domains: ['media.licdn.com','upload.wikimedia.org','bitmesra.ac.in','www.iqac.quantumuniversity.edu.in','www.iec.edu.in','careers.chetu.com','i.ibb.co']
    },
  };
export default nextConfig;
