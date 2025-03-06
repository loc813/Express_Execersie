const db = require('../config/dataconnect.config');

module.exports.getAllBooks = async () => {
    try {
        let results = await db('Book')
            .select(
                'Book.*',
                'Category.categoryName',
                db.raw('GROUP_CONCAT(Review.content) as reviews')
            )
            .leftJoin('Category', 'Book.categoryId', 'Category.categoryId')
            .leftJoin('Review', 'Book.bookId', 'Review.bookId')
            .groupBy('Book.bookId');

        return {
            status: "success",
            message: "Get all books successfully!!!",
            data: results,
        };
    } catch (err) {
        console.error(err);
        return {
            status: "error",
            message: "Internal Server Error",
        };
    }
};

module.exports.getOneBook = async (bookId) => {
    try {
        let results = await db('Book')
            .select(
                'Book.*',
                'Category.categoryName',
                db.raw('GROUP_CONCAT(Review.content) as reviews')
            )
            .leftJoin('Category', 'Book.categoryId', 'Category.categoryId')
            .leftJoin('Review', 'Book.bookId', 'Review.bookId')
            .where('Book.bookId', bookId)
            .groupBy('Book.bookId');

        if (results.length === 0) {
            return {
                status: "fail",
                message: "Book not found!!!",
            };
        }

        return {
            status: "success",
            message: "Get book successfully!!!",
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

module.exports.getReviewofBook = async (bookId) => {
    try {
        let results = await db('Review').select('*').where({ bookId });
        if (results.length === 0) {
            return {
                status: "fail",
                message: "Review not found!!!",
            };
        }
        return {
            status: "success",
            message: "Get review successfully!!!",
            data: results,
        };
    } catch (err) {
        console.error(err);
        return {
            status: "error",
            message: "Internal Server Error",
        };
    }
};

module.exports.postNewBook = async (title, price, rate, authorId, categoryId) => {
    try {
        const authorExist = await db('Author').select('*').where({ authorId });
        if (authorExist.length === 0) {
            return {
                status: "fail",
                message: "Author not found!!!",
            };
        }

        const categoryExist = await db('Category').select('*').where({ categoryId });
        if (categoryExist.length === 0) {
            return {
                status: "fail",
                message: "Category not found!!!",
            };
        }

        const checkBook = await db('Book').select('*').where({ title });
        if (checkBook.length > 0) {
            return {
                status: "fail",
                message: "Book name is already exist!!!",
            };
        }

        const [bookId] = await db('Book').insert({ title, price, rate, authorId, categoryId });
        return {
            status: "success",
            message: "Create book successfully!!!",
            data: { bookId, title, price, rate, authorId, categoryId },
        };
    } catch (err) {
        console.error(err);
        return {
            status: "error",
            message: "Internal Server Error",
        };
    }
};

module.exports.postReviewforBook = async (bookId, content) => {
    const checkBook = await db('Book').select('*').where({ bookId });
    if (checkBook.length === 0) {
        return {
            status: "fail",
            message: "Book not found!!!",
        };
    };

    const [reviewId] = await db('Review').insert({ bookId, content });
    return {
        status: "success",
        message: "Create review successfully!!!",
        data: { reviewId, bookId, content },
    };
};


module.exports.updateBook = async (bookId, title, price, rate) => {
    const checkBook = await db('Book').select('*').where({ bookId });
    if (checkBook.length === 0) {
        return {
            status: "fail",
            message: "Book not found!!!",
        };
    }

    return await db('Book').where({ bookId }).update({ title, price, rate });
};

module.exports.deleteBook = async (bookId) => {
    const checkBook = await db('Book').select('*').where({ bookId });
    if (checkBook.length === 0) {
        return {
            status: "fail",
            message: "Book not found!!!",
        };
    }

    return await db('Book').where({ bookId }).del();
};