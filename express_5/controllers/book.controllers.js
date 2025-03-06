const bookServices = require('../Services/book.services');

module.exports.getAllBooks = async (req, res) => {
    try {
        let results = await req.queryBuilder;
        res.json({
            status: "success",
            message: "Get all books successfully!!!",
            data: results,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.getOneBook = async (req, res) => {
    try {
        let response = await bookServices.getOneBook(req.params.id);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.getReviewofBook = async (req, res) => {
    try {
        let response = await bookServices.getReviewofBook(req.params.id);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.postNewBook = async (req, res) => {
    try {
        let response = await bookServices.postNewBook(req.body.title, req.body.price, req.body.rate, req.body.authorId, req.body.categoryId);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.postNewReview = async (req, res) => {
    try {
        let response = await bookServices.postReviewforBook(req.params.id, req.body.content);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.updateBook = async (req, res) => {
    try {
        let response = await bookServices.updateBook(req.params.id, req.body.title, req.body.price, req.body.rate);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.deleteBook = async (req, res) => {
    try {
        let response = await bookServices.deleteBook(req.params.id);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};