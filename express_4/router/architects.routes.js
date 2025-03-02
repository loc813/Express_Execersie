const express = require('express');
const router = express.Router();
const db = require('../config/database');

//get one user
router.get('/:id',  (req, res) => {
    res.json({
        status: 'success',
        message: "User found successfully !!!",
    });
});

//get all users
router.get('/', async (req, res) => {
    try{
        // let results = await db("architect").select('name as fullname', 'place'); 
        // let results = await db("architect")
        //     .whereBetween('birthday', [1993, 1995])
        //     .orderBy('birthday', 'asc')
        // let results = await db("architect").count('id as total');

        let results =  db('design').distinct('architect_id');

        let info = await db("architect").whereNotIn("id", results);
        console.log(info);
        res.json({
            status: 'success',
            message: "User router is working !!!",
            data: info,
        })
    }catch(err){
        console.log(err);
    }
});

//create user
router.post('/', async (req, res) => {
    let {name , birthday , sex , place, address } = req.body;
    try{
        let [id] = await db("architect").insert({
            name,
            birthday,
            sex,
            place,
            address,
        });
        res.json({
            status: 'success',
            message: "User create successfully !!!",
            createdId: id,
        });
    }catch(err){
        console.log(err);
    }
});

//update user
router.put('/:id', async (req, res) => {
    let { id } = req.params; // Corrected destructuring
    try{
       let results = await db("architect").where({ id }).update(req.body);
       res.json({
            message: "update successfully!!!",
       })
    }catch(err){
        console.log(err);
    }
});

//delete user
router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try{
        let results = await db("architect").where({id}).delete({id});
        res.json({
            status: 'success',
            message: "User deleted successfully !!!",
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;