const express = require('express');
const app = module.exports = express();

// A simple route that will let the client know that the server is running
app.get("/serverTest", (req, res) => {
    res.json({ message: "Server is running!" });
});
