const reviewService = require('../Services/review.services');


module.exports.getAllReviews = async(req , res) => {
    try{
        let response = await req.queryBuilder;
        res.json({
            status: "success",
            message: "Get all reviews successfully!!!",
            data: response,
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        })
    }
}

module.exports.getOneReview = async(req, res) => {
    try{
        let response = await reviewService.getOneReview(req.params.id);
        res.json(response);
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        })
    }
}


module.exports.postNewReview = async(req, res) => {
    try{
        let response = await reviewService.postNewReview(req.body.bookId , req.body.content);
        res.json(response);
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        })
    }
}


module.exports.updateReview = async(req, res) => {
    try{
        let response = await reviewService.updateReview(req.body.booKid, req.body.content);
        res.json(response);
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        })
    }
}


module.exports.deleteReview = async(req, res) => {
    try{    
        let response = await reviewService.deleteReview(req.params.id);
        res.json(response);
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message,
        })
    }
}