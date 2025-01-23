/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/(.*)',
      headers: [
        // {
        //   key: 'Content-Security-Policy',
        //   value: "default-src 'self'; script-src 'self'; object-src 'none';", // Sesuaikan dengan kebutuhan Anda
        // },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload', // Aktifkan HSTS
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff', // Cegah MIME sniffing
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY', // Cegah framing untuk mencegah klikjacking
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block', // Aktifkan proteksi XSS di browser lama
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin', // Kontrol informasi referrer yang dibagikan
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
