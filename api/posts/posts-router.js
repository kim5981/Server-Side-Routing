// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

//* GET /api/posts
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
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const post = await Posts.findById(id)
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
        console.log({
            err: err.message,
            stack: err.stack
        })
    }
})


//* POST /api/posts
router.post("/", (req, res) => {
    const { title, contents } = req.body
    if( !title || !contents ) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.insert({ title, contents })
        .then( ({ id }) => {
            return Posts.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message,
                stack: err.stack
            })
        })
    }
})

//* PUT /api/posts/:id
router.put("/:id", (req, res) => {
    const { title, contents } = req.body
    if( !title || !contents ) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.findById(req.params.id)
        .then(smth => {
            if( !smth ) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                // req.body is verified and id exists
                return Posts.update(req.params.id, req.body)
            }
        }) // argument in .then vv is w/e resolves from Posts.update() ^^ promise  
        .then( data => {
            // data resolves to # of records that were updated
            if (data) {
                return Posts.findById(req.params.id)
            }
        })
        .then(post => {
            if (post) {
                res.json(post)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be modified",
                err: err.message,
                stack: err.stack
            })
        })
    }
})


//* DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if(!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Posts.remove(req.params.id)
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message,
            stack: err.stack
        })
    }
})

//* GET /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if(!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const msgs = await Posts.findPostComments(req.params.id)
            res.json(msgs)
            
        }
    } catch (err) {
        res.status(500).json({
            message: "The comments information could not be retrieved",
            err: err.message,
            stack: err.stack
        }) 
    }
})

module.exports = router;