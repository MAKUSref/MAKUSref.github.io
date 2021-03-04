const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new WorkboxPlugin.GenerateSW({
     // these options encourage the ServiceWorkers to get in there fast
     // and not allow any straggling "old" SWs to hang around
     clientsClaim: true,
     skipWaiting: true,
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '/')
  }
};