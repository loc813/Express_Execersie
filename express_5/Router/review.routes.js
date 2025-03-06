const express = require('express');
const router = express.Router();
const reviewControllers = require('../controllers/review.controllers');
const {middlewareOfReview} = require('../Middleware/review.middlewares');

router.get('/',middlewareOfReview , reviewControllers.getAllReviews );

router.get('/:id', reviewControllers.getOneReview);


router.post('/', reviewControllers.postNewReview);

router.put('/:id', reviewControllers.updateReview);

router.delete('/:id', reviewControllers.deleteReview);


module.exports = router;