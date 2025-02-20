const express = require('express');
const app = express();
const port = 3000;
const questionRouter = require('../router/ask.routes.js');
const morgan = require('morgan');
const path = require('path');

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {   
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get("/ask", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ask.html'));
});

app.get("/question-detail/:id", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/question-detail.html'));
});

// Use the question router
app.use('/api/v1/question', questionRouter);

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ status: 'fail', message: 'Page not found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});