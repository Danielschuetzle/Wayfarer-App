const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      buffer: require.resolve('buffer/'),
      fs: false,
      https: false,
      http: false,
      net: false,
    };
    return config;
  },
};

module.exports = nextConfig;
