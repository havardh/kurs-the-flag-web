import express from "express";
import bodyParser from "body-parser";

import playerApi from "./api/player";
import roundApi from "./api/round";

const port = process.env.PORT || 3003;

var server = express();

server.all("*", function(req, res, next) {
  console.log(req.method + ":", req.url);
  next();
});

server.use(bodyParser.json());
server.use("/api/round", roundApi);
server.use("/api/player", playerApi);
server.listen(port);
