const Router = require("express").Router();
module.exports = (socket) => {
  const baseUrl = `/${socket.id}/playground/ozobot`;
  const td = require("./td/ozobot_td")(baseUrl);
  Router.get(`${baseUrl}`, (req, res) => {
    res.json(td);
  });
  return Router;
};
