const Router = require("express").Router();
module.exports = (socket) => {
  const baseUrl = `/${socket.id}/assembly_line/ozobot`;
  const td = require("./td/ozobot_td")(baseUrl);
  Router.get(`${baseUrl}`, (req, res) => {
    res.json(td);
  });
  Router.post(`${baseUrl}/move`, (req, res) => {
    let direction = req.body.direction;
    if (direction === "forward") direction = "front";
    else if (direction === "backward") direction = "back";
    socket.send(
      JSON.stringify({
        Ozobot: direction,
      })
    );
    res.end();
  });
  Router.post(`${baseUrl}/stop`, (req, res) => {
    socket.send(
      JSON.stringify({
        Ozobot: "stop",
      })
    );
    res.end();
  });
  Router.post(`${baseUrl}/follow_line`, (req, res) => {
    socket.send(
      JSON.stringify({
        Ozobot: "followline",
      })
    );
    res.end();
  });
  return Router;
};
