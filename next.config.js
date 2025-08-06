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
  webpack: (config, { dev, isServer, webpack }) => {
    // Only optimize client-side bundles
    if (!dev && !isServer) {
      // Split chunks optimization for client-side only
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          
          // React framework
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
            priority: 40,
            enforce: true,
          },
          
          // UI libraries (Radix UI components)
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            priority: 30,
            minSize: 10000,
          },
          
          // I18n libraries
          i18n: {
            name: 'i18n',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](i18next|react-i18next|next-i18n-router)[\\/]/,
            priority: 25,
            minSize: 10000,
          },
          
          // Common libraries
          libs: {
            name: 'libs',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](date-fns|axios|zod|zustand)[\\/]/,
            priority: 20,
            minSize: 10000,
          },
          
          // Large vendor libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            minSize: 20000,
          },
        },
      };
    }
    
    // Module resolution optimizations
    config.resolve.modules = ['node_modules', ...config.resolve.modules];
    
    // Cache configuration for better build performance
    if (config.cache && typeof config.cache === 'object') {
      config.cache.buildDependencies = {
        ...config.cache.buildDependencies,
        config: [__filename],
      };
    }
    
    // Exclude unnecessary files from bundle
    config.module.rules.push({
      test: /\.(md|txt)$/,
      type: 'asset/resource',
      generator: {
        emit: false,
      },
    });
    
    // Optimize imports for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        assert: false,
        http: false,
        https: false,
        os: false,
        url: false,
        zlib: false,
        querystring: false,
        util: false,
        buffer: false,
        events: false,
      };
      
      // Use ES modules when available for client-side
      config.resolve.alias = {
        ...config.resolve.alias,
        lodash: 'lodash-es',
      };
    }
    
    return config;
  },
  
  // Performance optimizations
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
    
    // Enable SWC minifier for better performance
    swcMinify: true,
  },
  
  // Compression
  compress: true,
  
  // Power state
  poweredByHeader: false,
  
  // Trailing slash
  trailingSlash: false,
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
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

module.exports = nextConfig;
