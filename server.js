const express = require("express");
const cors = require("cors");
const UserDB = require("./modules/userDB");
const VerifierDB = require("./modules/verifierDB");
const CheckInDB = require("./modules/checkinDB");

const connectionString = "mongodb+srv://admin:vqiDJEpwuR2wnfvG@application-data.towvq.mongodb.net/user-data?retryWrites=true&w=majority"

const userDB = new UserDB(connectionString);
const verifierDB = new VerifierDB(connectionString);
const checkInDB = new CheckInDB(connectionString);

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
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

// Verifier Endpoints

app.get("/api/verifiers/:id", (req, res) => {
    verifierDB.getVerifierById(req.params.id).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json({message : `Error: ${err.message}`});
    });
});

app.post("/api/verifiers", (req, res) => {
    verifierDB.addNewVerifier(req.body).then(msg => {
        res.status(201).json({message : msg});
    }).catch(err => {
        res.status(500).json({message : `Error: ${err.message}`});
    });
});

app.put("/api/verifiers/:id", (req, res) => {
    verifierDB.updateVerifierById(req.body, req.params.id).then(msg => {
        res.status(200).json({message: msg});
    }).catch(err =>{
        res.status(500).json({message: `Error: ${err.message}`});
    });
});

app.delete("/api/verifiers/:id", (req, res) => {
    verifierDB.deleteVerifierById(req.params.id).then(msg => {
        res.status(200).json({message: msg});
    }).catch(err => {
        res.status(500).json({message: `Error: ${err.message}`});
    });
});

// Check-In Endpoints

app.get("/api/checkins/:id", (req, res) => {
    checkInDB.getCheckInById(req.params.id).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json({message : `Error: ${err.message}`});
    });
});

app.post("/api/checkins", (req, res) => {
    checkInDB.addNewCheckIn(req.body).then(msg => {
        res.status(201).json({message : msg});
    }).catch(err => {
        res.status(500).json({message : `Error: ${err.message}`});
    });
});

app.put("/api/checkins/:id", (req, res) => {
    checkInDB.updateCheckInById(req.body, req.params.id).then(msg => {
        res.status(200).json({message: msg});
    }).catch(err =>{
        res.status(500).json({message: `Error: ${err.message}`});
    });
});

app.delete("/api/checkins/:id", (req, res) => {
    checkInDB.deleteCheckInById(req.params.id).then(msg => {
        res.status(200).json({message: msg});
    }).catch(err => {
        res.status(500).json({message: `Error: ${err.message}`});
    });
});

// Server startup is dependent on initialization of all other database connections

Promise.all([userDB.initialize(), verifierDB.initialize(), checkInDB.initialize()]).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on: ${HTTP_PORT}`);
    });
}).catch(err => {
    console.log(err);
});