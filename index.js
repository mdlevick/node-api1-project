
const express = require("express"); 

const db = require("./data/db.js"); 

const server = express();

server.use(express.json()); 

server.get("/", (req, res) => {
    res.send({ api: "Target Acquired"})
});

server.get("/api/users", (req, res) => {

// console.log("working GET?");

    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log("error on GET /api/users", err);
        res
            .status(500)
            .json({errorMessage: "error gett;ing list of users from database"});
    });
});

server.post("/api/users", (req, res) => {

    const userData = req.body;

    db.insert(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log("error on POST /api/users", err);
            res.status(500).json({ errorMessage: "error adding the user" });
        });
});

server.put("/api/users/:id", (req, res) => {
    // console.log("working?")
    const id = req.params.id;
    // const { id } = req.params;
    const user = req.body;

    db.update(id, user)
        .then(updated => {
            if (updated) { 

                res.status(200).json({ message: "user removed successfully", updated});

            } else {

                res.status(404).json({ message: "user not found" });
            
            }
        })
        .catch(error => {
            console.log("error on PUT api/users/:id", error);
            res.status(500).json({ message: "error updating the user" });
    });
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(removed =>{
            if (removed) {

                res.status(200).json({ message: "user removed successfully", removed});

            } else {
                res.status(404).json({ message: "user not found" })
            }
        })
        .catch(err => {
            console.log("error on DELETE /api/users/:id", err);
            res.status(500).json({ errorMessage: "error removing the user"});
        });
});



const port = 4000;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} **\n`)
);