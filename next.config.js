/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images:{
    domains:['images.unsplash.com','i.ytimg.com']
  }
}

module.exports = nextConfig
