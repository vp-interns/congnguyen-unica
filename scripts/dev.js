"use strict";

const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const webpackConfig = require("../config/webpack.config");
const devServerConfig = require("../config/webpackDevserver.config");

// PORT
const port = parseInt(process.env.DEV_SERVER_PORT) || 3000;
// env
const env = process.env.NODE_ENV || "development";

// compile webpack
const compiler = webpack(webpackConfig(env));

// server webpack compile over a webserver
const serverConfig = devServerConfig();

const devServer = new webpackDevServer(compiler, serverConfig);

devServer.listen(port, "0.0.0.0", (error) => {
  if (error) console.log(error);
});
