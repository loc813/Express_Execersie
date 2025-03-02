const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRouter = require('./router/product.routes');
const commentRouter = require('./router/comment.routes');
const tagRouter = require('./router/tag.routes');

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/products', productRouter);
app.use('/comments', commentRouter);
app.use('/tags', tagRouter);

app.get('/', (req, res) => {
    res.json({
        status: '200',
        message: "Home page is running",
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});