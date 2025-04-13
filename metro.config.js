// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@': './app', // 👈 assuming your code lives in the `app` folder
};

module.exports = config;
