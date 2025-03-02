// Middleware 
const mysql2 = require('mysql2/promise');

module.exports.handleQuery = (req, res, next) => {
    let { cities, page, limit, sort, order } = req.query;
    console.log(cities);
    console.log(page);
    console.log(limit);
    console.log(sort);
    console.log(order);

    // SQL query order
    // SELECT 
    // FROM
    // WHERE
    // GROUP BY 
    // HAVING
    // ORDER BY 
    // LIMIT ?
    // OFFSET ??

    let baseQuery = `SELECT * FROM user`;
    // cities // ["South Elvis" , "MacKenziehaven"]
    let whereQuery;
    if (!cities){
        whereQuery = "";
    }else{
        let subQuery = cities.map((el, i) => {
            return `city = '${el}'`
        })
        .join(" OR ");
        whereQuery = `where id in (
                        select address_id from address 
                        where ${subQuery}
                    )`
    }


    let orderQuery ;
    if(!sort || !order){
        orderQuery =   "order by id asc";
    }else{
        orderQuery = `order by ${sort} ${order.toUpperCase()}`;
    };

    let paginationQuery;
    if(!page || !limit){
        paginationQuery = '';
    }else{
        paginationQuery = `limit  ${limit} offset ${(+page - 1) * +limit}`;
    }


    

    let finalQuery = `${baseQuery} ${whereQuery} ${orderQuery} ${paginationQuery}`;
    finalQuery = mysql2.format(finalQuery);
    req.finalQuery = finalQuery;
    next();
}