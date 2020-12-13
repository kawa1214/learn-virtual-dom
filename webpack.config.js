const path = require('path');
const outputPath = path.resolve(__dirname, "public");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: `${outputPath}/`,
    hot: true,
    watchContentBase: true
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  target: ["web", "es5"],
};