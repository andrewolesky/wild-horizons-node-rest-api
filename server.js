import http from "node:http";
// import { createServer } from "node:http";
import { getDataFromDB } from "./database/db.js";

const PORT = 8000;

const destinations = await getDataFromDB();

const server = http.createServer(async (req, res) => {
  // console.log(req.url);
  // res.write("This is some data \n");
  // res.write("This is some more data \n");
  if (req.url === "/api" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(destinations));
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop();
    const filteredData = destinations.filter((destination) => {
      return destination.continent.toLowerCase() === continent.toLowerCase();
    });
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(filteredData));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        error: "not found",
        message: "The requested route does not exist",
      })
    );
  }
});

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
