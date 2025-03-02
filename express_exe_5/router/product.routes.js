const express = require('express');
const router = express.Router();
const db = require('../data/dataconnect');
const { handleQuery } = require('../middleware/product.middlewares');


//get one 
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let results = await db("product").select('*').where({ id });

        if (results.length === 0) { 
            return res.status(404).json({
                status: "fail",
                message: "Product not found!!!",
            });
        }

        res.json({
            status: "success",
            message: "Get one product successfully!!!",
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

//get one listing with id product
router.get('/:id/listing', async (req, res) => {
    try {
        let { id } = req.params;
        let results = await db("listing").select('*').where({ product_id: id });

        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Listing not found!!!",
            });
        }

        res.json({
            status: "success",
            message: "Get one listing successfully!!!",
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

//get one comment with id product
router.get('/:id/comments', async (req, res) => {
    try {
        let { id } = req.params;
        let results = await db("comments").select('*').where({ product_id: id });

        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Comments not found!!!",
            });
        }

        res.json({
            status: "success",
            message: "Get one comments successfully!!!",
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

//get one tag with id product
router.get('/:id/tags', async (req, res) => {
    try {
        let { id } = req.params;
        let results = await db('tags')
            .select('tags.*')
            .innerJoin('productTags', 'tags.tagId', 'productTags.tagId')
            .where('productTags.product_id', id);

        if (results.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tags not found!!!',
            });
        }

        res.json({
            status: 'success',
            message: 'Get tags for product successfully!!!',
            data: results,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
});
//get all
router.get('/', handleQuery, async (req, res) => {
    let { queryBuilder } = req;
    try {
        let data = await queryBuilder;
        res.json({
            status: 'success',
            message: 'GET ALL PRODUCTS SUCCESSFULLY !!!',
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//post (create new)
router.post('/', async (req, res) => {
    let {productName , status , listing } = req.body;
    try {
        let checkProduct = await db("product").select("*").where({productName});
        if(checkProduct.length > 0){
            return res.json({
                status: "fail",
                message: "Product name is already exist!!!",
            });
        }

        let id = await db("product").insert({productName , status});
        if(listing){
            await db("listing").insert({
                product_id: id,
                description: listing.description,
                price: listing.price,
                rate: listing.rate,
            });
        }

        res.json({
            status: "success",
            message: "Created product successfully!!!",
            createdId: id,
        });
    }catch(err){
        console.log(err);
    }
});

//post (create new) comment for product
router.post('/:id/comments', async (req, res) => {
    let { id } = req.params;
    let { content } = req.body;
    try {
        await db("comments").insert({
            product_id: id,
            content,
        });

        res.json({
            status: "success",
            message: "Created comment successfully!!!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});


//put (update)
router.put('/:id', async (req, res) => {
    let {id } = req.params;
    try {
        let index = await db("product").where({id}).update(req.body);
        if(index === 0){
            return res.json({
                status: "fail",
                message: "Product not found!!!",
            });
        };
        res.json({
            status: "success",
            message: "Updated product successfully!!!",
            updatedId: id,
        });
    }catch(err){
        console.log(err);
    }
});




//delete 
router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try{
        let index = await db("product").where({id}).delete({id});
        if(index === 0){
            return res.json({
                status: "fail",
                message: "Product not found!!!",
            });
        };
        res.json({
            status: "success",
            message: "Deleted product successfully!!!",
            deletedId: id,
        })
    }catch(err){
        console.log(err);
    }
});


module.exports = router;