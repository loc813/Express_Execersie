const express = require('express');
const router = express.Router();


//endpoint danh cho user
//get one user
router.get('/:id', (req, res) => {
    res.json({
        message: "Get one user successfully",
    });
});

//get all users
router.get('/', (req, res) => {
    res.json({
        message: "Get all users successfully",
    });
});

//create new user
router.post('/', (req, res) => {
    res.json({
        message: "Create new user successfully",
    });
});

//update user
router.put('/:id', (req, res) => {
    res.json({
        message: "Update user successfully",
    });
});

//delete user
router.delete('/:id', (req, res) => {
    res.json({
        message: "Delete user successfully",
    });
});

module.exports = router;