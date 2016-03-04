import express from "express";
import bodyParser from "body-parser";

import playerApi from "./api/player";
import roundApi from "./api/round";

const port = process.env.PORT || 3003;

var server = express();

server.get("/", (req, res) => {
  res.json("hello");
  res.end();
});

server.use(bodyParser.json());
server.use("/round", roundApi);
server.use("/player", playerApi);
server.listen(port);
