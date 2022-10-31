const path = require("path");
const { config } = require("dotenv");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

config({ path: path.resolve(__dirname, ".env") });

module.exports = {
  entry: { main: "./src/index.tsx" },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          name: path.join(__dirname, "src", "assets/[name].[ext]"),
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Taq Challange Web",
      template: path.join(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      env: {
        BASE_URL: JSON.stringify(process.env.BASE_URL),
      },
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
