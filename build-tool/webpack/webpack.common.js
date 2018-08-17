const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    another: "./src/another.js"
  },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(s)?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(svg|gif|jpg|png)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(otf|ttf|woff|woff2|eot)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new ManifestPlugin(),
    new CleanWebpackPlugin(["dist"])
  ]
};
