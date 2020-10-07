const path = require("path");

const PATHS = {
  dist: path.resolve(__dirname, "dist"),
  contentBase: path.resolve(__dirname, "public"),
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
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
