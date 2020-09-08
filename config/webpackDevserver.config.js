"use strict";

const paths = require("./paths");

module.exports = () => ({
  // Enable gzip compression of generated files.
  compress: true,
  // By default WebpackDevServer serves physical files from current directory
  contentBase: paths.appPublic,
  //   contentBasePublicPath: paths.publicUrlOrPath,
  publicPath: paths.publicUrlOrPath,
  // By default files from `contentBase` will not trigger a page reload.
  watchContentBase: true,
  // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
  // for the WebpackDevServer client so it can learn when the files were
  // updated. The WebpackDevServer client is included as an entry point
  // in the webpack development configuration. Note that only changes
  // to CSS are currently hot reloaded. JS changes will refresh the browser.
  hot: true,
  // Use 'ws' instead of 'sockjs-node' on server since we're using native
  // websockets in `webpackHotDevClient`
  //   transportMode: "ws",
  //   injectClient: false,
  // Shows a full-screen overlay in the browser when there are compiler errors or warnings. If you want to show only compiler errors
  overlay: {
    error: true,
    warnings: true,
  },
  // Tells dev-server to open the browser after server had been started. Set it to true to open your default browser.
  open: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  quiet: true,
});
