const productServices = require('../Services/product.services');

module.exports.handleQuery = async (req, res, next) => {
    try {
        let data = await productServices.getAllProducts(req.query);
        req.queryBuilder = data;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};