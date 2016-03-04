import express from "express";
import bodyParser from "body-parser";

import playerApi from "./api/player";

const port = process.env.PORT || 3003;

var server = express();

server.get("/", (req, res) => {
  res.json("hello");
  res.end();
});

server.use(bodyParser.json());
server.use("/round", roundApi);
server.listen(port);
