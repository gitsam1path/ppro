const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force localhost for development
config.server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Force localhost URLs
      if (req.url && req.url.includes('boltexpo.dev')) {
        req.url = req.url.replace(/https:\/\/[^.]+\.boltexpo\.dev/, 'http://localhost:8081');
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;