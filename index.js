
const express = require("express"); 

const db = require("./data/hubs-model.js"); 

const server = express();

server.use(express.json()); 






const port = 4000;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} **\n`)
);