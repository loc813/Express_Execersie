const db = require('../config/dataconnect.config');


module.exports.middlewareOfCategory = async (req, res, next) => {
    let { page, limit, sort, order } = req.query;

    let queryBuilder = db('Category')
        .select(
            'Category.*',
            db.raw('COUNT(Book.bookId) as totalBooks')
        )
        .leftJoin('Book', 'Category.categoryId', 'Book.categoryId')
        .groupBy('Category.categoryId');

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
}