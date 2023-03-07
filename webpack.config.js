const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    form: path.join(__dirname, "src/form/form.js"),
    topbar: path.join(__dirname, "src/assets/javascript/topbar.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  stats: "minimal",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      chunks: ["main", "topbar"],
    }),
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.resolve(__dirname, "src/form/form.html"),
      chunks: ["form", "topbar"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images",
          to: "assets/images",
        },
      ],
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    watchFiles: ["./src/**"],
    port: 4000,
    hot: true,
  },
};
