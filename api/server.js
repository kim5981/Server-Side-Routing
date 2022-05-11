// implement your server here
const express = require("express")
const server = express();

// require your posts router and connect it here
server.use(express.json());

// plug in server
server.use("*", (req, res) => {
    res.status(404).json({
        message: "um you did smth wrong.."
    })
})

module.exports = server;