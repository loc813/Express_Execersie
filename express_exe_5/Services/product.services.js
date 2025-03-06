const db = require('../data/dataconnect');

module.exports.getAllProducts = async (query) => {
    let { minRate, maxRate, page, limit, sort, order } = query;

    let queryBuilder = db('product')
        .select('product.*', 'listing.rate')
        .innerJoin('listing', 'product.id', 'listing.product_id');

    if (minRate !== undefined && maxRate !== undefined) {
        minRate = parseFloat(minRate);
        maxRate = parseFloat(maxRate);
        queryBuilder = queryBuilder.whereBetween('listing.rate', [minRate, maxRate]);
    }

    if (page !== undefined && limit !== undefined) {
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        queryBuilder = queryBuilder.limit(limit).offset(offset);
    }

    if (sort && order) {
        queryBuilder = queryBuilder.orderBy(sort, order);
    }

    return await queryBuilder;
};



