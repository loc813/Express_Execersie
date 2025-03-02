const db = require('../data/dataconnect');

module.exports.handleQuery = (req, res, next) => {
    let { product_id, page, limit, sort, order } = req.query;

    let query = db('comments').select("*");

    if (product_id) {
        query = query.where({ product_id });
    }

    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        query = query.limit(limit).offset(offset);
    }

    if (sort && order) {
        query = query.orderBy(sort, order);
    }

    req.queryBuilder = query;
    next();
};