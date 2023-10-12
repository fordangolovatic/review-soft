const { i18n } = require('./next-i18next.config');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  i18n,
  async redirects() {
    return [
      {
        source: '/social/my-team',
        destination: '/social/my-team/contacts',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
