const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = env => {
  console.log("NODE_ENV: ", env.NODE_ENV); // 'development'
  console.log("development: ", env.development); // true

  return merge(common, {
    mode: "development",
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./dist",
      hot: true
    }
  });
};
