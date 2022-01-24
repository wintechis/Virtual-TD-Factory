const Router = require("express").Router();
module.exports = (socket) => {
  const baseUrl = `/${socket.id}/playground/signal`;
  const td = require("./td/signal_td")(baseUrl);
  Router.get(`${baseUrl}`, (req, res) => {
    res.json(td);
  });
  return Router;
};
