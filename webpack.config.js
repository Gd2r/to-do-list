const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    filename: 'bundle.js', // Output bundle name
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the dist folder before each build
    publicPath: './'  // Add this for GitHub Pages
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use this HTML template
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      // Add support for images and other assets
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // Add support for fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: './dist',
    hot: true, // Enable hot module replacement
    open: true, // Opens browser automatically
  },
  // Add source maps for better debugging
  devtool: 'inline-source-map',
  mode: 'development',
};