const categoryService = require('../Services/category.services');

module.exports.getAllCategory = async (req, res) => {
    try {
        let response = await req.queryBuilder;
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.getOneCategory = async (req, res) => {
    try {
        let response = await categoryService.getOneCategory(req.params.id);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.getBooksOfCategory = async (req, res) => {
    try {
        let response = await categoryService.getBooksOfCategory(req.params.id);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    };
}

module.exports.createCategory = async (req, res) => {
    try {
        let response = await categoryService.createCategory(req.body);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.updateCategory = async (req, res) => {
    try {
        let response = await categoryService.updateCategory(req.params.id, req.body);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};  

module.exports.deleteCategory = async (req, res) => {
    try {
        let response = await categoryService.deleteCategory(req.params.id);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
}