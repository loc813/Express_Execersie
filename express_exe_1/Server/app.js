const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const filePathData = path.join(__dirname, '../Starter/dev-data/data/users.json');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const checkExist = (req, res, next) => {
    let users = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
    let id = req.params.id;
    let email = req.body.email;
    
    let user = users.find(user => user._id === id || user.email === email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    req.user = user; 
    next();
};

app.get('/', (req, res) => {
    res.type('html');
    res.send('<h1>This is home page</h1>');
});

app.get('/overview', (req, res) => {
    res.type('html');
    res.send('<h1>This is overview page</h1>');
});

app.get('/product', (req, res) => {
    res.type('html');
    res.send('<h1>This is product page</h1>');
});

app.get('/api/v1/users', (req, res) => {
    let users = fs.readFileSync(filePathData , {encoding: 'utf8'});
    res.status(200).json(JSON.parse(users));
})


app.get('/api/v1/users/:id', checkExist, (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
        const id = parseInt(req.params.id, 10); // Convert ID to a number

        // Validate input number
        if (isNaN(id) || id < 1 || id > users.length) {
            return res.status(400).json({ message: "Invalid user number. Must be between 1 and " + users.length });
        }

        const user = users[id - 1]; // Adjust index (1-based to 0-based)
        res.status(200).json(user);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/api/v1/users', (req, res) => {
    let users = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    let newUser = { ...req.body, _id: Math.random().toString() };
    users.push(newUser);
    fs.writeFileSync(filePathData, JSON.stringify(users), 'utf8');
    res.json({
        message: 'User added successfully',
        user: newUser,
    })
});

app.put('/api/v1/users/:id', checkExist, (req, res) => {
    let users = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
    let userIndex = users.findIndex(user => user._id === req.params.id);

    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFileSync(filePathData, JSON.stringify(users, null, 2));

    res.json({ message: "Update successfully", user: users[userIndex] });
});

app.delete('/api/v1/users/:id', checkExist, (req, res) => {
    let users = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
    users = users.filter(user => user._id !== req.params.id);
    fs.writeFileSync(filePathData, JSON.stringify(users, null, 2));

    res.json({ message: "Delete successfully" });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


