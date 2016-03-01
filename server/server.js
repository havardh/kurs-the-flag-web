import express from "express";

const port = process.env.PORT || 3003;

var server = express();

server.get("/", function (req, res) {
  res.json("Hello");
  res.end();
});

server.listen(port);
