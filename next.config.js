/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,

    // removeConsole: {
    //   exclude: ['error'],
    // },
    i18n: {
      locales: ['en-US', 'dv-MV'],
      defaultLocale: 'en-US',
    },
  },
}
