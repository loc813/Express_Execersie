const db = require('../data/dataconnect');

module.exports.handleQuery = (req, res, next) => {
    let { minRate, maxRate, page, limit, sort, order } = req.query;
    console.log(minRate);
    console.log(maxRate);
    console.log(page);
    console.log(limit);
    console.log(sort);
    console.log(order);

    let query = db('product')
        .select('product.*', 'listing.rate')
        .innerJoin('listing', 'product.id', 'listing.product_id');

    if (minRate !== undefined && maxRate !== undefined) {
        minRate = parseFloat(minRate);
        maxRate = parseFloat(maxRate);
        query = query.whereBetween('listing.rate', [minRate, maxRate]);
    }

    if (page !== undefined && limit !== undefined) {
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