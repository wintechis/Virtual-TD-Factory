"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const ws = require("ws");
const { v4: uuidv4 } = require("uuid");
const WebSocketServer = new ws.Server({ port: 8080 }, () => {
  console.log("websocket server online");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("Webgl"));

WebSocketServer.on("connection", (socket) => {
  socket.id = uuidv4();
  socket.send("id=" + socket.id);
  const assembly_line = require("./routes/assembly_line")(socket);
  const safety_stop = require("./routes/safety_stop")(socket);
  const playground = require("./routes/playground")(socket);
  app.use(assembly_line);
  app.use(safety_stop);
  app.use(playground);
});

module.exports = {
  server: http,
  start: (port) => {
    http.listen(port, () => console.log(`Listening on port ${port}`));
  },
};
