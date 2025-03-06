const db = require('../config/dataconnect.config');


module.exports.middlewareOfReview = async (req, res, next) => {
    let { page, limit, sort, order } = req.query;

    let queryBuilder = db('review')
        .select(
            'review.*',
            db.raw('COUNT(Book.bookId) as totalBooks')
        )
        .leftJoin('Book', 'Review.reviewId', 'Book.reviewId')
        .groupBy('Review.ReviewId');

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