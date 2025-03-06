const db = require('../config/dataconnect.config');

module.exports.middlewareOfBooks = async (req, res, next) => {
    let { minPrice, maxPrice, page, limit, sort, order } = req.query;

    let queryBuilder = db('Book')
        .select(
            'Book.*',
            'Category.categoryName',
            db.raw('GROUP_CONCAT(Review.content) as reviews')
        )
        .leftJoin('Category', 'Book.categoryId', 'Category.categoryId')
        .leftJoin('Review', 'Book.bookId', 'Review.bookId')
        .groupBy('Book.bookId');

    if (minPrice !== undefined && maxPrice !== undefined) {
        minPrice = parseFloat(minPrice);
        maxPrice = parseFloat(maxPrice);
        queryBuilder = queryBuilder.whereBetween('Book.price', [minPrice, maxPrice]);
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

    req.queryBuilder = queryBuilder;
    next();
};