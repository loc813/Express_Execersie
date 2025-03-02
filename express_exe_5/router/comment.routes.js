const express = require('express');
const router = express.Router();
const db = require('../data/dataconnect');
const { handleQuery } = require('../middleware/comment.middlewares');
// Get one comment with id product
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let results = await db("comments").select('*').where({ commentId: id });
        res.json({
            status: "success",
            message: "Get one comment successfully!!!",
            data: results[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

//get all comments
router.get('/', handleQuery, async (req, res) => {
    let { queryBuilder } = req;
    try {
        let results = await queryBuilder;
        res.json({
            status: "success",
            message: "Get all comments successfully!!!",
            data: results,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});


//post a comment
router.post('/', async (req, res) => {
    try {
        let { commentId , product_id , content } = req.body;
        await db("comments").insert({ commentId , product_id , content });
        res.json({
            status: "success",
            message: "Post a comment successfully!!!",
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});


// Update a comment
router.put('/:id', async (req, res) => {
    try {
        let {id} = req.params;
        let { commentId , product_id , content } = req.body;
        await db("comments").where({ commentId: id }).update({ commentId , product_id , content });
        res.json({
            status: "success",
            message: "Update a comment successfully!!!",
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}); 


// Delete a comment
router.delete('/:id', async (req, res) => {
    try{
        let {id} = req.params;
        await db("comments").where({ commentId: id }).delete();
        res.json({
            status: "success",
            message: "Delete a comment successfully!!!",
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

module.exports = router;