/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'standalone',
  // Removed i18n config since we're using next-i18n-router middleware
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      // Enable tree shaking for better bundle size
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        
        // Split chunks optimization
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            
            // Vendor libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
            
            // React libraries
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 40,
            },
            
            // UI libraries (Radix UI components)
            ui: {
              name: 'ui',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 30,
            },
            
            // I18n libraries
            i18n: {
              name: 'i18n',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](i18next|react-i18next|next-i18n-router)[\\/]/,
              priority: 25,
            },
            
            // Common libraries
            lib: {
              name: 'lib',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](lodash|date-fns|axios|zod|zustand)[\\/]/,
              priority: 15,
            },
            
            // CSS chunks
            styles: {
              name: 'styles',
              type: 'css/mini-extract',
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
      
      // Minimize bundle size
      config.resolve.alias = {
        ...config.resolve.alias,
        // Use smaller versions of libraries when available
        'lodash': 'lodash-es',
      };
    }
    
    // Module resolution optimizations
    config.resolve.modules = ['node_modules', ...config.resolve.modules];
    
    // Cache configuration for better build performance
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    };
    
    // Exclude unnecessary files from bundle
    config.module.rules.push({
      test: /\.(md|txt)$/,
      use: 'ignore-loader',
    });
    
    // Optimize imports
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
  
  // Performance optimizations
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
    
    // Enable modern features
    modernMode: true,
    
    // Optimize CSS
    optimizeCss: true,
    
    // Enable SWC minifier for better performance
    swcMinify: true,
    
    // Enable Turbo for faster builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    
    // Memory usage optimization
    workerThreads: false,
    
    // Enable edge runtime for better performance
    runtime: 'nodejs',
    
    // Optimize font loading
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin', 'vietnamese'] } },
    ],
  },
  
  // Compression
  compress: true,
  
  // Power state
  poweredByHeader: false,
  
  // Trailing slash
  trailingSlash: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Redirects optimization
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
