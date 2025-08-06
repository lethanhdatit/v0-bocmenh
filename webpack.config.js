const path = require('path');

// Webpack config for additional optimizations (if needed)
// This file can be used for custom webpack setups outside of Next.js

module.exports = {
  // Performance budgets to monitor bundle size
  performance: {
    maxAssetSize: 250000, // 250kb
    maxEntrypointSize: 400000, // 400kb
    hints: 'warning',
  },
  
  // Optimization settings
  optimization: {
    // Enable tree shaking
    usedExports: true,
    sideEffects: false,
    
    // Minimize code in production
    minimize: true,
    
    // Split chunks for better caching
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      
      cacheGroups: {
        default: false,
        vendors: false,
        
        // Framework chunks
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
        
        // Library chunks
        lib: {
          test(module) {
            return (
              module.size() > 160000 &&
              /node_modules[/\\]/.test(module.identifier())
            );
          },
          name(module) {
            const hash = require('crypto')
              .createHash('sha1')
              .update(module.identifier())
              .digest('hex')
              .substring(0, 8);
            return `lib-${hash}`;
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        
        // Common chunks
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
          reuseExistingChunk: true,
        },
        
        // Shared chunks
        shared: {
          name: 'shared',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  
  // Module resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/components': path.resolve(__dirname, './components'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/app': path.resolve(__dirname, './app'),
      '@/hooks': path.resolve(__dirname, './hooks'),
      '@/contexts': path.resolve(__dirname, './contexts'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules'],
  },
  
  // Module rules
  module: {
    rules: [
      // TypeScript/JavaScript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
          },
        },
      },
      
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      
      // Images
      {
        test: /\.(png|jpe?g|gif|svg|ico|webp|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name].[hash][ext]',
        },
      },
      
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[hash][ext]',
        },
      },
    ],
  },
  
  // Cache configuration
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  
  // Development tools
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
  
  // Stats configuration
  stats: {
    errorDetails: true,
    colors: true,
    modules: false,
    chunks: false,
    chunkModules: false,
  },
};
