import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ['images.unsplash.com', 'randomuser.me', 'via.placeholder.com'],
    },
};
export default nextConfig;
