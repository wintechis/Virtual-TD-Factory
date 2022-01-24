const Router = require("express").Router();
module.exports = (socket) => {
  const baseUrl = `/${socket.id}/safety_stop/mirobot`;
  const td = require("./td/mirobot_td")(baseUrl);
  Router.get(`${baseUrl}`, (req, res) => {
    res.json(td);
  });
  Router.post(`${baseUrl}/pick_box`, (req, res) => {
    const color = req.body.color;
    socket.send(
      JSON.stringify({
        Mirobot: {
          Number: "sc2",
          Action: color,
        },
      })
    );
    res.end();
  });
  return Router;
};
