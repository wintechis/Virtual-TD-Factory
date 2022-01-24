const Router = require("express").Router();
module.exports = (socket) => {
  const mirobot = require("./mirobot.js")(socket);
  const signal = require("./signal.js")(socket);
  const ozobot = require("./ozobot.js")(socket);
  Router.use(mirobot);
  // Router.use(signal);
  // Router.use(ozobot);
  return Router;
};
