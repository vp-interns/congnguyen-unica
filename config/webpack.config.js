"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const postcssNormalize = require("postcss-normalize");
const webpack = require("webpack");
const path = require("path");
const paths = require("./paths");

const fs = require("fs");

function autoLoadHtml() {
  if (fs.existsSync(paths.appPublic)) {
    return fs
      .readdirSync(paths.appPublic)
      .filter(
        (file) =>
          fs.lstatSync(path.join(paths.appPublic, file)).isFile() &&
          file.indexOf(".") !== 0 &&
          file.slice(-5) === ".html"
      )
      .map(
        (file) =>
          new HtmlWebpackPlugin({
            template: path.join(paths.appPublic, file),
            filename: file,
          })
      );
  }

  return [];
}

console.log(autoLoadHtml());

module.exports = function (webpackEnv) {
  const isProd = webpackEnv === "production";
  const isDev = webpackEnv === "development";

  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/;

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isDev && require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
            }),
            require("autoprefixer"),
            postcssNormalize(),
          ],
          sourceMap: isDev,
        },
      },
    ].filter(Boolean);

    // console.log(loaders);

    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve("resolve-url-loader"),
          options: {
            sourceMap: isDev,
            root: paths.appSrc,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }

    return loaders;
  };

  return {
    mode: isProd ? "production" : isDev && "development",
    bail: isProd,
    entry: {
      app: [paths.appJS, paths.appMainScss],
    },
    output: {
      path: isProd ? paths.appBuild : undefined,
      filename: isProd
        ? "static/js/[name].[contenthash:8].js"
        : isDev && "static/js/[name].js",
      publicPath: paths.publicUrlOrPath,
      chunkFilename: isProd
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isDev && "static/js/[name].chunk.js",
    },
    devtool: isDev ? "cheap-module-source-map" : !isProd,
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                name: "static/media/[name].[hash:8].[ext]",
                limit: 10000,
              },
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isDev,
              }),
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isDev,
              }),
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isDev,
                },
                "sass-loader"
              ),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isDev,
                },
                "sass-loader"
              ),
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      ...autoLoadHtml(),
      new webpack.ProvidePlugin({
        $: "jquery",
        JQuery: "jquery",
        _: "lodash",
        moment: "moment",
      }),
      isDev && new ErrorOverlayPlugin(),
    ].filter(Boolean),
  };
};
