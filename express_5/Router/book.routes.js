const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/book.controllers');
const {middlewareOfBooks} = require('../Middleware/book.middlewares');


router.get('/', middlewareOfBooks,  bookControllers.getAllBooks);

router.get('/:id', bookControllers.getOneBook);

router.get('/:id/reviews', bookControllers.getReviewofBook);

router.post('/', bookControllers.postNewBook);

router.post('/:id/reviews', bookControllers.postNewReview);

router.put('/:id', bookControllers.updateBook);

router.delete('/:id', bookControllers.deleteBook);

module.exports = router;