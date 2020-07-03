/* eslint-disable node/no-unpublished-import */
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {extensions: ['.js', '.ts']},
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
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
};

export default [config];
