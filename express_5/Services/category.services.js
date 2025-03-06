const db = require('../config/dataconnect.config');

module.exports.getAllCategory = async () => {
    try {
        const results = await db('category').select('*');
        return {
            status: '200',
            message: 'Get all category successfully',
            data: results
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.getOneCategory = async (categoryId) => {
    try {
        let results = await db('Category').select('*').where({ categoryId });
        if (results.length === 0) {
            return {
                status: "fail",
                message: "Category not found!!!",
            };
        }
        return {
            status: "success",
            message: "Get category successfully!!!",
            data: results[0],
        };
    } catch (err) {
        console.error(err);
        return {
            status: "error",
            message: "Internal Server Error",
        };
    }
};

module.exports.getBooksOfCategory = async (categoryId) => {
    try {
        const results = await db('book').select('*').where({ categoryId });
        return {
            status: '200',
            message: 'Get books of category successfully',
            data: results
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.createCategory = async (categoryName) => {
    try {
        const results = await db('category').insert(categoryName);
        return {
            status: '200',
            message: 'Create category successfully',
            data: results
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.updateCategory = async (categoryId, categoryName) => {
    try {
        const checkCategory = await db('category').select('*').where({ categoryId });
        if (checkCategory.length === 0) {
            return {
                status: "fail",
                message: "Category not found!!!",
            };
        }

        const results = await db('category').where({ categoryId }).update(categoryName);
        return {
            status: '200',
            message: 'Update category successfully',
            data: results
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
};  

module.exports.deleteCategory = async (categoryId) => {
    try {
        const results = await db('category').where({categoryId}).del();
        return {
            status: '200',
            message: 'Delete category successfully',
            data: results
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
};