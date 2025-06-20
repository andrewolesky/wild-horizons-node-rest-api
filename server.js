// console.log("Hello Node!");

import http from "node:http";
// import { createServer } from "node:http";

const server = http.createServer((req, res) => {
  res.end();
});
