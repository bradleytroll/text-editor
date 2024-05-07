const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    context: path.resolve(__dirname, 'src'), // Ensure context is set to 'src' directory
    entry: {
      main: './js/index.js',
      install: './js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', // Ensure assets are served correctly in dev server
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: '../index.html', // Assuming index.html is inside the 'src' folder
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        crossorigin: 'use-credentials', // This can be 'anonymous' or 'use-credentials'
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Assuming the path from context
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: path.resolve('./src-sw.js'), // Correct path relative to 'src'
        swDest: 'src-sw.js',
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // Handling images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/icons/[name][ext][query]'  // Output images to 'assets/icons' folder
          }
        }
      ],
    },
  };
};
