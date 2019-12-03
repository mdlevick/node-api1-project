
const express = require("express"); 

const db = require("./data/db.js"); 

const server = express();

server.use(express.json()); 

server.get("/", (req, res) => {
    res.send({ api: "Target Acquired"})
});

server.get("/api/users", (req, res) => {

    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        console.log("error on GET /users", error);
        res
            .status(500)
            .json({errorMessage: "error gett;ing list of users from database"});
    });
});






const port = 4000;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} **\n`)
);