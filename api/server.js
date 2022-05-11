// implement your server here
const express = require("express")
const server = express();

// require your posts router and connect it here
server.use(express.json());

const postsRouter = require("./posts/posts-router")
server.use("/api/posts", postsRouter)

server.use("*", (req, res) => {
    res.status(404).body({
        message: "not here :("
    })
})


module.exports = server;