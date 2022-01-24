const Router = require("express").Router();
module.exports = (socket) => {
  const baseUrl = `/${socket.id}/assembly_line/mirobot`;
  const td = require("./td/mirobot_td")(baseUrl);
  Router.get(`${baseUrl}`, (req, res) => {
    res.json(td);
  });
  Router.post(`${baseUrl}/pick_box`, (req, res) => {
    const color = req.body.color;
    const robot_number = req.body.robot.split("robot ")[1];
    socket.send(
      JSON.stringify({
        Mirobot: {
          Number: robot_number,
          Action: color,
        },
      })
    );
    res.end();
  });
  return Router;
};
