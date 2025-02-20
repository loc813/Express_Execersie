const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//path to file data todo list 
let pathTodo = path.join(__dirname, '../data/todos.json');

//endpoint danh cho todo
//get all todo
router.get('/', (req, res) => {
    try {
        let todos = fs.readFileSync(pathTodo, 'utf-8');
        res.json({
            message: "Get all todos successfully",
            data: JSON.parse(todos),
        });
    }catch(err){
        res.json({
            message: err,
        })
    }
});

//create todo
router.post("/", (req, res) => {    
    let content = req.body.content;
    let todo = {
        id: Math.random(),
        content: content,
        status: false,
    };

    let todos = fs.readFileSync(pathTodo, 'utf-8');
    todos = JSON.parse(todos);
    todos.push(todo);
    fs.writeFileSync(pathTodo, JSON.stringify(todos));
    res.json({
        message: "Create todo successfully",
        data: todo,
    });
});

//update todo
router.put("/:id", (req, res) => {
    let id = req.params.id;
    let status = req.body.status;
    let todos = fs.readFileSync(pathTodo, 'utf-8');
    todos = JSON.parse(todos);

    let index = todos.findIndex((todo) => todo.id == id);

    if(index !== -1){
        todos[index].status = status;
        fs.writeFileSync(pathTodo, JSON.stringify(todos));
        res.json({
            message: "Update todo successfully",
            data: todos[index],
        });
    }else{
        res.json({
            message: "Todo not found",
        });
    }
})


//delete todo
router.delete("/:id", (req, res) => {
   let id = req.params.id;
   let todos = fs.readFileSync(pathTodo, 'utf-8');
   todos = JSON.parse(todos);

   let deleteIndex = todos.findIndex((todo) => todo.id == id);
    if(deleteIndex !== -1){
         todos.splice(deleteIndex, 1);
         fs.writeFileSync(pathTodo, JSON.stringify(todos));
            res.json({
                message: "Delete todo successfully",
            });
    }else{
        res.json({
            message: "Todo not found",
        });
    }
});
module.exports = router;