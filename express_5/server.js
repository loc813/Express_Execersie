const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bookRoutes = require('./Router/book.routes');
const categoryRoutes = require('./Router/category.routes');
const reviewRoutes = require('./Router/review.routes')

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({
    status: '200',
    message: "Start Server Successfully !!!",
  });
});


app.use('/books', bookRoutes);
app.use('/categories', categoryRoutes);
app.use('/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});