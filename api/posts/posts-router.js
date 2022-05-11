// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

//* GET /api/posts
// error: 500 { message: "The posts information could not be retrieved" }
router.get("/", (req, res) => {
    Posts.find()
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
            console.log({
                err: err.message,
                stack: err.stack
            })
        })
})


//* GET /api/posts/:id
// if !id error: 404 { message: "The post with the specified ID does not exist" }
// if error retrieving post error: 500 { message: "The post information could not be retrieved" }
router.get("/", (req, res) => {
    
})


//* POST /api/posts
router.get("/", (req, res) => {
    
})

//* PUT /api/posts/:id
router.get("/", (req, res) => {
    
})


//* DELETE /api/posts/:id
router.get("/", (req, res) => {
    
})

//* GET /api/posts/:id/comments
router.get("/", (req, res) => {
    
})

module.exports = router;