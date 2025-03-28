const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Handle node: protocol imports
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            [
              require.resolve('babel-plugin-module-resolver'),
              {
                alias: {
                  'node:events': 'events',
                  'node:process': 'process/browser',
                  'node:util': 'util',
                  'node:buffer': 'buffer',
                  'node:stream': 'stream-browserify',
                  'node:path': 'path-browserify',
                  'node:crypto': 'crypto-browserify',
                  'node:http': 'stream-http',
                  'node:https': 'https-browserify',
                  'node:zlib': 'browserify-zlib',
                  'node:os': 'os-browserify/browser',
                  'node:url': 'url',
                  'node:querystring': 'querystring-es3',
                  'node:assert': 'assert',
                  'node:fs': false,
                  'node:net': false,
                  'node:tls': false,
                  'node:dns': false,
                  'node:child_process': false,
                  'node:http2': false,
                }
              }
            ]
          ]
        }
      });

      // Add fallbacks for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        http2: false,
        
        // Provide polyfills for these modules
        assert: require.resolve('assert/'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url/'),
        util: require.resolve('util/'),
        querystring: require.resolve('querystring-es3'),
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer/'),
        events: require.resolve('events/'),
      };

      return webpackConfig;
    },
    plugins: [
      // Add plugins
      new NodePolyfillPlugin(),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
  },
};