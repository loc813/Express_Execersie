const express = require('express');
const router = express.Router();
const db = require('../database/database');
const {handleQuery} = require('../middleware/user.middlewares');

// Get one user
router.get('/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let data = await db.execute("SELECT * FROM USER WHERE id = ?", [id]);
        const [user, info] = data
        res.json({
            status: 'success',
            message: 'GET ONE USER SUCCESSFULLY !!!',
            data: user,
        })
    }catch(err){
        res.status(404).json(err);
    }
});

// Get all users
    //C1: su dung thong thuong
    // router.get('/', (req, res) => {
    //     db.execute("SELECT * FROM USER")
    //         .then((data) => {
    //             // const users = data[0];
    //             // const info = data[1];
    //             // array destructuring - tai cau truc lai mang 
    //             const [users, info] = data;
    //             res.json({
    //                 status: 'success',
    //                 message: 'GET ALL USERS SUCCESSFULLY !!!',
    //                 data: users,
    //             });
    //         })
    //         .catch((err) => {
    //             res.status(404).json(err);
    //         });
    // });

    //C2: su dung async va await 
    // ?sort=id&order=asc
    // {sort: "id", order: "asc"}
    router.get('/', handleQuery, async (req, res) =>{
        let { finalQuery } = req;
        try {
            let data = await db.execute(finalQuery);
            res.json({
                status: 'success',
                message: 'GET ALL USERS SUCCESSFULLY !!!',
                data: data[0],
            })
        }catch(err){
            res.status(404).json(err);
        }
    });

// Create new user
router.post('/', async (req, res) => {
   
});

// Update user
router.put('/:id', (req, res) => {
    res.json({
        message: "Update user successfully",
    });
});

// Delete user
router.delete('/:id', (req, res) => {
    res.json({
        message: "Delete user successfully",
    });
});

module.exports = router;