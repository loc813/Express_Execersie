const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;


app.get('/users', (req, res) => {
    let users = fs.readFileSync("./data/user.json" , {encoding: 'utf8'});
    // res.send(users);
    res.json(JSON.parse(users));
});

app.get('/users/:id', (req, res) => {
    let users = fs.readFileSync("./data/user.json" , {encoding: 'utf8'});  
    let id = req.params.id;
    let user = JSON.parse(users).find(user => user.id == id);
    res.json(user);
});


app.put('/users', (req, res) => {
    res.send('users page');
});


app.delete('/users', (req, res) => {
    res.send('DELETE ONE USER SUCCESSFULLY');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
