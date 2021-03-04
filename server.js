const express = require("express");
const cors = require("cors");
const UserDB = require("./modules/userDB");

const userDB = new UserDB("mongodb+srv://admin:vqiDJEpwuR2wnfvG@application-data.towvq.mongodb.net/user-data?retryWrites=true&w=majority");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message : "API Listening"});
});

/// User endpoints

app.get("/api/users/:id", (req, res) => {
    userDB.getUserById(req.params.id).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json({message : `Error: ${err.message}`});
    });
});

app.post("/api/users", (req, res) => {
    userDB.addNewUser(req.body).then(msg => {
        res.status(201).json({message : msg});
    }).catch(err => {
        res.status(500).json({message : `Error: ${err.message}`});
    });
});

app.put("/api/users/:id", (req, res) => {
    userDB.updateUserById(req.body, req.params.id).then(msg => {
        res.status(200).json({message: msg});
    }).catch(err =>{
        res.status(500).json({message: `Error: ${err.message}`});
    });
});

app.delete("/api/users/:id", (req, res) => {
    userDB.deleteUserById(req.params.id).then(msg => {
        res.status(200).json({message: msg});
    }).catch(err => {
        res.status(500).json({message: `Error: ${err.message}`});
    });
});

userDB.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on: ${HTTP_PORT}`);
    });
}).catch(err => {
    console.log(err);
});