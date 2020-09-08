"use strict";

const path = require("path");

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);

module.exports = {
  appPublic: resolveApp("public"),
  publicUrlOrPath: "/",
  appSrc: resolveApp("src"),
  appBuild: resolveApp("dist"),
  appJS: resolveApp("src/js/app.js"),
  appMainScss: resolveApp("src/scss/main.scss"),
};
