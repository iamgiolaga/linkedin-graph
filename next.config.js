module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  env: {
    LINKEDIN_VERSION: process.env.LINKEDIN_VERSION,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
};
