const Router = require("express").Router();
module.exports = (socket) => {
  const baseUrl = `/${socket.id}/playground/mirobot`;
  const td = require("./td/mirobot_td")(baseUrl);
  let currentSpeed = 2000;
  Router.get(`${baseUrl}`, (req, res) => {
    res.json(td);
  });
  Router.get(`${baseUrl}/speed`, (req, res) => {
    res.json(currentSpeed);
  });
  Router.put(`${baseUrl}/speed`, (req, res) => {
    const speed = req.body.speed;
    currentSpeed = speed;
    socket.send(
      JSON.stringify({
        Speed: speed,
      })
    );
    res.end();
  });
  Router.post(`${baseUrl}/pick_box`, (req, res) => {
    const color = req.body.color;
    socket.send(
      JSON.stringify({
        Action: "auto",
        Object: color,
      })
    );
    res.end();
  });
  Router.post(`${baseUrl}/rotate_joint`, (req, res) => {
    const joint = req.body.joint;
    const direction = req.body.direction === "plus" ? "+" : "-";
    socket.send(
      JSON.stringify({
        Action: "manuel",
        Joint: {
          [joint]: direction,
        },
      })
    );
    res.end();
  });

  return Router;
};
