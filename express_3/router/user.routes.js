const express =     require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mysql2 = require('mysql2/promise');
const db = require('../database/database')

//path to data file 
let userDataPath = path.join(__dirname, '');


// connect mysql
// single connection
    // const connection = mysql2.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "loc18112003",
    //     database: "mysql2_demo"
    // });



//endpoint danh cho user
//get one user
router.get('/:id', (req, res) => {
    let id = req.params.id;
    db.execute("SELECT * FROM USERS WHERE userId = ? ", [id] )
        .then((results) => {
            res.json({
                status: 'success',
                message: "GET ONE USER SUCCESSFULLY!!!",
                data: results[0],
            });
        })
        .catch((err) =>{
            console.log(err);
        })
});

//get all users
// viet theo kieu bat dong bo (single connection)
    // router.get('/', async (req, res) => {
    //     connection
    //         .then((results)=>{
    //             let data = results.query("SELECT * FROM USERS");
    //             return data; // ket qua tra ve la 1 promise
    //         })
    //         .then((data) => {
    //             res.json(data[0]);
    //         })
    //         .catch((err) =>{
    //             console.log(err);
    //         })
    // });
// viet theo callback truyen thong 
    // router.get('/', (req, res) => {
    //     connection.query('SELECT * FROM users', (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return res.json(err);
    //         } else {
    //             res.json({
    //                 message: "Get all users successfully",
    //                 data: results
    //             });
    //         }
    //     });
    // });

router.get('/', async(req, res) => {
    let data = db.query("SELECT * FROM USERS")
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            console.log(err);
        })
})


//create new user
router.post('/', async (req, res) => {
    try {
        const { userName, email, phone } = req.body;
        const [users] = await db.query("SELECT * FROM USERS");
        const newUser = {
            id: users.length + 1,
            userName: userName,
            email: email,
            phone: phone,
        };
        await db.query("INSERT INTO USERS (userId, userName, email, phone) VALUES (?, ?, ?, ?)", [newUser.id, newUser.userName, newUser.email, newUser.phone]);
        res.json({
            status: 'success',
            message: "CREATE NEW USER SUCCESSFULLY!!!",
            data: newUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: "Internal Server Error"
        });
    }
});

//update user
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let 
});

//delete user
router.delete('/:id', (req, res) => {
    res.json({
        message: "Delete user successfully",
    });
});

module.exports = router;