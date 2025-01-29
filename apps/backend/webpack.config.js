const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: join(__dirname, '../../dist/apps/backend'),
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProd ? '[id].[contenthash].js' : '[id].js',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.json',
      optimization: isProd,
      outputHashing: isProd ? 'all' : 'none',
      generatePackageJson: true,
    }),
  ],
};
