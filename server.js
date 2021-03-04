const express = require("express");
const cors = require("cors");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message : "API Listening"});
});

app.listen(HTTP_PORT);