const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const PATHS = {
  dist: path.resolve(__dirname, "dist"),
  contentBase: path.resolve(__dirname, "public"),
  sass: path.resolve(__dirname, "src/sass"),
};

module.exports = (env = { NODE_ENV: "production" }) => {
  const isDev = env.NODE_ENV === "local";
  return {
    mode: isDev ? "development" : "production",
    entry: "./src/index.js",
    devtool: isDev ? "cheap-source-map" : "source-map",
    devServer: {
      contentBase: PATHS.contentBase,
      watchContentBase: true,
    },
    output: {
      path: PATHS.dist,
      filename: "[name].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      alias: {
        sass: PATHS.sass,
      },
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Tic Tac Toe",
        minify: !isDev,
        template: path.join(PATHS.contentBase, "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(PATHS.contentBase, "/fonts"),
            to: path.join(PATHS.dist, "/fonts"),
          },
        ],
      }),
    ],
  };
};
