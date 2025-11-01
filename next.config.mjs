/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "i.imgur.com",
      "cdn-icons-png.flaticon.com"
    ],
  },
}

export default nextConfig
