const mysql2 = require('mysql2/promise');


module.exports.handleQuery = (req, res, next) => {
    let {  minRate , maxRate , page, limit , sort , order } = req.query;
    console()
}