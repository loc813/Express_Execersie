const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routeUser = require('./router/user.routes'); // Corrected path

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: "This is homepage",
    });
});

app.use('/users', routeUser);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});