const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}),
      new webpack.HashedModuleIdsPlugin()
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        styles: {
          test: /\.(s)?css$/,
          name: "styles",
          chunks: "all"
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "libs",
          chunks: "all"
        }
      }
    }
  },
  devtool: "source-map"
});
