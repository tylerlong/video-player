/* eslint-disable node/no-unpublished-import */
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import path from 'path';

const webConfig: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'docs'),
    publicPath: '', // I think default is '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:
        'Video Player - play video and audio from your camera and microphone.',
    }),
    new FaviconsWebpackPlugin({
      logo: './favicon.png',
      favicons: {
        manifestRelativePaths: true,
      },
    }),
  ],
};

const electronConfig = {
  mode: 'production',
  target: 'electron-main',
  devtool: 'source-map',
  entry: {
    electron: ['./src/electron.ts'],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  node: {
    __dirname: false, // https://github.com/webpack/webpack/issues/2010#issuecomment-181256611
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};

export default [webConfig, electronConfig];
