const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/category.controllers');
const { middlewareOfCategory } = require('../Middleware/category.middlewares');


router.get('/', middlewareOfCategory, categoryControllers.getAllCategory);


router.get('/:id', categoryControllers.getOneCategory);


router.get('/:id/books', categoryControllers.getBooksOfCategory);


router.post('/', categoryControllers.createCategory);


router.put('/:id', categoryControllers.updateCategory);


router.delete('/:id', categoryControllers.deleteCategory);

module.exports = router;