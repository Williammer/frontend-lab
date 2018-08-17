const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  }
});
