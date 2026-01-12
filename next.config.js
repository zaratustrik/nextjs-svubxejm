/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // 1. Говорим Webpack, что эти модули не нужны в браузере
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    // 2. Игнорируем библиотеки, вызывающие ошибки
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // 3. Отключаем попытки загрузить мобильное хранилище
    // (Это лечит ошибку с @metamask/sdk и react-native)
    config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
    };

    return config;
  },
};

module.exports = nextConfig;