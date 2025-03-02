const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRouter = require('./routes/product.routes');

//middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//router
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: "Start successfully !!!",
    })
});

app.use('/products', productRouter);

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})