const db = require('../data/dataconnect');
const productServices = require('../Services/product.services');

module.exports.getOneProduct = async (req, res) => {
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
};

module.exports.getAllProduct = async (req, res) => {
    try {
        let data = req.queryBuilder;
        res.json({
            status: 'success',
            message: 'GET ALL PRODUCTS SUCCESSFULLY !!!',
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports.postNewProduct = async (req, res) => {
    let { productName, status, listing } = req.body;
    try {
        let checkProduct = await db("product").select("*").where({ productName });
        if (checkProduct.length > 0) {
            return res.json({
                status: "fail",
                message: "Product name is already exist!!!",
            });
        }

        let id = await db("product").insert({ productName, status });
        if (listing) {
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
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

module.exports.putUpdateProduct = async (req, res) => {
    let { id } = req.params;
    try {
        let index = await db("product").where({ id }).update(req.body);
        if (index === 0) {
            return res.json({
                status: "fail",
                message: "Product not found!!!",
            });
        }
        res.json({
            status: "success",
            message: "Updated product successfully!!!",
            updatedId: id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

module.exports.deleteProduct = async (req, res) => {
    let { id } = req.params;
    try {
        let index = await db("product").where({ id }).delete();
        if (index === 0) {
            return res.json({
                status: "fail",
                message: "Product not found!!!",
            });
        }
        res.json({
            status: "success",
            message: "Deleted product successfully!!!",
            deletedId: id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};