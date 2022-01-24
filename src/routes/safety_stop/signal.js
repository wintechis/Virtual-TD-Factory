const Router = require("express").Router();
module.exports = (socket) => {
  const baseUrl = `/${socket.id}/safety/signal`;
  const td = require("./td/signal_td")(baseUrl);
  Router.get(`${baseUrl}`, (req, res) => {
    res.json(td);
  });
  return Router;
};
