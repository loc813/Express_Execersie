const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

//import userRouter
const userRouter = require('./router/user.routes');


//middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => {
    res.json({
        message: "Hello World"
    });
});


//su dung endpoint danh cho user
app.use('/users', userRouter);

//catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ status: 'fail', message: 'Page not found' });
});

//listen to port
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});