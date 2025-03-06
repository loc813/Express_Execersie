const express = require('express');
const router = express.Router();
const { handleQuery } = require('../middleware/product.middlewares');
const controller = require('../controllers/product.controllers');

// Get one product
router.get('/:id', controller.getOneProduct);

// Get one listing with id product
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

// Get one comment with id product
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

// Get one tag with id product
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

// Get all products
router.get('/', handleQuery, controller.getAllProduct);

// Post (create new)
router.post('/', controller.postNewProduct);

// Post (create new) comment for product
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

// Put (update)
router.put('/:id', controller.putUpdateProduct);

// Delete
router.delete('/:id', controller.deleteProduct);

module.exports = router;