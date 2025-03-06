const db = require('../config/dataconnect.config');


module.exports.getAllReview = async () => {
    try {
        let results = await db("Review").select("*");
        return({
            status: '200',
            message: "Get ALL reviews successfully!!!",
            data: results,
        })
    }catch(err){
        console.log(err);
        throw(err);
    }
};



module.exports.getOneReview = async (reviewId) => {
    try{
        let results = await db("review").select("*").where({reviewId});
        return({
            status: '200',
            message: "Get One review successfully!!!",
            data: results,
        })
    }catch(err){
        console.log(err);
        throw(err);
    }
};

module.exports.postNewReview = async (bookId, content) => {
    const checkBooKExist = await db("book").select("*").where({bookId});
    if(checkBooKExist.length === 0){
        return({
            status: 404,
            message: "book not found no review of this book!!!",
        })
    };

    try{
        const [reviewId] = await db("review").insert({bookId, content});
        return {
            status: "success",
            message: "post review successfully!!!",
            data: { reviewId , bookId , content},
        }
    }catch(err){
        console.log(err);
        throw(err);
    }
};


module.exports.updateReview = async(bookId, content) => {
    const checkBook = await db("book").select("*").where({bookId});
    if(checkBook.length === 0){
        return{
            status: 404,
            message: "book not found cant review",
        }
    };

    try{
        let results = await db("review").where({bookId}).update({content});
        return ({
            status: 200,
            message: "update successfully!!!",
            data: results,
        })
    }catch(err){
        console.log(err);
        throw(err);
    }
};


module.exports.deleteReview = async(reviewId) => {
    try{
        let results = await db("review").where({reviewId}).del();
        return({
            status: 201,
            message: "Delete review successfully!!!",
        })
    }catch(err){
        console.log(err);
        throw(err);
    }
};