const express = require('express');
const router = express.Router();
const db = require('../data/dataconnect');
const { handleQuery } = require('../middleware/tag.middlewares');

// Get one tags with id product
router.get('/:id', async (req, res) => {
    try{
        let { id } = req.params;
        let results = await db("tags").select('*').where({ tagId: id });
        res.json({
            status: "success",
            message: "Get one tag successfully!!!",
            data: results[0],
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});
//get all tags
router.get('/', handleQuery, async (req, res) => {
    let { queryBuilder } = req;
    try{
        let results = await queryBuilder;
        res.json({
            status: "success",
            message: "Get all tags successfully!!!",
            data: results,
        });
    }catch(err){
        console.log(err);
    }
});


//post a comment
router.post('/', async (req, res) => {
    try{
        let { tagId , product_id , content } = req.body;
        await db("tags").insert({ tagId , product_id , content });
        res.json({
            status: "success",
            message: "Post a tag successfully!!!",
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
    try{
        let { id } = req.params;
        let { content } = req.body;
        await db("tags").where({ tagId: id }).update({ content });
        res.json({
            status: "success",
            message: "Update a tag successfully!!!",
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
        let { id } = req.params;
        await db("tags").where({ tagId: id }).delete();
        res.json({
            status: "success",
            message: "Delete a tag successfully!!!",
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;